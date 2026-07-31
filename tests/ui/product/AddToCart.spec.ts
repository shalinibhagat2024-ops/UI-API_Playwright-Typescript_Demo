import { test } from "@fixtures/page.fixture";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe("Add Product", () => {
  test(
    "Add Product To Cart",
    {
      tag: ["@ui", "@product", "@regression", "@smoke", "@p2"],
    },
    async ({ pages }) => {
      const product = ProductFactory.blueTop();

      await test.step("Open Automation Exercise Home page", async () => {
        await pages.automationExercise.home.open();
      });

      await test.step("Navigate to Products page", async () => {
        await pages.automationExercise.auth.products.open();
      });

      await test.step(`Add '${product.name}' to cart`, async () => {
        await pages.automationExercise.auth.products.addToCart(product);
      });

      await test.step("Open Shopping Cart", async () => {
        await pages.automationExercise.auth.products.viewCart();
      });
    }
  );
});
