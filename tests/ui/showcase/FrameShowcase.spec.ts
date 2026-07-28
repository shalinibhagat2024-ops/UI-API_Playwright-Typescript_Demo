import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { test } from "@playwright/test";
import { FrameShowcasePage } from "src/pages/showcase/FrameShowcasePage";

test.describe("Frame Component", () => {
  test("Handle TinyMCE iframe", async ({ page }) => {
    const framePage = new FrameShowcasePage(page);

    await page.goto(`${ApplicationRoutes.internet.baseUrl}/iframe`);

    await framePage.enterText("Playwright Enterprise Framework");

    await framePage.verifyText("Playwright Enterprise Framework");
  });
});
