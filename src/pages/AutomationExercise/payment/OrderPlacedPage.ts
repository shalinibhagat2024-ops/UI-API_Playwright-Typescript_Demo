import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";

import { BasePage } from "../basePage/BasePage";

export class OrderPlacedPage extends BasePage {
  // ==========================================================================
  // Locators
  // ==========================================================================

  private readonly lblOrderPlaced: Locator;
  private readonly btnContinue: Locator;

  constructor(page: Page) {
    super(page);

    this.lblOrderPlaced = page.locator("[data-qa='order-placed']");
    this.btnContinue = page.locator("[data-qa='continue-button']");
  }

  /**
   * Verifies the order was placed successfully.
   */
  public async verifyOrderPlaced(): Promise<this> {
    Logger.info("Verifying order placed.");

    await this.assertions.containsText(this.lblOrderPlaced, "Order Placed!");

    return this;
  }

  /**
   * Clicks the Continue button.
   */
  public async continue() {
    Logger.info("Clicking Continue.");

    await this.click(this.btnContinue);
    await this.waits.networkIdle();
  }
}
