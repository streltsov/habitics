import { useState, useEffect } from "react";
import { MAX_DATE } from "../constants";
import { SubToDoType } from "../schema";

import { get } from "../database";
import { ToDoDocType } from "../schema";

export const useToDos = () => {
  const [toDos, setToDos] = useState<ToDoDocType[]>([]);

  useEffect(() => {
    (async () => {
      const db = await get();
      db.toDos.find().$.subscribe(setToDos);
    })();
  }, []);

  type CreateToDo = Pick<ToDoDocType, "title" | "tags">;
  const createToDo = async ({ title, tags }: CreateToDo) => {
    const timestamp = String(Date.now());

    const metaData = {
      id: timestamp,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const db = await get();
    return db.toDos.insert({
      isDone: false,
      title,
      dueDate: String(MAX_DATE),
      subToDos: [],
      tags,
      ...metaData,
    });
  };

  return {
    toDos,
    createToDo,
  };
};

export const useToDo = (id: string) => {
  const setIsDone = async (isDone: boolean) => {
    const db = await get();
    const toDo = db.toDos.findOne({ selector: { id } });

    return toDo.update({ $set: { isDone } });
  };

  const setTitle = async (title: ToDoDocType["title"]) => {
    const db = await get();
    const toDo = db.toDos.findOne({ selector: { id } });

    return toDo.update({ $set: { title } });
  };

  const setDescription = async (description: ToDoDocType["description"]) => {
    const db = await get();
    const toDo = db.toDos.findOne({ selector: { id } });

    return toDo.update({ $set: { description } });
  };

  const createSubToDo = async (data: SubToDoType) => {
    const db = await get();
    const toDo = db.toDos.findOne({ selector: { id } });

    return toDo.update({ $set: { subToDos: data } });
  };

  const updateSubToDo = (idx: number) => async (data: Partial<SubToDoType>) => {
    const db = await get();
    const toDo = db.toDos.findOne({ selector: { id } });

    toDo.update({
      // Hack, because positional operator .$. doesn't work
      // $set: { ["subToDos.1.isDone"]: subToDo.isDone },
      $set: { ["subToDos." + idx + ".isDone"]: data },
    });
  };

  const setDueDate = async (dueDate: Date) => {
    const db = await get();
    const toDo = db.toDos.findOne({ selector: { id } });

    return toDo.update({ $set: { dueDate } });
  };

  const unsetDueDate = async () => {
    const db = await get();
    const toDo = db.toDos.findOne({ selector: { id } });

    // $unset?
    return toDo.update({ $set: { dueDate: undefined } });
  };

  const deleteToDo = async () => {
    const db = await get();
    const toDo = db.toDos.findOne({ selector: { id } });

    return toDo.remove();
  };

  return {
    setIsDone,
    setTitle,
    setDescription,
    createSubToDo,
    updateSubToDo,
    setDueDate,
    unsetDueDate,
    deleteToDo,
  };
};
