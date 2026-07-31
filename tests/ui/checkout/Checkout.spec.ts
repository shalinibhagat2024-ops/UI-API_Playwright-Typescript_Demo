import { test } from "@fixtures/page.fixture";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe("Checkout", () => {
  test(
    "Verify Checkout",
    {
      tag: ["@ui", "@checkout", "@smoke", "@regression"],
    },
    async ({ pages }) => {
      test("Place Order", async ({ pages }) => {
        const product = ProductFactory.blueTop();

        await test.step("Arrange: Open application and navigate to Products", async () => {
          await pages.automationExercise.home.open();
          await pages.automationExercise.auth.products.open();
        });

        await test.step("Act: Add product and proceed to Checkout", async () => {
          await pages.automationExercise.auth.products.addToCart(product);
          await pages.automationExercise.auth.products.viewCart();
          await pages.automationExercise.auth.cart.proceedToCheckout();
        });

        await test.step("Assert: Verify checkout information", async () => {
          await pages.automationExercise.auth.checkout.verifyOpened();
          await pages.automationExercise.auth.checkout.verifyDeliveryAddress();
          await pages.automationExercise.auth.checkout.verifyBillingAddress();
          await pages.automationExercise.auth.checkout.verifyProducts(1);
        });

        await test.step("Act: Place the order", async () => {
          await pages.automationExercise.auth.checkout.enterComment("Automation Framework");
          await pages.automationExercise.auth.checkout.placeOrder();
        });
      });
    }
  );
});
