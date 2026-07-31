import { BusinessComponentBase } from "@core/helpers/components/automationexercise/BusinessComponentBase";
import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";
import { Product } from "src/models/Product";

export class ProductGridComponent extends BusinessComponentBase {
  private readonly productCards: Locator;

  constructor(page: Page) {
    super(page);

    this.productCards = page.locator(".features_items .product-image-wrapper");
  }

  /**
   * Returns total products displayed.
   */
  public async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  /**
   * Opens product details page.
   */
  public async openProduct(product: Product) {
    Logger.info(`Opening product : ${product.name}`);

    const card = await this.getProductCard(product.name);

    await this.click(card.locator("a[href*='/product_details/']"));
  }

  /**
   * Adds product to cart.
   */
  public async addToCart(product: Product) {
    Logger.info(`Adding product : ${product.name}`);

    const card = await this.getProductCard(product.name);

    await card.scrollIntoViewIfNeeded();

    await this.hover(card);

    const addToCartButton = card.locator(".overlay-content a.add-to-cart").first();

    await this.click(addToCartButton);
  }

  /**
   * Returns product price.
   */
  public async getPrice(product: Product): Promise<string> {
    const card = await this.getProductCard(product.name);

    return this.getText(card.locator("h2"));
  }

  /**
   * Returns product name.
   */
  public async getName(product: Product): Promise<string> {
    const card = await this.getProductCard(product.name);

    return this.getText(card.locator("p"));
  }

  /**
   * Verify product is displayed.
   */
  public async verifyProductDisplayed(product: Product) {
    const card = await this.getProductCard(product.name);

    await this.assertions.visible(card);
  }

  /**
   * Returns all displayed product names.
   */
  public async getAllProductNames(): Promise<string[]> {
    return await this.productCards.locator("p").allTextContents();
  }

  /**
   * Returns whether product exists.
   */
  public async containsProduct(product: Product): Promise<boolean> {
    try {
      await this.getProductCard(product.name);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Returns product card.
   */
  private async getProductCard(productName: string): Promise<Locator> {
    const card = this.productCards
      .filter({
        hasText: productName,
      })
      .first();

    await this.assertions.visible(card);

    return card;
  }
}
