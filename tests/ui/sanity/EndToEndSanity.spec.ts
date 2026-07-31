import { test } from "@fixtures/page.fixture";
import { PaymentFactory } from "src/testdata/factories/PaymentFactory";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe("End To End Sanity", () => {
  test(
    "Complete Purchase Flow",
    {
      tag: ["@sanity", "@e2e", "@p1"],
    },
    async ({ pages }) => {
      const product = ProductFactory.blueTop();
      const payment = PaymentFactory.random();

      await test.step("Open application", async () => {
        await pages.automationExercise.home.open();
      });

      await test.step("Navigate to Products", async () => {
        await pages.automationExercise.auth.products.open();
        await pages.automationExercise.auth.products.verifyOpened();
      });

      await test.step(`Add "${product.name}" to cart`, async () => {
        await pages.automationExercise.auth.products.addToCart(product);
        await pages.automationExercise.auth.products.viewCart();
      });

      await test.step("Verify shopping cart", async () => {
        await pages.automationExercise.auth.cart.verifyOpened();
        await pages.automationExercise.auth.cart.verifyProductExists(product.name);
      });

      await test.step("Proceed to checkout", async () => {
        await pages.automationExercise.auth.cart.proceedToCheckout();
      });

      await test.step("Complete checkout details", async () => {
        await pages.automationExercise.auth.checkout.verifyOpened();
        await pages.automationExercise.auth.checkout.verifyDeliveryAddress();
        await pages.automationExercise.auth.checkout.enterComment(
          "Enterprise Playwright Framework"
        );
        await pages.automationExercise.auth.checkout.placeOrder();
      });

      await test.step("Complete payment", async () => {
        await pages.automationExercise.auth.payment.verifyOpened();
        await pages.automationExercise.auth.payment.pay(payment);
      });

      await test.step("Verify order placement", async () => {
        await pages.automationExercise.auth.orderPlaced.verifyOrderPlaced();
        await pages.automationExercise.auth.orderPlaced.continue();
      });
    }
  );
});
