import { expect, test } from "@playwright/test";
import { GridShowcasePage } from "src/pages/Components/GridShowcasePage";

test.describe("Grid Component Showcase", () => {
  test.skip(
    "Verify grid contains employee data",
    {
      tag: ["@ui", "@component", "@grid", "@regression", "@P1"],
    },
    async ({ page }) => {
      const grid = new GridShowcasePage(page);

      await test.step("Open Grid Showcase page", async () => {
        await grid.open();
      });

      await test.step("Wait for the grid data to load", async () => {
        await page.waitForLoadState("networkidle");
      });

      await test.step("Verify the grid contains employee records", async () => {
        expect(await grid.employeeGrid.rowCount()).toBeGreaterThan(0);
      });

      await test.step("Verify the grid contains columns", async () => {
        expect(await grid.employeeGrid.columnCount()).toBeGreaterThan(0);
      });

      await test.step("Verify the employee 'Cierra' is displayed in the grid", async () => {
        expect(await grid.employeeGrid.containsRow("Cierra")).toBeTruthy();
      });
    }
  );
});
