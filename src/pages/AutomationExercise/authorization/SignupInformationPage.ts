import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";
import { User } from "src/models/user";

import { BasePage } from "../basePage/BasePage";

export class SignupInformationPage extends BasePage {
  //=========================================================
  // Account Information
  //=========================================================
  private readonly radioMr: Locator;
  private readonly radioMrs: Locator;
  private readonly txtPassword: Locator;
  private readonly ddlDay: Locator;
  private readonly ddlMonth: Locator;
  private readonly ddlYear: Locator;
  private readonly chkNewsletter: Locator;
  private readonly chkOffers: Locator;

  //=========================================================
  // Address Information
  //=========================================================
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
    this.radioMr = page.locator("#id_gender1");
    this.radioMrs = page.locator("#id_gender2");
    this.txtPassword = page.locator("[data-qa='password']");
    this.ddlDay = page.locator("[data-qa='days']");
    this.ddlMonth = page.locator("[data-qa='months']");
    this.ddlYear = page.locator("[data-qa='years']");
    this.chkNewsletter = page.locator("#newsletter");
    this.chkOffers = page.locator("#optin");
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
   * Complete Registration
   */
  public async register(user: User): Promise<void> {
    Logger.info(`Registering user : ${user.email}`);

    if (user.title === "Mr") {
      await this.ui.radio(this.radioMr).check();
    } else {
      await this.ui.radio(this.radioMrs).check();
    }

    await this.ui.textbox(this.txtPassword).enter(user.password);
    await this.ui.dropdown(this.ddlDay).selectByValue(user.day!);
    await this.ui.dropdown(this.ddlMonth).selectByValue(user.month!);
    await this.ui.dropdown(this.ddlYear).selectByValue(user.year!);
    await this.ui.dropdown(this.ddlCountry).selectByLabel(user.country!);

    await this.ui.checkbox(this.chkNewsletter).check();
    await this.ui.checkbox(this.chkOffers).check();

    await this.ui.textbox(this.txtFirstName).enter(user.firstName!);
    await this.ui.textbox(this.txtLastName).enter(user.lastName!);
    await this.ui.textbox(this.txtCompany).enter(user.company!);
    await this.ui.textbox(this.txtAddress1).enter(user.address1!);
    await this.ui.textbox(this.txtAddress2).enter(user.address2!);
    await this.ui.dropdown(this.ddlCountry).selectByLabel(user.country!);
    await this.ui.textbox(this.txtState).enter(user.state!);
    await this.ui.textbox(this.txtCity).enter(user.city!);
    await this.ui.textbox(this.txtZipcode).enter(user.zipcode!);
    await this.ui.textbox(this.txtMobile).enter(user.mobileNumber!);

    await this.ui.button(this.btnCreateAccount).click();
  }
}
