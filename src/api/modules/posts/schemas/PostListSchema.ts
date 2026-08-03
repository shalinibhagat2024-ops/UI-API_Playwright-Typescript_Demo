import { PostSchema } from "./PostSchema";

export const PostListSchema = {
  type: "object",

  required: ["posts", "total", "skip", "limit"],

  properties: {
    posts: {
      type: "array",

      items: PostSchema,
    },

    total: {
      type: "number",
    },

    skip: {
      type: "number",
    },

    limit: {
      type: "number",
    },
  },
};
