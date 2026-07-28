import { test } from "@playwright/test";

import { RadioButtonShowcasePage } from "../../../src/pages/showcase/RadioButtonShowcasePage";

test.describe("Radio Button Component Showcase", () => {
  test(
    "Verify user can select Yes radio button",
    {
      tag: ["@ui", "@component", "@radio", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const radio = new RadioButtonShowcasePage(page);

      await radio.open();
      await radio.selectYes();
      await radio.verifySelection("Yes");
    }
  );
});
