import { test } from "@fixtures/page.fixture";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe("Proceed Checkout", () => {
  test(
    "Verify Proceed Checkout",
    {
      tag: ["@ui", "@cart", "@smoke", "@regression", "@p1"],
    },
    async ({ pages }) => {
      const product = ProductFactory.blueTop();

      await test.step("Open application and navigate to Products", async () => {
        await pages.automationExercise.home.open();
        await pages.automationExercise.auth.products.open();
      });

      await test.step(`Add product "${product.name}" to cart`, async () => {
        await pages.automationExercise.auth.products.addToCart(product);
      });

      await test.step("Open shopping cart", async () => {
        await pages.automationExercise.auth.products.viewCart();
      });

      await test.step("Proceed to checkout", async () => {
        await pages.automationExercise.auth.cart.proceedToCheckout();
      });
    }
  );
});
