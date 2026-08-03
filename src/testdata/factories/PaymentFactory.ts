import { Payment } from "@model/payments/Payment";
import { PaymentBuilder } from "src/testdata/builders/PaymentBuilder";
import { RandomUtil } from "src/utils/random/RandomUtil";

export class PaymentFactory {
  public static random(): Payment {
    return new PaymentBuilder()
      .nameOnCard("Automation User")
      .cardNumber(RandomUtil.number(16))
      .cvc(RandomUtil.number(3))
      .expiryMonth("12")
      .expiryYear("2030")
      .build();
  }
}
