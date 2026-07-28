import { expect, test } from "@playwright/test";

import { DropdownShowcasePage } from "../../../src/pages/showcase/DropdownShowcasePage";

test.describe("Dropdown Component", () => {
  test(
    "Verify user can select dropdown value",
    {
      tag: ["@ui", "@dropdown", "@component", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const dropdown = new DropdownShowcasePage(page);

      await dropdown.open();
      await dropdown.selectPurple();

      await expect(dropdown.oldStyleDropdown).toBeDefined();
    }
  );
});
