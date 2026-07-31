import { BusinessComponentBase } from "@core/helpers/components/automationexercise/BusinessComponentBase";
import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";
import { Product } from "src/models/Product";
import { ProductBuilder } from "src/testdata/builders/ProductBuilder";

export class ProductInformationComponent extends BusinessComponentBase {
  private readonly productInformation: Locator;
  private readonly txtQuantity: Locator;
  private readonly btnAddToCart: Locator;

  constructor(page: Page) {
    super(page);

    this.productInformation = page.locator(".product-information");
    this.txtQuantity = page.locator("#quantity");
    this.btnAddToCart = page.locator("button.cart");
  }

  public async verifyLoaded() {
    await this.assertions.visible(this.productInformation);
  }

  public async getName(): Promise<string> {
    return this.getText(this.productInformation.locator("h2"));
  }

  public async getPrice(): Promise<number> {
    const text = await this.getText(this.productInformation.locator("span span").first());

    return Number(text.replace("Rs.", "").trim());
  }

  public async getCategory(): Promise<string> {
    const text = await this.getText(this.productInformation.locator("p").first());

    return text.replace("Category:", "").trim();
  }

  public async getAvailability(): Promise<string> {
    const text = await this.getText(
      this.productInformation.locator("p").filter({
        hasText: "Availability",
      })
    );

    return text.replace("Availability:", "").trim();
  }

  public async getCondition(): Promise<string> {
    const text = await this.getText(
      this.productInformation.locator("p").filter({
        hasText: "Condition",
      })
    );

    return text.replace("Condition:", "").trim();
  }

  public async getBrand(): Promise<string> {
    const text = await this.getText(
      this.productInformation.locator("p").filter({
        hasText: "Brand",
      })
    );

    return text.replace("Brand:", "").trim();
  }

  public async setQuantity(quantity: number) {
    await this.enterText(quantity.toString(), this.txtQuantity);
  }

  public async getQuantity(): Promise<number> {
    return Number(await this.getValue(this.txtQuantity));
  }

  public async addToCart() {
    Logger.info("Adding Product To Cart.");

    await this.click(this.btnAddToCart);
  }

  public async getProduct(): Promise<Product> {
    return new ProductBuilder()
      .name(await this.getName())
      .price(await this.getPrice())
      .category(await this.getCategory())
      .brand(await this.getBrand())
      .build();
  }
}
