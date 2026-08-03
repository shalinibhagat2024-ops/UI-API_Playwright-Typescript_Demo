import { Product } from "@model/products/Product";
import { expect } from "@playwright/test";

export class ProductAssertions {
  /**
   * Verify Product Exists
   */
  public static exists(actual: boolean): void {
    expect(actual).toBeTruthy();
  }

  /**
   * Verify Product Details
   */
  public static equals(actual: Product, expected: Product): void {
    expect(actual.name).toBe(expected.name);

    expect(actual.brand).toBe(expected.brand);

    expect(actual.category).toBe(expected.category);

    expect(actual.price).toBe(expected.price);
  }

  public static countGreaterThanZero(count: number): void {
    expect(count).toBeGreaterThan(0);
  }

  public static contains(
    products: Product[],

    expected: Product
  ): void {
    expect(products.some((product) => product.name === expected.name)).toBeTruthy();
  }
}
