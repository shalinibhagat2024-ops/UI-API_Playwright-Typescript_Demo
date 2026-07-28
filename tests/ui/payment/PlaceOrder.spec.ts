import { test } from "@fixtures/page.fixture";
import { PaymentFactory } from "src/testdata/factories/PaymentFactory";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe("Place Order", () => {
  test(
    "Verify Complete Purchase",
    {
      tag: ["@checkout", "@payment", "@regression", "@smoke"],
    },
    async ({ pages }) => {
      const product = ProductFactory.blueTop();
      const payment = PaymentFactory.random();

      await test.step("Open application", async () => {
        await pages.automationExercise.home.open();
      });

      await test.step("Add product to cart", async () => {
        await pages.automationExercise.auth.products.open();
        await pages.automationExercise.auth.products.addToCart(product);
        await pages.automationExercise.auth.products.viewCart();
      });

      await test.step("Proceed to checkout", async () => {
        await pages.automationExercise.auth.cart.proceedToCheckout();
        await pages.automationExercise.auth.checkout.enterComment("Automation Purchase");
        await pages.automationExercise.auth.checkout.placeOrder();
      });

      await test.step("Complete payment", async () => {
        await pages.automationExercise.auth.payment.verifyOpened();
        await pages.automationExercise.auth.payment.pay(payment);
      });

      await test.step("Verify order placed successfully", async () => {
        await pages.automationExercise.auth.orderPlaced.verifyOrderPlaced();
        await pages.automationExercise.auth.orderPlaced.continue();
      });
    }
  );
});
