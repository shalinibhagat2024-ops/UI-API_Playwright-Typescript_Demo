import { test } from "@playwright/test";

import { CheckboxShowcasePage } from "../../../src/pages/showcase/CheckBoxShowcasePage";

test.describe("Checkbox Component Showcase", () => {
  test(
    "Verify user can select Home checkbox",
    {
      tag: ["@ui", "@component", "@checkbox", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const checkbox = new CheckboxShowcasePage(page);

      await checkbox.open();
      await checkbox.selectHome();
      await checkbox.verifyResultContains("home");
    }
  );
});
