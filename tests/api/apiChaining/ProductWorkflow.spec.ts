import { ProductAssertions } from "@api/modules/products/assertions/ProductAssertions";
import { ProductBuilder } from "@api/modules/products/builders/ProductBuilder";
import { ProductResponse } from "@api/modules/products/models/ProductResponse";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "E2E Product Workflow",
  {
    tag: ["@api", "@sanity", "@apiChainWorkflow", "@p1"],
  },
  async ({ productService }) => {
    let createdProduct: ProductResponse;
    let updatedProduct: ProductResponse;

    const productRequest = ProductBuilder.create().build();

    await test.step("Create a new product", async () => {
      const createResponse = await productService.addProduct(productRequest);

      StatusAssertions.verifyStatus(createResponse, HttpStatus.CREATED);

      createdProduct = await ResponseUtil.json<ProductResponse>(createResponse);

      ProductAssertions.verifyCreatedProduct(createResponse, productRequest, createdProduct);
    });

    await test.step("Update the existing product", async () => {
      const updateResponse = await productService.updateProduct(1, {
        title: "Updated Product",
        price: 999,
      });

      StatusAssertions.verifySuccess(updateResponse);

      updatedProduct = await ResponseUtil.json<ProductResponse>(updateResponse);

      ProductAssertions.verifyUpdatedProduct(
        updateResponse,
        updatedProduct,
        "Updated Product",
        999
      );
    });

    await test.step("Delete the existing product", async () => {
      const deleteResponse = await productService.deleteProduct(1);

      StatusAssertions.verifySuccess(deleteResponse);
    });
  }
);
