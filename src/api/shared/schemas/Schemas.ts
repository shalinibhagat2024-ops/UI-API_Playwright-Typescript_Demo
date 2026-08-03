import { CartListSchema } from "@api/modules/carts/schemas/CartListSchema";
import { CartSchema } from "@api/modules/carts/schemas/CartSchema";
import { PostListSchema } from "@api/modules/posts/schemas/PostListSchema";
import { PostSchema } from "@api/modules/posts/schemas/PostSchema";
import { ProductListSchema } from "@api/modules/products/schemas/ProductListSchema";
import { ProductSchema } from "@api/modules/products/schemas/ProductSchema";
import { UserListSchema } from "@api/modules/users/schemas/UserListSchema";
import { UserSchema } from "@api/modules/users/schemas/UserSchema";

export const Schemas = {
  Product: ProductSchema,
  ProductList: ProductListSchema,

  Post: PostSchema,
  PostList: PostListSchema,

  User: UserSchema,
  UserList: UserListSchema,

  Cart: CartSchema,
  CartList: CartListSchema,
} as const;
