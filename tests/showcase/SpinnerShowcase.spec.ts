import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { test } from "@playwright/test";
import { SpinnerShowcasePage } from "src/pages/showcase/SpinnerShowcasePage";

test.describe("Spinner Component Showcase", () => {
  test("Verify Spinner Component", async ({ page }) => {
    const spinnerPage = new SpinnerShowcasePage(page);

    await page.goto(
      `${ApplicationRoutes.internet.baseUrl}${ApplicationRoutes.internet.dynamicLoading}`
    );

    await spinnerPage.clickStart();

    await spinnerPage.spinner.waitUntilVisible();

    await spinnerPage.spinner.verifyVisible();

    await spinnerPage.spinner.waitUntilHidden();

    await spinnerPage.spinner.verifyHidden();

    await spinnerPage.verifyLoaded();
  });
});
