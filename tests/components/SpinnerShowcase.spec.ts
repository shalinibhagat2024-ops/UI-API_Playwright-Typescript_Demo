import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { test } from "@playwright/test";
import { SpinnerShowcasePage } from "src/pages/showcase/SpinnerShowcasePage";

test.describe("Spinner Component Showcase", () => {
  test.skip(
    "Verify Spinner Component",
    {
      tag: ["@ui", "@component", "@spinner", "@regression", "@P1"],
    },
    async ({ page }) => {
      const spinnerPage = new SpinnerShowcasePage(page);

      await test.step("Open Spinner Showcase page", async () => {
        await page.goto(
          `${ApplicationRoutes.internet.baseUrl}${ApplicationRoutes.internet.dynamicLoading}`
        );
      });

      await test.step("Start the dynamic loading process", async () => {
        await spinnerPage.clickStart();
      });

      await test.step("Wait for the spinner to become visible", async () => {
        await spinnerPage.spinner.waitUntilVisible();
      });

      await test.step("Verify the spinner is displayed", async () => {
        await spinnerPage.spinner.verifyVisible();
      });

      await test.step("Wait for the spinner to disappear", async () => {
        await spinnerPage.spinner.waitUntilHidden();
      });

      await test.step("Verify the spinner is no longer displayed", async () => {
        await spinnerPage.spinner.verifyHidden();
      });

      await test.step("Verify the content is loaded successfully", async () => {
        await spinnerPage.verifyLoaded();
      });
    }
  );
});
