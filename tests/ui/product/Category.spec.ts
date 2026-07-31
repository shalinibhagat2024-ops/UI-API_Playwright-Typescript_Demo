import { expect, test } from "@fixtures/page.fixture";

test.describe("Brand", () => {
  test(
    "Verify Polo",
    {
      tag: ["@ui", "@product", "@regression", "@p1"],
    },
    async ({ pages, page }) => {
      await test.step("Open Automation Exercise Home page", async () => {
        await pages.automationExercise.home.open();
      });

      await test.step("Navigate to Products page", async () => {
        await pages.automationExercise.auth.products.open();
      });

      await test.step("Open Products page using the navigation menu", async () => {
        await pages.automationExercise.auth.products.openFromMenu();
      });

      await test.step("Select the 'Polo' brand", async () => {
        await pages.automationExercise.auth.products.selectBrand("Polo");
      });

      await test.step("Verify the user is redirected to the Brand Products page", async () => {
        await expect(page).toHaveURL(/brand_products/);
      });
    }
  );
});
