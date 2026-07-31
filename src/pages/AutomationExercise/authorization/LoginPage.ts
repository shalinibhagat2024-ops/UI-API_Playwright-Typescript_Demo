import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { EnvironmentManager } from "@core/config/EnvironmentManager";
import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";

import { BasePage } from "../basePage/BasePage";

export class LoginPage extends BasePage {
  // ==========================================================================
  // Login
  // ==========================================================================

  private readonly txtLoginEmail: Locator;
  private readonly txtLoginPassword: Locator;
  private readonly btnLogin: Locator;

  // ==========================================================================
  // Signup
  // ==========================================================================

  private readonly txtSignupName: Locator;
  private readonly txtSignupEmail: Locator;
  private readonly btnSignup: Locator;

  // ==========================================================================
  // Labels
  // ==========================================================================

  private readonly lblLoginHeader: Locator;

  constructor(page: Page) {
    super(page);

    // Login
    this.txtLoginEmail = page.locator("[data-qa='login-email']");
    this.txtLoginPassword = page.locator("[data-qa='login-password']");
    this.btnLogin = page.locator("[data-qa='login-button']");

    // Signup
    this.txtSignupName = page.locator("[data-qa='signup-name']");
    this.txtSignupEmail = page.locator("[data-qa='signup-email']");
    this.btnSignup = page.locator("[data-qa='signup-button']");

    // Labels
    this.lblLoginHeader = page.getByText("Login to your account");
  }

  /**
   * Opens the Login page.
   */
  public async open() {
    Logger.info("Opening Login page.");

    await this.navigate(
      EnvironmentManager.getBaseUrl(),
      ApplicationRoutes.automationExercise.login
    );
  }

  /**
   * Logs in using configured admin credentials.
   */
  public async loginAsAdmin() {
    const { username, password } = EnvironmentManager.getAdminUser();

    await this.login(username, password);
  }

  /**
   * Logs in using the supplied credentials.
   */
  public async login(email: string, password: string) {
    Logger.info(`Logging in with user: ${email}`);

    await this.enterText(email, this.txtLoginEmail);
    await this.enterText(password, this.txtLoginPassword);
    await this.click(this.btnLogin);

    await this.waits.networkIdle();
  }

  /**
   * Starts the signup process.
   */
  public async startSignup(name: string, email: string) {
    Logger.info("Starting signup.");

    await this.enterText(name, this.txtSignupName);
    await this.enterText(email, this.txtSignupEmail);
    await this.click(this.btnSignup);

    await this.waits.networkIdle();
  }

  /**
   * Verifies the Login page is displayed.
   */
  public async verifyLoaded(): Promise<this> {
    await this.assertions.visible(this.lblLoginHeader);
    return this;
  }

  /**
   * Returns true if the Login page is currently displayed.
   */
  public async isLoginPageDisplayed(): Promise<boolean> {
    return this.isVisible(this.lblLoginHeader);
  }

  /**
   * Performs login only when the Login page is displayed.
   */
  public async loginIfRequired(username: string, password: string) {
    if (!(await this.isLoginPageDisplayed())) {
      Logger.info("User is already authenticated.");
      return;
    }

    Logger.info("Login page detected. Performing login.");

    await this.login(username, password);
  }
}
