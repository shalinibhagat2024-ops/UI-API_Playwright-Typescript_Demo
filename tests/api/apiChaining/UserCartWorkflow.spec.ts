import { CartAssertions } from "@api/modules/carts/assertions/CartAssertions";
import { CartBuilder } from "@api/modules/carts/builders/CartBuilder";
import { CartResponse } from "@api/modules/carts/models/CartResponse";
import { UserAssertions } from "@api/modules/users/assertions/UserAssertions";
import { UserResponse } from "@api/modules/users/models/UserResponse";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "Workflow - User Creates Cart",
  {
    tag: ["@api", "@sanity", "@apiChainWorkflow", "@p1"],
  },
  async ({ userService, cartService }) => {
    let user: UserResponse;
    let cart: CartResponse;

    await test.step("Retrieve user details", async () => {
      const userResponse = await userService.getUserById(1);

      StatusAssertions.verifySuccess(userResponse);

      user = await ResponseUtil.json<UserResponse>(userResponse);

      UserAssertions.verifyUser(user);
    });

    await test.step("Create cart for the user", async () => {
      const cartRequest = CartBuilder.create().withUser(user.id).build();

      const cartResponse = await cartService.addCart(cartRequest);

      StatusAssertions.verifyStatus(cartResponse, HttpStatus.CREATED);

      cart = await ResponseUtil.json<CartResponse>(cartResponse);

      CartAssertions.verifyCartCreatedForUser(cartResponse, cart, user);
    });
  }
);
