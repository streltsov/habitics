import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
} from "rxdb";

export const toDoSchemaLiteral = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    isDone: {
      type: "boolean",
      default: false,
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    subToDos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          title: {
            type: "string",
          },
          isDone: {
            type: "boolean",
          },
        },
      },
    },
    dueDate: {
      type: "string",
      format: "date-time",
    },
    points: {
      type: "number",
    },
    tags: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
      },
    },

    id: {
      type: "string",
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
  },
  required: [
    "id",
    "isDone",
    "title",
    "dueDate",
    "subToDos",
    "points",
    "tags",
    "createdAt",
    "updatedAt",
  ],
} as const;

export const toDoSchema: RxJsonSchema<ToDoDocType> = toDoSchemaLiteral;

const schemaTyped = toTypedRxJsonSchema(toDoSchemaLiteral);
export type ToDoDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;
export type SubToDoType = ToDoDocType["subToDos"][number];
