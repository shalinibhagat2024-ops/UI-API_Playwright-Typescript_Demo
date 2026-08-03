import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { EnvironmentManager } from "@core/config/EnvironmentManager";
import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";

import { BasePage } from "../basePage/BasePage";

export class HomePage extends BasePage {
  // ==========================================================================
  // Navigation
  // ==========================================================================

  private readonly lnkSignupLogin: Locator;
  private readonly lnkProducts: Locator;
  private readonly lnkCart: Locator;
  private readonly lnkLogout: Locator;

  // ==========================================================================
  // Labels
  // ==========================================================================

  private readonly lblLoggedInAs: Locator;

  constructor(page: Page) {
    super(page);

    this.lnkSignupLogin = page.locator("a[href='/login']");

    this.lnkProducts = page.locator("header").getByRole("link", {
      name: /^Products$/i,
    });

    this.lnkCart = page.locator("a[href='/view_cart']");
    this.lnkLogout = page.locator("a[href='/logout']");

    this.lblLoggedInAs = page.locator("li").filter({
      hasText: "Logged in as",
    });
  }

  /**
   * Opens the Home page.
   */
  public async open() {
    Logger.info("Opening Automation Exercise Home page.");

    await this.navigate(EnvironmentManager.getBaseUrl(), ApplicationRoutes.automationExercise.home);
  }

  /**
   * Opens the Login page.
   * Logs out first if a user is already authenticated.
   */
  public async openLogin() {
    Logger.info("Opening Login page.");

    if (await this.isVisible(this.lnkLogout)) {
      Logger.info("User is already logged in. Logging out.");

      await this.click(this.lnkLogout);
      await this.waits.networkIdle();
    }

    await this.click(this.lnkSignupLogin);
    await this.waits.networkIdle();
  }

  /**
   * Opens the Products page.
   */
  public async openProducts() {
    Logger.info("Opening Products page.");

    await this.click(this.lnkProducts);
    await this.waits.networkIdle();
  }

  /**
   * Opens the Cart page.
   */
  public async openCart() {
    Logger.info("Opening Cart page.");

    await this.click(this.lnkCart);
    await this.waits.networkIdle();
  }

  /**
   * Verifies the logged-in user.
   */
  public async verifyLoggedInUser(name: string): Promise<this> {
    await this.assertions.containsText(this.lblLoggedInAs, `Logged in as ${name}`);

    return this;
  }

  public async verifyUserLoggedIn() {
    await this.assertions.visible(this.page.getByText("Logged in as"));
  }
}
