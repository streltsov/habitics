export const todoSchema = {
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
      default: [],
    },
    dueDate: {
      type: "string",
      format: "date-time",
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
  required: ["title", "isDone", "id", "createdAt", "updatedAt"],
};
