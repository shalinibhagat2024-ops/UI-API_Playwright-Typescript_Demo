import { BasePage } from "src/pages/AutomationExercise/basePage/BasePage";

export class ProductsPage extends BasePage {
  readonly firstProduct = this.ui.card(this.page.locator(".product-image-wrapper").first());

  readonly firstProductTitle = this.firstProduct.find(".productinfo p");

  readonly firstProductPrice = this.firstProduct.find(".productinfo h2");

  readonly addToCart = this.firstProduct.find(".overlay-content .add-to-cart");

  async verifyFirstProduct(title: string) {
    await this.firstProduct.verifyVisible();
  }

  async addFirstProductToCart() {
    await this.firstProduct.hover();
    await this.addToCart.click();
  }
}
