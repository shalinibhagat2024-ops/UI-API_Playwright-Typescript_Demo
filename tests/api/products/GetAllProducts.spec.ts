import { ProductAssertions } from "@api/modules/products/assertions/ProductAssertions";
import { ProductListResponse } from "@api/modules/products/models/ProductListResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "GET - Get All Products",
  {
    tag: ["@api", "@sanity", "@apiProduct", "@p2"],
  },
  async ({ productService }) => {
    await test.step("Retrieve all products", async () => {
      const response = await productService.getAllProducts();

      StatusAssertions.verifySuccess(response);

      const products = await ResponseUtil.json<ProductListResponse>(response);

      SchemaAssertions.validate(Schemas.ProductList, products);

      ProductAssertions.verifyProductList(products);
    });
  }
);
