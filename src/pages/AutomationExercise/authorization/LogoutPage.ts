import { Logger } from "@core/logger/Logger";
import { expect, Locator, Page } from "@playwright/test";

import { BasePage } from "../basePage/BasePage";

export class LogoutPage extends BasePage {
  // ==========================================================================
  // Locators
  // ==========================================================================

  private readonly lnkLogout: Locator;
  private readonly lnkSignupLogin: Locator;
  private readonly lblLoggedInUser: Locator;

  constructor(page: Page) {
    super(page);

    this.lnkLogout = page.locator("a[href='/logout']");
    this.lnkSignupLogin = page.locator("a[href='/login']");
    this.lblLoggedInUser = page.locator("a:has-text('Logged in as')");
  }

  /**
   * Verifies the user is logged in.
   */
  public async verifyUserLoggedIn(): Promise<this> {
    await this.assertions.visible(this.lblLoggedInUser);
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
   * Verifies logout was successful.
   */
  public async verifyLogoutSuccessful(): Promise<this> {
    await this.assertions.visible(this.lnkSignupLogin);
    await expect(this.page).toHaveURL(/login/);

    return this;
  }

  /**
   * Performs logout and verifies the result.
   */
  public async logoutAndVerify() {
    await this.verifyUserLoggedIn();
    await this.logout();
    await this.verifyLogoutSuccessful();
  }
}
