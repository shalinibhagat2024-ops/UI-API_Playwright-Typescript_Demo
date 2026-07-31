import { Logger } from "@core/logger/Logger";
import { expect, Locator, Page } from "@playwright/test";

import { BasePage } from "../basePage/BasePage";

export class Header extends BasePage {
  // ==========================================================================
  // Locators
  // ==========================================================================

  private readonly lblLoggedInAs: Locator;
  private readonly lnkLogout: Locator;
  private readonly lnkDeleteAccount: Locator;
  private readonly lnkCart: Locator;

  constructor(page: Page) {
    super(page);

    this.lblLoggedInAs = page.locator("li").filter({
      hasText: "Logged in as",
    });

    this.lnkLogout = page.locator("a[href='/logout']");
    this.lnkDeleteAccount = page.locator("a[href='/delete_account']");
    this.lnkCart = page.locator("a[href='/view_cart']").first();
  }

  /**
   * Verifies the logged-in user.
   */
  public async verifyLoggedIn(name: string): Promise<this> {
    await this.assertions.containsText(this.lblLoggedInAs, `Logged in as ${name}`);

    return this;
  }

  /**
   * Logs out the current user.
   */
  public async logout() {
    Logger.info("Logging out.");

    await this.click(this.lnkLogout);
    await this.waits.networkIdle();
  }

  /**
   * Deletes the current user account.
   */
  public async deleteAccount() {
    Logger.info("Deleting account.");

    await this.click(this.lnkDeleteAccount);

    await this.waits.networkIdle(10000);
    await this.waits.pageLoad();
  }

  /**
   * Opens the shopping cart.
   */
  public async openCart() {
    Logger.info("Opening Cart.");

    await this.click(this.lnkCart);

    await expect(this.page).toHaveURL(/view_cart/);
  }
}
