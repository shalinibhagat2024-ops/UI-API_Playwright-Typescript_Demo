import { expect, test } from "@playwright/test";

import { TableShowcasePage } from "../../src/pages/Components/TableShowcasePage";

test.describe("Table Component Showcase", () => {
  test.skip(
    "Verify table row and column count",
    {
      tag: ["@ui", "@component", "@table", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const table = new TableShowcasePage(page);

      await test.step("Open Table Showcase page", async () => {
        await table.open();
      });

      await test.step("Verify the table contains one or more rows", async () => {
        expect(await table.employeeTable.rowCount()).toBeGreaterThan(0);
      });

      await test.step("Verify the table contains one or more columns", async () => {
        expect(await table.employeeTable.columnCount()).toBeGreaterThan(0);
      });
    }
  );

  test.skip(
    "Verify row contains expected employee",
    {
      tag: ["@ui", "@component", "@table", "@regression", "@P1"],
    },
    async ({ page }) => {
      const table = new TableShowcasePage(page);

      await test.step("Open Table Showcase page", async () => {
        await table.open();
      });

      await test.step("Verify the table contains employee 'Cierra'", async () => {
        expect(await table.employeeTable.containsRow("Cierra")).toBeTruthy();
      });
    }
  );
});
