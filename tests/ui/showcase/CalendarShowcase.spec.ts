import { test } from "@playwright/test";

import { CalendarShowcasePage } from "../../../src/pages/showcase/CalendarShowcasePage";

test.describe("Calendar Component", () => {
  test(
    "Verify user can select date",
    {
      tag: ["@ui", "@component", "@calendar", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const calendar = new CalendarShowcasePage(page);

      await calendar.open();
      await calendar.selectBirthDate();
      await calendar.verifySelectedDate();
    }
  );
});
