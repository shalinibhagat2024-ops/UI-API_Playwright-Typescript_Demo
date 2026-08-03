import { test } from "@playwright/test";
import { CalendarShowcasePage } from "src/pages/Components/CalendarShowcasePage";

test.describe("Calendar Component", () => {
  test.skip(
    "Verify user can select date",
    {
      tag: ["@ui", "@component", "@calendar", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const calendar = new CalendarShowcasePage(page);

      await test.step("Open Calendar Showcase page", async () => {
        await calendar.open();
      });

      await test.step("Select the birth date", async () => {
        await calendar.selectBirthDate();
      });

      await test.step("Verify the selected birth date", async () => {
        await calendar.verifySelectedDate();
      });
    }
  );
});
