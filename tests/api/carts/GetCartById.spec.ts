import { CartAssertions } from "@api/modules/carts/assertions/CartAssertions";
import { CartResponse } from "@api/modules/carts/models/CartResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "GET - Get Cart By Id",
  {
    tag: ["@api", "@smoke", "@regression", "@apiCart", "@p2"],
  },
  async ({ cartService }) => {
    await test.step("Retrieve cart by ID", async () => {
      const response = await cartService.getCartById(1);

      StatusAssertions.verifySuccess(response);

      const cart = await ResponseUtil.json<CartResponse>(response);

      SchemaAssertions.validate(Schemas.Cart, cart);

      CartAssertions.verifyCart(cart);
    });
  }
);
