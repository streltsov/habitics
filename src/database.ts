import { addPouchPlugin, getRxStoragePouch } from "rxdb/plugins/pouchdb";
import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { createRxDatabase, addRxPlugin, RxDatabase } from "rxdb";
import pouchdbAdapterIdb from "pouchdb-adapter-idb";
import { todoSchema } from "./schema";
import { removeRxDatabase } from "rxdb";
import { RxCollection, RxJsonSchema, RxDocument } from "rxdb";
import { RxDBReplicationCouchDBPlugin } from "rxdb/plugins/replication-couchdb";

addRxPlugin(RxDBUpdatePlugin);
addPouchPlugin(pouchdbAdapterIdb);
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationCouchDBPlugin);

let dbPromise: RxDatabase<any> | null = null;

const _create = async () => {
  // removeRxDatabase("habitics", getRxStoragePouch("idb"));

  const db = await createRxDatabase({
    name: "habitics",
    storage: getRxStoragePouch("idb"),
  });

  db.waitForLeadership().then(() => {
    document.title = "♛ " + document.title;
  });

  await db.addCollections({
    todos: {
      schema: todoSchema,
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
