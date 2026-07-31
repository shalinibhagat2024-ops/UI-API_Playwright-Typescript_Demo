import { CartAssertions } from "@core/assertions/CartAssertions";
import { test } from "@fixtures/page.fixture";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe("Verify Total", () => {
  test(
    "Verify Product Total",
    {
      tag: ["@ui", "@cart", "@regression"],
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

      await test.step("Verify the product total", async () => {
        const item = await pages.automationExercise.auth.cart.getProduct(product.name);

        CartAssertions.total(item.total, item.price * item.quantity);
      });
    }
  );
});
