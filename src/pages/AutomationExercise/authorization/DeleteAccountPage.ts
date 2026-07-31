import { Locator, Page } from "@playwright/test";

import { BasePage } from "../basePage/BasePage";

export class DeleteAccountPage extends BasePage {
  private readonly lblAccountDeleted: Locator;
  private readonly btnContinue: Locator;

  constructor(page: Page) {
    super(page);

    this.lblAccountDeleted = page.getByText("ACCOUNT DELETED!");
    this.btnContinue = page.locator("[data-qa='continue-button']");
  }

  /**
   * Verify Account Deleted successfully.
   */
  public async verifyDeleted() {
    await this.assertions.visible(this.lblAccountDeleted);
  }

  /**
   * Click Continue button.
   */
  public async continue() {
    await this.click(this.btnContinue);
    await this.waits.networkIdle();
  }
}
