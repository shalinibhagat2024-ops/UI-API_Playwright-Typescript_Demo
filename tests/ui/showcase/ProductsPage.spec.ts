import { test } from "@playwright/test";
import { ProductsPage } from "src/pages/showcase/ProductsPage";

test("Verify Product Card", async ({ page }) => {
  const products = new ProductsPage(page);

  await page.goto("https://automationexercise.com/products");

  await products.verifyFirstProduct("Blue Top");

  await products.addFirstProductToCart();
});
