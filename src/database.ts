import { addPouchPlugin, getRxStoragePouch } from "rxdb/plugins/pouchdb";
import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { createRxDatabase, addRxPlugin, RxDatabase } from "rxdb";
import pouchdbAdapterIdb from "pouchdb-adapter-idb";
import { ToDoDocType, toDoSchema } from "./schema";
import { removeRxDatabase } from "rxdb";
import { RxCollection } from "rxdb";
import { RxDBReplicationCouchDBPlugin } from "rxdb/plugins/replication-couchdb";

addRxPlugin(RxDBUpdatePlugin);
addPouchPlugin(pouchdbAdapterIdb);
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationCouchDBPlugin);

type ToDosColection = RxCollection<ToDoDocType>;

type DatabaseCollections = {
  toDos: ToDosColection;
};

let dbPromise: Promise<RxDatabase<DatabaseCollections>> | null = null;

const _create = async () => {
  // removeRxDatabase("habistics", getRxStoragePouch("idb"));

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
