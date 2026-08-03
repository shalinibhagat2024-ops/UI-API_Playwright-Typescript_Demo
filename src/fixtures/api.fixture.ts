import { ApiClient } from "@api/core/client/ApiClient";
import { PostService } from "@api/modules/posts/services/PostService";
import { test as base } from "@playwright/test";
import { AuthService } from "src/api/modules/auth/services/AuthService";
import { CartService } from "src/api/modules/carts/services/CartService";
import { ProductService } from "src/api/modules/products/services/ProductService";
import { UserService } from "src/api/modules/users/services/UserService";
import { FailureReporter } from "src/core/reporting/failure/FailureReporter";

type ApiFixtures = {
  apiClient: ApiClient;

  productService: ProductService;

  postService: PostService;

  userService: UserService;

  cartService: CartService;

  authService: AuthService;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },

  productService: async ({ apiClient }, use) => {
    await use(new ProductService(apiClient));
  },

  postService: async ({ apiClient }, use) => {
    await use(new PostService(apiClient));
  },

  userService: async ({ apiClient }, use) => {
    await use(new UserService(apiClient));
  },

  cartService: async ({ apiClient }, use) => {
    await use(new CartService(apiClient));
  },

  authService: async ({ apiClient }, use) => {
    await use(new AuthService(apiClient));
  },
});

test.afterEach(async ({}, testInfo) => {
  await FailureReporter.attach(testInfo);
});

export { expect } from "@playwright/test";
