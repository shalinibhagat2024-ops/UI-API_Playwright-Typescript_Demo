import { ProductAssertions } from "@api/modules/products/assertions/ProductAssertions";
import { ProductResponse } from "@api/modules/products/models/ProductResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "PUT - Update Product",
  {
    tag: ["@api", "@sanity", "@apiProduct", "@p2"],
  },
  async ({ productService }) => {
    await test.step("Update the product", async () => {
      const response = await productService.updateProduct(1, {
        title: "Updated Product",
        price: 999,
      });

      StatusAssertions.verifySuccess(response);

      const product = await ResponseUtil.json<ProductResponse>(response);

      SchemaAssertions.validate(Schemas.Product, product);

      ProductAssertions.verifyUpdatedProduct(response, product, "Updated Product", 999);
    });
  }
);
