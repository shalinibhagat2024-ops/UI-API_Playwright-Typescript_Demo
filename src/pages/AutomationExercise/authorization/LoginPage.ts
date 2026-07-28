import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { EnvironmentManager } from "@core/config/EnvironmentManager";
import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";
import { BasePage } from "src/pages/AutomationExercise/basePage/BasePage";

export class LoginPage extends BasePage {
  // Login
  private readonly txtLoginEmail: Locator;
  private readonly txtLoginPassword: Locator;
  private readonly btnLogin: Locator;

  // Signup
  private readonly txtSignupName: Locator;
  private readonly txtSignupEmail: Locator;
  private readonly btnSignup: Locator;
  private readonly lblLoginHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.txtLoginEmail = page.locator("[data-qa='login-email']");
    this.txtLoginPassword = page.locator("[data-qa='login-password']");
    this.btnLogin = page.locator("[data-qa='login-button']");
    this.txtSignupName = page.locator("[data-qa='signup-name']");
    this.txtSignupEmail = page.locator("[data-qa='signup-email']");
    this.btnSignup = page.locator("[data-qa='signup-button']");
    this.lblLoginHeader = page.getByText("Login to your account");
  }

  /**
   * Open Login Page
   */
  public async open(): Promise<void> {
    Logger.info("Opening Login Page.");
    await this.navigate(
      EnvironmentManager.getBaseUrl(),
      ApplicationRoutes.automationExercise.login
    );
  }

  public async loginAsAdmin(): Promise<void> {
    await this.login(
      EnvironmentManager.getAdminUser().username,
      EnvironmentManager.getAdminUser().password
    );
  }

  /**
   * Login
   */
  public async login(email: string, password: string): Promise<void> {
    Logger.info(`Logging in using ${email}`);
    await this.ui.textbox(this.txtLoginEmail).enter(email);
    await this.ui.textbox(this.txtLoginPassword).enter(password);
    await this.ui.button(this.btnLogin).click();
    await this.waits.networkIdle();
  }

  /**
   * Open Signup
   */
  public async startSignup(name: string, email: string): Promise<void> {
    Logger.info("Starting Signup.");
    await this.ui.textbox(this.txtSignupName).enter(name);
    await this.ui.textbox(this.txtSignupEmail).enter(email);
    await this.ui.button(this.btnSignup).click();
    await this.waits.networkIdle();
  }

  /**
   * Verify Page Loaded
   */
  public async verifyLoaded(): Promise<void> {
    await this.assertions.visible(this.lblLoginHeader);
  }

  //Verify user is login or not

  async isLoggedIn(): Promise<boolean> {
    return await this.lblLoginHeader.isVisible().catch(() => false);
  }

  async loginIfRequired(username: string, password: string): Promise<void> {
    if (await this.isLoggedIn()) {
      console.log("User is already logged in.");
      return;
    }
    console.log("User is not logged in. Logging in...");
    await this.login(username, password);
  }
}
