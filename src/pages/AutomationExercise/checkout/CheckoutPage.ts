import { Logger } from "@core/logger/Logger";
import { expect, Locator, Page } from "@playwright/test";

import { BasePage } from "../basePage/BasePage";

export class CheckoutPage extends BasePage {
  // ==========================================================================
  // Locators
  // ==========================================================================

  private readonly lblAddressDetails: Locator;
  private readonly lblReviewOrder: Locator;
  private readonly lblDeliveryAddress: Locator;
  private readonly lblBillingAddress: Locator;
  private readonly txtComment: Locator;
  private readonly btnPlaceOrder: Locator;
  private readonly cartRows: Locator;

  constructor(page: Page) {
    super(page);

    this.lblAddressDetails = page.getByText("Address Details");
    this.lblReviewOrder = page.getByText("Review Your Order");
    this.lblDeliveryAddress = page.getByText("Your delivery address");
    this.lblBillingAddress = page.getByText("Your billing address");

    this.txtComment = page.locator("textarea[name='message']");
    this.btnPlaceOrder = page.locator("a.check_out");

    this.cartRows = page.locator("#cart_info_table tbody tr");
  }

  /**
   * Verifies Checkout page is displayed.
   */
  public async verifyOpened(): Promise<this> {
    Logger.info("Verifying Checkout page.");

    await this.assertions.visible(this.lblAddressDetails);
    await this.assertions.visible(this.lblReviewOrder);

    return this;
  }

  /**
   * Verifies Delivery Address section.
   */
  public async verifyDeliveryAddress() {
    await this.assertions.visible(this.lblDeliveryAddress);
  }

  /**
   * Verifies Billing Address section.
   */
  public async verifyBillingAddress() {
    await this.assertions.visible(this.lblBillingAddress);
  }

  /**
   * Verifies number of products in the order.
   */
  public async verifyProducts(expectedProducts: number) {
    await expect(this.cartRows).toHaveCount(expectedProducts);
  }

  /**
   * Enters order comment.
   */
  public async enterComment(comment: string) {
    Logger.info("Entering order comment.");

    await this.enterText(comment, this.txtComment);
  }

  /**
   * Places the order.
   */
  public async placeOrder() {
    Logger.info("Placing order.");

    await this.click(this.btnPlaceOrder);
    await this.waits.networkIdle();
  }
}
