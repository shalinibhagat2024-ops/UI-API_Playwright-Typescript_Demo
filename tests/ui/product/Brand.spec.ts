import { JsonReader } from "@core/helpers/dataReaders/JsonReader";
import { expect, test } from "@fixtures/page.fixture";
import { Brand } from "@model/products/Brands";

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
  const brands = JsonReader.read<Brand[]>("products/brands.json");
  test.describe("Brand Products", () => {
    for (const brand of brands) {
      test(
        `Verify '${brand.name}' Brand Products`,
        {
          tag: ["@ui", "@product", "@brand", "@regression"],
        },
        async ({ pages, page }) => {
          await test.step("Open Home page", async () => {
            await pages.automationExercise.home.open();
          });

          await test.step("Open Products page", async () => {
            await pages.automationExercise.auth.products.open();
          });

          await test.step(`Select '${brand.name}' brand`, async () => {
            await pages.automationExercise.auth.products.selectBrand(brand.name);
          });

          await test.step("Verify Brand Products page is displayed", async () => {
            await expect(page).toHaveURL(/brand_products/);
          });
        }
      );
    }
  });
});
