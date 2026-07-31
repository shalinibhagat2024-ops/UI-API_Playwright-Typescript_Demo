import { CartListResponse } from "@api/modules/carts/models/CartListResponse";
import { CartRequest } from "@api/modules/carts/models/CartRequest";
import { CartResponse } from "@api/modules/carts/models/CartResponse";
import { CommonAssertions } from "@api/shared/assertions/CommonAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { APIResponse } from "@playwright/test";
import { UserResponse } from "src/api/modules/users/models/UserResponse";

export class CartAssertions {
  // ============================================
  // Basic Validation
  // ============================================

  static verifyCart(cart: CartResponse): void {
    CommonAssertions.verifyId(cart.id);

    CommonAssertions.verifyGreaterThan(cart.total, 0);

    CommonAssertions.verifyArrayNotEmpty(cart.products);
  }

  static verifyCartList(carts: CartListResponse): void {
    CommonAssertions.verifyArrayNotEmpty(carts.carts);

    CommonAssertions.verifyGreaterThan(carts.total, 0);
  }

  // ============================================
  // CRUD Validation
  // ============================================

  static verifyCreatedCart(response: APIResponse, request: CartRequest, cart: CartResponse): void {
    StatusAssertions.verifyStatus(response, HttpStatus.CREATED);

    this.verifyCart(cart);

    CommonAssertions.verifyNumber(cart.userId, request.userId);
  }

  static verifyUpdatedCart(response: APIResponse, cart: CartResponse): void {
    StatusAssertions.verifySuccess(response);

    this.verifyCart(cart);
  }

  static verifyDeletedCart(response: APIResponse): void {
    StatusAssertions.verifySuccess(response);
  }

  // ============================================
  // Workflow Validation
  // ============================================

  static verifyCartBelongsToUser(cart: CartResponse, user: UserResponse): void {
    this.verifyCart(cart);

    CommonAssertions.verifyNumber(cart.userId, user.id);
  }

  static verifyCartCreatedForUser(
    response: APIResponse,
    cart: CartResponse,
    user: UserResponse
  ): void {
    StatusAssertions.verifyStatus(response, HttpStatus.CREATED);

    this.verifyCartBelongsToUser(cart, user);
  }
}
