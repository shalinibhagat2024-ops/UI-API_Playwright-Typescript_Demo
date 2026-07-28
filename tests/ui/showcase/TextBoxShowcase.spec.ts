import { test } from "@playwright/test";

import { TextBoxShowcasePage } from "../../../src/pages/showcase/TextBoxShowcasePage";

test.describe("TextBox Component", () => {
  test("Verify user can enter text", async ({ page }) => {
    const textbox = new TextBoxShowcasePage(page);

    await textbox.open();
    await textbox.enterFullName("Shalini Bhagat");
    await textbox.verifyFullName("Shalini Bhagat");
  });
});
