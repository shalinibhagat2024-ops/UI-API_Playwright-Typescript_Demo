import { ProductAssertions } from "@core/assertions/ProductAssertions";
import { UiMetadata } from "@core/reporting/metadata/UiMetadata";
import { test } from "@fixtures/page.fixture";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe("Search Product", () => {
  test(
    "Search Existing Product",
    {
      tag: ["@ui", "@products", "@smoke"],
    },
    async ({ pages }) => {
      const product = ProductFactory.blueTop();

      await test.step("Add Product Search metadata", async () => {
        await UiMetadata.productSearch();
      });

      await test.step("Open Automation Exercise Home page", async () => {
        await pages.automationExercise.home.open();
      });

      await test.step("Navigate to Products page", async () => {
        await pages.automationExercise.auth.products.open();
      });

      await test.step(`Search product '${product.name}'`, async () => {
        await pages.automationExercise.auth.products.searchProduct(product);
      });

      await test.step("Verify the searched product is displayed", async () => {
        ProductAssertions.exists(
          await pages.automationExercise.auth.products.containsProduct(product)
        );
      });
    }
  );
});
