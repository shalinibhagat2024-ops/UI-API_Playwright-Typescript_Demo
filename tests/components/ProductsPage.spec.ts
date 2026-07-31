import { test } from "@playwright/test";
import { ProductsPage } from "src/pages/showcase/ProductsPage";

test.describe("Product Card", () => {
  test.skip(
    "Verify Product Card",
    {
      tag: ["@ui", "@component", "@product", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const products = new ProductsPage(page);

      await test.step("Open Products page", async () => {
        await page.goto("https://automationexercise.com/products");
      });

      await test.step("Verify the first product is 'Blue Top'", async () => {
        await products.verifyFirstProduct("Blue Top");
      });

      await test.step("Add the first product to the shopping cart", async () => {
        await products.addFirstProductToCart();
      });
    }
  );
});
