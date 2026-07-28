import { test } from "@playwright/test";

import { ButtonShowcasePage } from "../../../src/pages/showcase/ButtonShowcasePage";

test.describe("Button Component Showcase", () => {
  test("Verify all button actions", async ({ page }) => {
    const button = new ButtonShowcasePage(page);

    await button.open();
    await button.performDoubleClick();
    await button.performRightClick();
    await button.performClick();
  });
});
