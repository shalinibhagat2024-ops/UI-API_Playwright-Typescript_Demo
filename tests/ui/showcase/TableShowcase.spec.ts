import { expect, test } from "@playwright/test";

import { TableShowcasePage } from "../../../src/pages/showcase/TableShowcasePage";

test.describe("Table Component Showcase", () => {
  test(
    "Verify table row and column count",
    {
      tag: ["@ui", "@component", "@table", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const table = new TableShowcasePage(page);

      await table.open();

      expect(await table.employeeTable.rowCount()).toBeGreaterThan(0);
      expect(await table.employeeTable.columnCount()).toBeGreaterThan(0);
    }
  );

  test(
    "Verify row contains expected employee",
    {
      tag: ["@ui", "@component", "@table", "@regression", "@P1"],
    },
    async ({ page }) => {
      const table = new TableShowcasePage(page);

      await table.open();

      expect(await table.employeeTable.containsRow("Cierra")).toBeTruthy();
    }
  );
});
