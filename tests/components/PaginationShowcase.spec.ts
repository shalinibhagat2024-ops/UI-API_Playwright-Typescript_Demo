import { expect, test } from "@playwright/test";

import { PaginationShowcasePage } from "../../src/pages/Components/PaginationShowcasePage";

test.describe("Pagination Component Showcase", () => {
  test.skip(
    "Verify user can navigate to next page",
    {
      tag: ["@ui", "@component", "@pagination", "@regression", "@P1"],
    },
    async ({ page }) => {
      const pagination = new PaginationShowcasePage(page);

      await test.step("Open Pagination Showcase page", async () => {
        await pagination.open();
      });

      await test.step("Navigate to the next page", async () => {
        await pagination.pagination.next();
      });

      await test.step("Verify the next page is displayed", async () => {
        expect(await pagination.pagination.hasPage(1)).toBeTruthy();
      });
    }
  );
});
