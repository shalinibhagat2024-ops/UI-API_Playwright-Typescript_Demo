import { Locator, Page } from "@playwright/test";
import { Logger } from "src/core/logger/Logger";
import { BasePage } from "src/pages/AutomationExercise/basePage/BasePage";

export class CheckoutPage extends BasePage {
  private readonly lblAddressDetails: Locator;
  private readonly lblReviewOrder: Locator;
  private readonly txtComment: Locator;
  private readonly btnPlaceOrder: Locator;
  private readonly cartRows: Locator = this.page.locator("#cart_info tbody tr");

  constructor(page: Page) {
    super(page);
    this.lblAddressDetails = page.getByText("Address Details");
    this.lblReviewOrder = page.getByText("Review Your Order");
    this.txtComment = page.locator("textarea[name='message']");
    this.btnPlaceOrder = page.locator("a.check_out");
  }

  /**
   * Verify Checkout Page
   */
  public async verifyOpened() {
    Logger.info("Verifying Checkout Page");
    await this.assertions.visible(this.lblAddressDetails);
    await this.assertions.visible(this.lblReviewOrder);
  }

  public async verifyDeliveryAddress(): Promise<void> {
    await this.assertions.visible(this.page.getByText("Your delivery address"));
  }

  public async verifyBillingAddress(): Promise<void> {
    await this.assertions.visible(this.page.getByText("Your billing address"));
  }

  public async verifyProducts(expectedProducts: number): Promise<void> {
    const rows = this.page.locator("#cart_info_table tbody tr");
    console.log("Total rows:", await rows.count());
    for (let i = 0; i < (await rows.count()); i++) {
      console.log(await rows.nth(i).innerText());
    }
  }

  /**
   * Enter Order Comment
   */
  public async enterComment(comment: string): Promise<void> {
    Logger.info("Entering Comment");
    await this.ui.textbox(this.txtComment).enter(comment);
  }

  /**
   * Place Order
   */
  public async placeOrder(): Promise<void> {
    Logger.info("Place Order");
    await this.ui.button(this.btnPlaceOrder).click();
  }
}
