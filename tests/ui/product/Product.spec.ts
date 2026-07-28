import { ProductAssertions } from "@core/assertions/ProductAssertions";
import { UiMetadata } from "@core/reporting/metadata/UiMetadata";
import { expect, test } from "@fixtures/page.fixture";
import { ProductFactory } from "src/testdata/factories/ProductFactory";

test.describe(
  "Product Module",
  {
    tag: ["@ui", "@product"],
  },
  () => {
    let product: ReturnType<typeof ProductFactory.blueTop>;

    test.beforeEach(async ({ pages }) => {
      product = ProductFactory.blueTop();

      await pages.automationExercise.home.open();
      await pages.automationExercise.auth.products.open();
    });

    test.afterEach(async ({}, testInfo) => {
      console.log(`${testInfo.title} : ${testInfo.status}`);
    });

    test(
      "Search Existing Product",
      {
        tag: ["@smoke"],
      },
      async ({ pages }) => {
        await UiMetadata.productSearch();

        await pages.automationExercise.auth.products.search(product);

        ProductAssertions.exists(
          await pages.automationExercise.auth.products.containsProduct(product)
        );
      }
    );

    test(
      "Add Product To Cart",
      {
        tag: ["@smoke", "@p2"],
      },
      async ({ pages }) => {
        await pages.automationExercise.auth.products.addToCart(product);

        await pages.automationExercise.auth.products.viewCart();
      }
    );

    test(
      "Verify Women Dress Category",
      {
        tag: ["@regression"],
      },
      async ({ pages, page }) => {
        await pages.automationExercise.auth.products.selectCategory("Women", "Dress");

        await expect(page).toHaveURL(/category_products/);
      }
    );

    test(
      "Verify Polo Brand",
      {
        tag: ["@regression", "@p1"],
      },
      async ({ pages, page }) => {
        await pages.automationExercise.auth.products.selectBrand("Polo");

        await expect(page).toHaveURL(/brand_products/);
      }
    );
  }
);
