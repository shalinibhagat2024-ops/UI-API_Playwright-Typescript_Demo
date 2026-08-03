import { Payment } from "@model/payments/Payment";

export class PaymentBuilder {
  private readonly payment: Payment = {
    nameOnCard: "",
    cardNumber: "",
    cvc: "",
    expiryMonth: "",
    expiryYear: "",
  };

  public nameOnCard(value: string): PaymentBuilder {
    this.payment.nameOnCard = value;
    return this;
  }

  public cardNumber(value: string): PaymentBuilder {
    this.payment.cardNumber = value;
    return this;
  }

  public cvc(value: string): PaymentBuilder {
    this.payment.cvc = value;
    return this;
  }

  public expiryMonth(value: string): PaymentBuilder {
    this.payment.expiryMonth = value;
    return this;
  }

  public expiryYear(value: string): PaymentBuilder {
    this.payment.expiryYear = value;
    return this;
  }

  public build(): Payment {
    return this.payment;
  }
}
