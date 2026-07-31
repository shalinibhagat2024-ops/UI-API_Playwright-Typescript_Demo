import { ProductInformationComponent } from "@core/helpers/components/automationexercise/ProductInformationComponent";
import { Logger } from "@core/logger/Logger";
import { Page } from "@playwright/test";
import { Product } from "src/models/Product";

import { BasePage } from "../basePage/BasePage";

export class ProductDetailsPage extends BasePage {
  private readonly productInformation: ProductInformationComponent;

  constructor(page: Page) {
    super(page);

    this.productInformation = new ProductInformationComponent(page);
  }

  /**
   * Verify Product Details page.
   */
  public async verifyLoaded(): Promise<this> {
    Logger.info("Verifying Product Details page.");

    await this.productInformation.verifyLoaded();

    return this;
  }

  /**
   * Returns product name.
   */
  public async getName(): Promise<string> {
    return this.productInformation.getName();
  }

  /**
   * Returns product price.
   */
  public async getPrice(): Promise<number> {
    return this.productInformation.getPrice();
  }

  /**
   * Returns category.
   */
  public async getCategory(): Promise<string> {
    return this.productInformation.getCategory();
  }

  /**
   * Returns availability.
   */
  public async getAvailability(): Promise<string> {
    return this.productInformation.getAvailability();
  }

  /**
   * Returns condition.
   */
  public async getCondition(): Promise<string> {
    return this.productInformation.getCondition();
  }

  /**
   * Returns brand.
   */
  public async getBrand(): Promise<string> {
    return this.productInformation.getBrand();
  }

  /**
   * Sets quantity.
   */
  public async setQuantity(quantity: number) {
    await this.productInformation.setQuantity(quantity);
  }

  /**
   * Returns quantity.
   */
  public async getQuantity(): Promise<number> {
    return this.productInformation.getQuantity();
  }

  /**
   * Adds product to cart.
   */
  public async addToCart() {
    await this.productInformation.addToCart();
  }

  /**
   * Returns complete product.
   */
  public async getProduct(): Promise<Product> {
    return this.productInformation.getProduct();
  }
}
