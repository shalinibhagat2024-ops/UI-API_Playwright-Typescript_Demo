import { expect, test } from "@playwright/test";

import { GridShowcasePage } from "../../../src/pages/showcase/GridShowcasePage";

test.describe("Grid Component Showcase", () => {
  test(
    "Verify grid contains employee data",
    {
      tag: ["@ui", "@component", "@grid", "@regression", "@P1"],
    },
    async ({ page }) => {
      const grid = new GridShowcasePage(page);

      await grid.open();
      await page.waitForLoadState("networkidle");
      expect(await grid.employeeGrid.rowCount()).toBeGreaterThan(0);
      expect(await grid.employeeGrid.columnCount()).toBeGreaterThan(0);
      expect(await grid.employeeGrid.containsRow("Cierra")).toBeTruthy();
    }
  );
});
