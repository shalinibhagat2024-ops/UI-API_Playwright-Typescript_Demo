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

      await test.step("Open Automation Exercise Home page", async () => {
        await pages.automationExercise.home.open();
      });

      await test.step("Navigate to Products page", async () => {
        await pages.automationExercise.auth.products.open();
      });
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
        await test.step("Add Product Search metadata", async () => {
          await UiMetadata.productSearch();
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

    test(
      "Add Product To Cart",
      {
        tag: ["@smoke", "@p2"],
      },
      async ({ pages }) => {
        await test.step(`Add '${product.name}' to cart`, async () => {
          await pages.automationExercise.auth.products.addToCart(product);
        });

        await test.step("Open Shopping Cart", async () => {
          await pages.automationExercise.auth.products.viewCart();
        });
      }
    );

    test(
      "Verify Women Dress Category",
      {
        tag: ["@regression"],
      },
      async ({ pages, page }) => {
        await test.step("Select 'Women > Dress' category", async () => {
          await pages.automationExercise.auth.products.selectCategory("Women", "Dress");
        });

        await test.step("Verify Category Products page is displayed", async () => {
          await expect(page).toHaveURL(/category_products/);
        });
      }
    );

    test(
      "Verify Polo Brand",
      {
        tag: ["@regression", "@p1"],
      },
      async ({ pages, page }) => {
        await test.step("Select 'Polo' brand", async () => {
          await pages.automationExercise.auth.products.selectBrand("Polo");
        });

        await test.step("Verify Brand Products page is displayed", async () => {
          await expect(page).toHaveURL(/brand_products/);
        });
      }
    );
  }
);
