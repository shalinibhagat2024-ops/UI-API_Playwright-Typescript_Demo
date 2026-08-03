import { Logger } from "@core/logger/Logger";
import { User } from "@model/users/user";
import { Locator, Page } from "@playwright/test";

import { BasePage } from "../basePage/BasePage";

export class SignupInformationPage extends BasePage {
  // ==========================================================================
  // Account Information
  // ==========================================================================

  private readonly radioMr: Locator;
  private readonly radioMrs: Locator;
  private readonly txtPassword: Locator;
  private readonly ddlDay: Locator;
  private readonly ddlMonth: Locator;
  private readonly ddlYear: Locator;
  private readonly chkNewsletter: Locator;
  private readonly chkOffers: Locator;

  // ==========================================================================
  // Address Information
  // ==========================================================================

  private readonly txtFirstName: Locator;
  private readonly txtLastName: Locator;
  private readonly txtCompany: Locator;
  private readonly txtAddress1: Locator;
  private readonly txtAddress2: Locator;
  private readonly ddlCountry: Locator;
  private readonly txtState: Locator;
  private readonly txtCity: Locator;
  private readonly txtZipcode: Locator;
  private readonly txtMobile: Locator;
  private readonly btnCreateAccount: Locator;

  constructor(page: Page) {
    super(page);

    // Account Information
    this.radioMr = page.locator("#id_gender1");
    this.radioMrs = page.locator("#id_gender2");
    this.txtPassword = page.locator("[data-qa='password']");
    this.ddlDay = page.locator("[data-qa='days']");
    this.ddlMonth = page.locator("[data-qa='months']");
    this.ddlYear = page.locator("[data-qa='years']");
    this.chkNewsletter = page.locator("#newsletter");
    this.chkOffers = page.locator("#optin");

    // Address Information
    this.txtFirstName = page.locator("[data-qa='first_name']");
    this.txtLastName = page.locator("[data-qa='last_name']");
    this.txtCompany = page.locator("[data-qa='company']");
    this.txtAddress1 = page.locator("[data-qa='address']");
    this.txtAddress2 = page.locator("[data-qa='address2']");
    this.ddlCountry = page.locator("[data-qa='country']");
    this.txtState = page.locator("[data-qa='state']");
    this.txtCity = page.locator("[data-qa='city']");
    this.txtZipcode = page.locator("[data-qa='zipcode']");
    this.txtMobile = page.locator("[data-qa='mobile_number']");
    this.btnCreateAccount = page.locator("[data-qa='create-account']");
  }

  /**
   * Completes user registration.
   */
  public async register(user: User) {
    Logger.info(`Registering user: ${user.email}`);

    await this.fillAccountInformation(user);
    await this.fillAddressInformation(user);

    await this.click(this.btnCreateAccount);
    await this.waits.networkIdle();
  }

  /**
   * Fills the Account Information section.
   */
  private async fillAccountInformation(user: User) {
    await this.check(user.title === "Mr" ? this.radioMr : this.radioMrs);

    await this.enterText(user.password, this.txtPassword);

    await this.selectByValue(user.day!, this.ddlDay);
    await this.selectByValue(user.month!, this.ddlMonth);
    await this.selectByValue(user.year!, this.ddlYear);

    await this.check(this.chkNewsletter);
    await this.check(this.chkOffers);
  }

  /**
   * Fills the Address Information section.
   */
  private async fillAddressInformation(user: User) {
    await this.enterText(user.firstName!, this.txtFirstName);
    await this.enterText(user.lastName!, this.txtLastName);
    await this.enterText(user.company!, this.txtCompany);
    await this.enterText(user.address1!, this.txtAddress1);
    await this.enterText(user.address2!, this.txtAddress2);

    await this.selectByLabel(user.country!, this.ddlCountry);

    await this.enterText(user.state!, this.txtState);
    await this.enterText(user.city!, this.txtCity);
    await this.enterText(user.zipcode!, this.txtZipcode);
    await this.enterText(user.mobileNumber!, this.txtMobile);
  }
}
