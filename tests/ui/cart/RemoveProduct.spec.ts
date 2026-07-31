import { test } from "@fixtures/page.fixture";
import { expect } from "@playwright/test";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe("Remove Product", () => {
  test(
    "Remove Product From Cart",
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

      await test.step(`Remove product "${product.name}" from cart`, async () => {
        await pages.automationExercise.auth.cart.removeProduct(product.name);
      });

      await test.step("Verify the product is removed from the cart", async () => {
        const exists = await pages.automationExercise.auth.cart.containsProduct(product.name);
        expect(exists).toBeFalsy();
      });
    }
  );
});
