import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { test } from "@fixtures/api.fixture";

test(
  "Invalid Product Id",
  {
    tag: ["@api", "@sanity", "@apiProduct", "@p2"],
  },
  async ({ productService }) => {
    await test.step("Retrieve product with an invalid ID", async () => {
      const response = await productService.getProductById(99999999);

      StatusAssertions.verifyStatus(response, HttpStatus.NOT_FOUND);
    });
  }
);
