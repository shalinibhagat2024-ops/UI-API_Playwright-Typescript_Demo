import { Logger } from "@core/logger/Logger";
import { expect, Locator, Page } from "@playwright/test";
import { CartItem } from "src/models/CartItem";

import { BasePage } from "../basePage/BasePage";

export class CartPage extends BasePage {
  // ==========================================================================
  // Navigation
  // ==========================================================================

  private readonly btnCart: Locator;

  // ==========================================================================
  // Cart
  // ==========================================================================

  private readonly cartRows: Locator;
  private readonly btnProceedToCheckout: Locator;
  private readonly lblShoppingCart: Locator;
  private readonly lblEmptyCart: Locator;
  private readonly tblCart: Locator;

  constructor(page: Page) {
    super(page);

    this.btnCart = page.locator("a[href='/view_cart']");
    this.cartRows = page.locator("#cart_info_table tbody tr");
    this.btnProceedToCheckout = page.getByText("Proceed To Checkout");
    this.lblShoppingCart = page.getByRole("heading", {
      name: "Shopping Cart",
    });
    this.lblEmptyCart = page.locator("#empty_cart");
    this.tblCart = page.locator("#cart_info_table");
  }

  /**
   * Opens the Cart page.
   */
  public async open() {
    Logger.info("Opening Cart page.");

    await this.click(this.btnCart);
    await this.waits.networkIdle();
  }

  /**
   * Verifies Cart page is displayed.
   */
  public async verifyOpened(): Promise<this> {
    Logger.info("Verifying Cart page.");

    await this.assertions.visible(this.tblCart);
    await expect(this.page).toHaveURL(/view_cart/);

    return this;
  }

  /**
   * Returns total number of products.
   */
  public async getProductCount(): Promise<number> {
    return this.cartRows.count();
  }

  /**
   * Returns true if cart contains products.
   */
  public async hasProducts(): Promise<boolean> {
    return (await this.getProductCount()) > 0;
  }

  /**
   * Returns true if cart is empty.
   */
  public async isEmpty(): Promise<boolean> {
    return this.isVisible(this.lblEmptyCart);
  }

  /**
   * Reads all cart items.
   */
  public async getProducts(): Promise<CartItem[]> {
    const items: CartItem[] = [];

    for (let i = 0; i < (await this.getProductCount()); i++) {
      items.push(await this.readRow(this.cartRows.nth(i)));
    }

    return items;
  }

  /**
   * Returns a product by name.
   */
  public async getProduct(productName: string): Promise<CartItem> {
    const product = (await this.getProducts()).find(
      (item) => item.name.toLowerCase() === productName.toLowerCase()
    );

    if (!product) {
      throw new Error(`Product '${productName}' not found.`);
    }

    return product;
  }

  /**
   * Returns true if product exists.
   */
  public async containsProduct(productName: string): Promise<boolean> {
    return (await this.getProductRow(productName).count()) > 0;
  }

  /**
   * Removes a product from cart.
   */
  public async removeProduct(productName: string) {
    const row = this.getProductRow(productName);

    if ((await row.count()) === 0) {
      throw new Error(`Product '${productName}' not found.`);
    }

    Logger.info(`Removing '${productName}' from cart.`);

    await row.locator(".cart_quantity_delete").click();

    await row.waitFor({
      state: "detached",
      timeout: 10000,
    });

    Logger.info(`'${productName}' removed successfully.`);
  }

  /**
   * Removes all products.
   */
  public async clearCart() {
    Logger.info("Clearing shopping cart.");

    while (await this.hasProducts()) {
      const row = this.cartRows.first();

      await row.locator(".cart_quantity_delete").click();

      await expect(row).toBeHidden({
        timeout: 10000,
      });
    }

    Logger.info("Shopping cart cleared.");
  }

  /**
   * Proceeds to Checkout.
   */
  public async proceedToCheckout() {
    Logger.info("Proceeding to checkout.");

    await this.click(this.btnProceedToCheckout);
    await this.page.waitForURL("**/checkout");
  }

  /**
   * Verifies product exists.
   */
  public async verifyProductExists(productName: string) {
    await expect(this.getProductRow(productName)).toBeVisible();
  }

  /**
   * Verifies product is removed.
   */
  public async verifyProductRemoved(productName: string) {
    await expect(this.getProductRow(productName)).toHaveCount(0);
  }

  /**
   * Returns locator for a product row.
   */
  private getProductRow(productName: string): Locator {
    return this.page.locator("#cart_info_table tbody tr", {
      has: this.page.locator(".cart_description a", {
        hasText: productName,
      }),
    });
  }

  /**
   * Reads a cart row.
   */
  private async readRow(row: Locator): Promise<CartItem> {
    return {
      name: (await row.locator(".cart_description h4 a").textContent())?.trim() ?? "",

      category: (await row.locator(".cart_description p").textContent())?.trim() ?? "",

      price: Number((await row.locator(".cart_price p").textContent())?.replace("Rs.", "").trim()),

      quantity: Number(await row.locator(".cart_quantity button").textContent()),

      total: Number(
        (await row.locator(".cart_total_price").textContent())?.replace("Rs.", "").trim()
      ),
    };
  }
}
