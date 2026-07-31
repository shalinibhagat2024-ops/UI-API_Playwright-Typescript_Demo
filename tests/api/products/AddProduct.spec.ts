import { ProductAssertions } from "@api/modules/products/assertions/ProductAssertions";
import { ProductBuilder } from "@api/modules/products/builders/ProductBuilder";
import { ProductResponse } from "@api/modules/products/models/ProductResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "POST - Create Product",
  {
    tag: ["@api", "@sanity", "@apiProduct", "@p2"],
  },
  async ({ productService }) => {
    await test.step("Create a new product", async () => {
      const request = await ProductBuilder.fromJson("products/iphone.json");

      const response = await productService.addProduct(request);

      StatusAssertions.verifyStatus(response, HttpStatus.CREATED);

      const product = await ResponseUtil.json<ProductResponse>(response);

      SchemaAssertions.validate(Schemas.Product, product);

      ProductAssertions.verifyCreatedProduct(response, request, product);
    });
  }
);
