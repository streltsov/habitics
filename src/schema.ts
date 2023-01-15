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

export const habitSchemaLiteral = {
  version: 1,
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
    isArchived: {
      type: "boolean",
      default: false,
    },
  },
  required: ["id", "title", "tags", "createdAt"],
} as const;

export const habitSchema: RxJsonSchema<HabitDocType> = habitSchemaLiteral;

const habitSchemaTyped = toTypedRxJsonSchema(habitSchemaLiteral);
export type HabitDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof habitSchemaTyped
>;

export const habitContributionSchemaLiteral = {
  version: 1,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    parentId: {
      type: "string",
    },
    description: {
      type: "string",
    },
    amount: {
      type: "number",
    },
    createdAt: {
      type: "string",
    },
  },
  required: ["id", "parentId", "amount", "createdAt"],
} as const;

export const habitContributionSchema: RxJsonSchema<HabitContributionDocType> =
  habitContributionSchemaLiteral;

const habitContributionSchemaTyped = toTypedRxJsonSchema(
  habitContributionSchemaLiteral
);
export type HabitContributionDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof habitContributionSchemaTyped
>;
