import { test } from "@playwright/test";

import { InputControlsShowcasePage } from "../../../src/pages/showcase/InputControlsShowcasePage";

test.describe("Input Controls Showcase", () => {
  test("Verify TextBox Component", async ({ page }) => {
    const input = new InputControlsShowcasePage(page);
    await input.open();
    await input.submitInputForm();
  });
});
