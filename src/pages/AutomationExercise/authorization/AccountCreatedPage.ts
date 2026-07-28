import { Locator, Page } from "@playwright/test";

import { BasePage } from "../basePage/BasePage";

export class AccountCreatedPage extends BasePage {
  private readonly lblAccountCreatedSuccessMessage: Locator;
  private readonly btnContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.lblAccountCreatedSuccessMessage = page.locator("h2[data-qa='account-created']");
    this.btnContinue = page.locator("[data-qa='continue-button']");
  }

  /**
   * Verify Account Created
   */
  public async verifyNewAccountCreated(): Promise<void> {
    await this.assertions.containsText(this.lblAccountCreatedSuccessMessage, "Account Created!");
  }

  /**
   * Continue
   */
  public async continue(): Promise<void> {
    await this.ui.button(this.btnContinue).click();
  }
}
