import { ProductAssertions } from "@api/modules/products/assertions/ProductAssertions";
import { ProductBuilder } from "@api/modules/products/builders/ProductBuilder";
import { ProductCreateRequest } from "@api/modules/products/models/ProductCreateRequest";
import { ProductListResponse } from "@api/modules/products/models/ProductListResponse";
import { ProductResponse } from "@api/modules/products/models/ProductResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test.describe(
  "Product CRUD API",
  {
    tag: ["@api", "@sanity", "@apiProduct", "@p2"],
  },
  () => {
    let productRequest: ProductCreateRequest;

    test.beforeAll(async () => {
      productRequest = await ProductBuilder.fromJson("products/iphone.json");
    });

    test.beforeEach(async ({}, testInfo) => {
      console.log(`Starting: ${testInfo.title}`);
    });

    test.afterEach(async ({}, testInfo) => {
      console.log(`Completed: ${testInfo.title} (${testInfo.status})`);
    });

    test("POST - Create Product", async ({ productService }) => {
      await test.step("Create a new product", async () => {
        const response = await productService.addProduct(productRequest);

        StatusAssertions.verifyStatus(response, HttpStatus.CREATED);

        const product = await ResponseUtil.json<ProductResponse>(response);

        SchemaAssertions.validate(Schemas.Product, product);

        ProductAssertions.verifyCreatedProduct(response, productRequest, product);
      });
    });

    test("GET - Get All Products", async ({ productService }) => {
      await test.step("Retrieve all products", async () => {
        const response = await productService.getAllProducts();

        StatusAssertions.verifySuccess(response);

        const products = await ResponseUtil.json<ProductListResponse>(response);

        SchemaAssertions.validate(Schemas.ProductList, products);

        ProductAssertions.verifyProductList(products);
      });
    });

    test("GET - Get Product By Id", async ({ productService }) => {
      await test.step("Retrieve product by ID", async () => {
        const response = await productService.getProductById(1);

        StatusAssertions.verifySuccess(response);

        const product = await ResponseUtil.json<ProductResponse>(response);

        SchemaAssertions.validate(Schemas.Product, product);

        ProductAssertions.verifyProduct(product);
      });
    });

    test("PUT - Update Product", async ({ productService }) => {
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
    });

    test("DELETE - Delete Product", async ({ productService }) => {
      await test.step("Delete the product", async () => {
        const response = await productService.deleteProduct(1);

        StatusAssertions.verifySuccess(response);
      });
    });
  }
);
