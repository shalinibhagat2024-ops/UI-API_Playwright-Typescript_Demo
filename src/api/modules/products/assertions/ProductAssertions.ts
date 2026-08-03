import { ProductCreateRequest } from "@api/modules/products/models/ProductCreateRequest";
import { ProductListResponse } from "@api/modules/products/models/ProductListResponse";
import { ProductResponse } from "@api/modules/products/models/ProductResponse";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { APIResponse } from "@playwright/test";
import { CommonAssertions } from "src/api/shared/assertions/CommonAssertions";

export class ProductAssertions {
  // =====================================
  // Basic Validation
  // =====================================

  static verifyProduct(product: ProductResponse): void {
    CommonAssertions.verifyId(product.id);
    CommonAssertions.verifyNotEmpty(product.title);
    CommonAssertions.verifyGreaterThan(product.price, 0);
    CommonAssertions.verifyGreaterThanOrEqual(product.stock, 0);
  }

  static verifyProductList(products: ProductListResponse): void {
    CommonAssertions.verifyArrayNotEmpty(products.products);
    CommonAssertions.verifyGreaterThan(products.total, 0);
    CommonAssertions.verifyGreaterThan(products.limit, 0);
  }

  // =====================================
  // CRUD Validation
  // =====================================

  static verifyCreatedProduct(
    response: APIResponse,
    request: ProductCreateRequest,
    product: ProductResponse
  ): void {
    StatusAssertions.verifyStatus(response, HttpStatus.CREATED);
    this.verifyProduct(product);
    CommonAssertions.verifyString(product.title, request.title);
    CommonAssertions.verifyString(product.description, request.description);
    CommonAssertions.verifyNumber(product.price, request.price);

    CommonAssertions.verifyString(product.category, request.category);

    CommonAssertions.verifyNumber(product.stock, request.stock);
  }

  static verifyUpdatedProduct(
    response: APIResponse,
    product: ProductResponse,
    expectedTitle: string,
    expectedPrice: number
  ): void {
    StatusAssertions.verifySuccess(response);

    this.verifyProduct(product);

    CommonAssertions.verifyString(product.title, expectedTitle);

    CommonAssertions.verifyNumber(product.price, expectedPrice);
  }

  static verifyDeletedProduct(response: APIResponse): void {
    StatusAssertions.verifySuccess(response);
  }

  // =====================================
  // Workflow Validation
  // =====================================

  static verifyProductWorkflow(
    response: APIResponse,
    request: ProductCreateRequest,
    product: ProductResponse
  ): void {
    this.verifyCreatedProduct(response, request, product);
  }
}
