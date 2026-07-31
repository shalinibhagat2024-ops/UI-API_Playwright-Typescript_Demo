import { ProductAssertions } from "@api/modules/products/assertions/ProductAssertions";
import { ProductListResponse } from "@api/modules/products/models/ProductListResponse";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "Search Product",
  {
    tag: ["@api", "@sanity", "@apiProduct", "@p2"],
  },
  async ({ productService }) => {
    await test.step('Search products using keyword "phone"', async () => {
      const response = await productService.searchProducts("phone");

      StatusAssertions.verifySuccess(response);

      const products = await ResponseUtil.json<ProductListResponse>(response);

      ProductAssertions.verifyProductList(products);
    });
  }
);
