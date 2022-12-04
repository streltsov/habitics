import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
} from "rxdb";

export const toDoSchemaLiteral = {
  version: 1,
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
    priority: {
      type: "number",
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

export const accumulatorTaskSchemaLiteral = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    tags: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
      },
    },
    dailyGoal: {
      type: "number",
    },
    goal: {
      type: "number",
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
  required: ["id", "title", "tags", "createdAt", "updatedAt"],
} as const;

export const accumulatorTaskSchema: RxJsonSchema<AccumulatorTaskDocType> =
  accumulatorTaskSchemaLiteral;

const accumulatorTaskSchemaTyped = toTypedRxJsonSchema(
  accumulatorTaskSchemaLiteral
);
export type AccumulatorTaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof accumulatorTaskSchemaTyped
>;

export const accumulatorHistorySchemaLiteral = {
  version: 0,
  primaryKey: "timestamp",
  type: "object",
  properties: {
    parentId: {
      type: "string",
    },
    amount: {
      type: "number",
    },
    timestamp: {
      type: "string",
    },
  },
  required: ["parentId", "amount", "timestamp"],
} as const;

export const accumulatorHistorySchema: RxJsonSchema<AccumulatorHistoryDocType> =
  accumulatorHistorySchemaLiteral;

const accumulatorHistorySchemaTyped = toTypedRxJsonSchema(
  accumulatorHistorySchemaLiteral
);
export type AccumulatorHistoryDocType =
  ExtractDocumentTypeFromTypedRxJsonSchema<
    typeof accumulatorHistorySchemaTyped
  >;
