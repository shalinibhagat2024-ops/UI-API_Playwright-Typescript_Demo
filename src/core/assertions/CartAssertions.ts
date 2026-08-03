import { CartItem } from "@model/cart/CartItem";
import { expect } from "@playwright/test";

export class CartAssertions {
  /**
   * Product Exists
   */
  public static exists(exists: boolean): void {
    expect(exists).toBeTruthy();
  }

  /**
   * Product Count
   */
  public static count(
    actual: number,

    expected: number
  ): void {
    expect(actual).toBe(expected);
  }

  /**
   * Quantity
   */
  public static quantity(
    actual: number,

    expected: number
  ): void {
    expect(actual).toBe(expected);
  }

  /**
   * Price
   */
  public static price(
    actual: number,

    expected: number
  ): void {
    expect(actual).toBe(expected);
  }

  /**
   * Total
   */
  public static total(
    actual: number,

    expected: number
  ): void {
    expect(actual).toBe(expected);
  }

  /**
   * Product
   */
  public static equals(
    actual: CartItem,

    expected: CartItem
  ): void {
    expect(actual.name).toBe(expected.name);

    expect(actual.category).toBe(expected.category);

    expect(actual.price).toBe(expected.price);

    expect(actual.quantity).toBe(expected.quantity);

    expect(actual.total).toBe(expected.total);
  }
}
