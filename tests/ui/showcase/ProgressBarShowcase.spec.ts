import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { test } from "@playwright/test";
import { ProgressBarShowcasePage } from "src/pages/showcase/ProgressBarShowcasePage";

test.describe("Progress Bar Component", () => {
  test(
    "Verify Progress Bar",
    {
      tag: ["@ui", "@component", "@progressbar", "@regression", "@P1"],
    },
    async ({ page }) => {
      const progressPage = new ProgressBarShowcasePage(page);

      await test.step("Open Progress Bar Showcase page", async () => {
        await page.goto(
          `${ApplicationRoutes.demoqa.baseUrl}${ApplicationRoutes.demoqa.progressBar}`
        );
      });

      await test.step("Start the progress bar", async () => {
        await progressPage.start();
      });

      await test.step("Wait for the progress bar to complete", async () => {
        await progressPage.progressBar.waitUntilComplete();
      });

      await test.step("Verify the progress bar reaches 100%", async () => {
        await progressPage.progressBar.verifyPercentage(100);
      });

      await test.step("Reset the progress bar", async () => {
        await progressPage.reset();
      });
    }
  );
});
