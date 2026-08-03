import { test } from "@playwright/test";
import { InputControlsShowcasePage } from "src/pages/Components/InputControlsShowcasePage";

test.describe("Input Controls Showcase", () => {
  test.skip(
    "Verify TextBox Component",
    {
      tag: ["@ui", "@component", "@textbox", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const input = new InputControlsShowcasePage(page);

      await test.step("Open Input Controls Showcase page", async () => {
        await input.open();
      });

      await test.step("Submit the input form", async () => {
        await input.submitInputForm();
      });
    }
  );
});
