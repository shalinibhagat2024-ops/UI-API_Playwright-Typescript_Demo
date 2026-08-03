import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { expect, test } from "@playwright/test";
import { DragDropShowcasePage } from "src/pages/Components/DragDropShowcasePage";

test.describe("DragDrop Component", () => {
  test.skip(
    "Drag element from A to B",
    {
      tag: ["@ui", "@component", "@dragdrop", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const dragPage = new DragDropShowcasePage(page);

      await test.step("Open Drag and Drop Showcase page", async () => {
        await page.goto(
          `${ApplicationRoutes.internet.baseUrl}${ApplicationRoutes.internet.dragDrop}`
        );
      });

      await test.step("Drag element 'A' and drop it onto element 'B'", async () => {
        await dragPage.dragAtoB();
      });

      await test.step("Verify element 'A' is displayed in the target position", async () => {
        await expect(dragPage.target).toContainText("A");
      });
    }
  );
});
