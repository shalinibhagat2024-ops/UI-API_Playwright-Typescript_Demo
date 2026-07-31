import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { test } from "@fixtures/api.fixture";

test(
  "DELETE - Delete Product",
  {
    tag: ["@api", "@sanity", "@apiProduct", "@p2"],
  },
  async ({ productService }) => {
    await test.step("Delete the product", async () => {
      const response = await productService.deleteProduct(1);

      StatusAssertions.verifySuccess(response);
    });
  }
);
