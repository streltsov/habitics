import { addPouchPlugin, getRxStoragePouch } from "rxdb/plugins/pouchdb";
import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { createRxDatabase, addRxPlugin, RxDatabase } from "rxdb";
import pouchdbAdapterIdb from "pouchdb-adapter-idb";
import {
  ToDoDocType,
  toDoSchema,
  HabitDocType,
  habitSchema,
  accumulatorHistorySchema,
} from "./schema";
import { RxCollection } from "rxdb";
import { RxDBReplicationCouchDBPlugin } from "rxdb/plugins/replication-couchdb";

import { RxDBMigrationPlugin } from "rxdb/plugins/migration";

addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBUpdatePlugin);
addPouchPlugin(pouchdbAdapterIdb);
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationCouchDBPlugin);

type ToDosColection = RxCollection<ToDoDocType>;
type HabitsCollection = RxCollection<HabitDocType>;

type DatabaseCollections = {
  toDos: ToDosColection;
  habits: HabitsCollection;
};

let dbPromise: Promise<RxDatabase<DatabaseCollections>> | null = null;

const _create = async () => {
  const db = await createRxDatabase<DatabaseCollections>({
    name: "habistics",
    storage: getRxStoragePouch("idb"),
  });

  db.waitForLeadership().then(() => {
    document.title = "♛ " + document.title;
  });

  await db.addCollections({
    toDos: {
      schema: toDoSchema,
      migrationStrategies: {
        1: function (oldDoc) {
          oldDoc.priority = 0;
          return oldDoc;
        },
      },
    },
    habits: {
      schema: habitSchema,
    },
    accumulatorHistories: {
      schema: accumulatorHistorySchema,
    },
  });

  return db;
};

export const get = () => {
  if (!dbPromise) {
    dbPromise = _create();
  }
  return dbPromise;
};
