import { CartAssertions } from "@core/assertions/CartAssertions";
import { test } from "@fixtures/page.fixture";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe("Verify Quantity", () => {
  test(
    "Verify Default Quantity",
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

      await test.step("Verify the default product quantity", async () => {
        const item = await pages.automationExercise.auth.cart.getProduct(product.name);
        CartAssertions.quantity(item.quantity, item.quantity);
      });
    }
  );
});
