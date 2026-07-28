import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { test } from "@playwright/test";
import { ProgressBarShowcasePage } from "src/pages/showcase/ProgressBarShowcasePage";

test.describe("Progress Bar Component", () => {
  test("Verify Progress Bar", async ({ page }) => {
    const progressPage = new ProgressBarShowcasePage(page);

    await page.goto(`${ApplicationRoutes.demoqa.baseUrl}${ApplicationRoutes.demoqa.progressBar}`);

    await progressPage.start();

    await progressPage.progressBar.waitUntilComplete();

    await progressPage.progressBar.verifyPercentage(100);

    await progressPage.reset();
  });
});
