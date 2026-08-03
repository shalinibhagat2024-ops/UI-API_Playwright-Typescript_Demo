export const ApiEndpoints = {
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
  },

  PRODUCTS: {
    ALL: "/products",
    ADD: "/products/add",
    SEARCH: "/products/search",
    BY_ID: (id: number) => `/products/${id}`,
    CATEGORY: (category: string) => `/products/category/${category}`,
  },

  USERS: {
    ALL: "/users",
    ADD: "/users/add",
    SEARCH: "/users/search",
    BY_ID: (id: number) => `/users/${id}`,
  },

  CARTS: {
    ALL: "/carts",
    ADD: "/carts/add",
    BY_ID: (id: number) => `/carts/${id}`,
  },

  POSTS: {
    ALL: "/posts",
    ADD: "/posts/add",
    SEARCH: "/posts/search",
    BY_ID: (id: number) => `/posts/${id}`,
    USER: (userId: number) => `/posts/user/${userId}`,
    TAG: (tag: string) => `/posts/tag/${tag}`,
  },
};
