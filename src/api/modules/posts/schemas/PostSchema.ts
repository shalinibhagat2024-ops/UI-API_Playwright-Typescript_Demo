export const PostSchema = {
  type: "object",

  required: ["id", "title", "body", "userId"],

  properties: {
    id: {
      type: "number",
    },

    title: {
      type: "string",
    },

    body: {
      type: "string",
    },

    userId: {
      type: "number",
    },

    tags: {
      type: "array",
      items: {
        type: "string",
      },
    },

    reactions: {
      type: "object",
      properties: {
        likes: {
          type: "number",
        },

        dislikes: {
          type: "number",
        },
      },
    },

    views: {
      type: "number",
    },
  },
};
