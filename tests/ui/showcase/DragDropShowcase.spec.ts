import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { expect, test } from "@playwright/test";
import { DragDropShowcasePage } from "src/pages/showcase/DragDropShowcasePage";

test.describe("DragDrop Component", () => {
  test("Drag element from A to B", async ({ page }) => {
    const dragPage = new DragDropShowcasePage(page);

    await page.goto(`${ApplicationRoutes.internet.baseUrl}${ApplicationRoutes.internet.dragDrop}`);

    await dragPage.dragAtoB();

    await expect(dragPage.target).toContainText("A");
  });
});
