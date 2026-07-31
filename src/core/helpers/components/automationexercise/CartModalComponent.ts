import { BusinessComponentBase } from "@core/helpers/components/automationexercise/BusinessComponentBase";
import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";

export class CartModalComponent extends BusinessComponentBase {
  private readonly modal: Locator;
  private readonly btnContinueShopping: Locator;
  private readonly lnkViewCart: Locator;

  constructor(page: Page) {
    super(page);

    this.modal = page.locator("#cartModal");
    this.btnContinueShopping = this.modal.getByRole("button", {
      name: "Continue Shopping",
    });
    this.lnkViewCart = this.modal.getByRole("link", {
      name: "View Cart",
    });
  }

  public async verifyDisplayed(): Promise<this> {
    Logger.info("Verifying cart modal.");

    await this.assertions.visible(this.modal);

    return this;
  }

  public async continueShopping() {
    Logger.info("Continue shopping.");

    await this.click(this.btnContinueShopping);

    await this.waitForHidden(this.modal);
  }

  public async viewCart() {
    Logger.info("Opening cart.");

    await this.click(this.lnkViewCart);

    await this.assertions.url(/view_cart/);
  }
}
