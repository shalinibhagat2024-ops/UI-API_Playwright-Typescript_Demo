import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";
import { Payment } from "src/models/Payment";

import { BasePage } from "../basePage/BasePage";

export class PaymentPage extends BasePage {
  // ==========================================================================
  // Locators
  // ==========================================================================

  private readonly txtNameOnCard: Locator;
  private readonly txtCardNumber: Locator;
  private readonly txtCVC: Locator;
  private readonly txtExpiryMonth: Locator;
  private readonly txtExpiryYear: Locator;
  private readonly btnPayAndConfirmOrder: Locator;

  constructor(page: Page) {
    super(page);

    this.txtNameOnCard = page.locator("[data-qa='name-on-card']");
    this.txtCardNumber = page.locator("[data-qa='card-number']");
    this.txtCVC = page.locator("[data-qa='cvc']");
    this.txtExpiryMonth = page.locator("[data-qa='expiry-month']");
    this.txtExpiryYear = page.locator("[data-qa='expiry-year']");
    this.btnPayAndConfirmOrder = page.locator("[data-qa='pay-button']");
  }

  /**
   * Verifies the Payment page is displayed.
   */
  public async verifyOpened(): Promise<this> {
    await this.assertions.visible(this.btnPayAndConfirmOrder);
    return this;
  }

  /**
   * Completes the payment process.
   */
  public async pay(payment: Payment) {
    Logger.info("Processing payment.");

    await this.fillPaymentDetails(payment);
    await this.submitPayment();
  }

  /**
   * Fills all payment details.
   */
  private async fillPaymentDetails(payment: Payment) {
    Logger.info("Entering payment details.");

    await this.enterText(payment.nameOnCard, this.txtNameOnCard);
    await this.enterText(payment.cardNumber, this.txtCardNumber);
    await this.enterText(payment.cvc, this.txtCVC);
    await this.enterText(payment.expiryMonth, this.txtExpiryMonth);
    await this.enterText(payment.expiryYear, this.txtExpiryYear);
  }

  /**
   * Submits the payment.
   */
  private async submitPayment() {
    Logger.info("Submitting payment.");

    await this.click(this.btnPayAndConfirmOrder);
    await this.waits.networkIdle();
  }
}
