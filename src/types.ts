interface MetaData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubToDoType {
  id: string;
  isDone: boolean;
  title: string;
}

export interface ToDoType extends MetaData {
  title: string;
  tags: string[];
  isDone: boolean;
  dueDate: Date;
  subToDos: SubToDoType[];
}

export type IdType = Pick<ToDoType, "id">;

export type ToDoIdType = Pick<ToDoType, "id">;
