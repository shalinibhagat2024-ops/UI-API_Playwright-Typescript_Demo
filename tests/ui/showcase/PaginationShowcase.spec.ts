import { expect, test } from "@playwright/test";

import { PaginationShowcasePage } from "../../../src/pages/showcase/PaginationShowcasePage";

test.describe("Pagination Component Showcase", () => {
  test(
    "Verify user can navigate to next page",
    {
      tag: ["@ui", "@component", "@pagination", "@regression", "@P1"],
    },
    async ({ page }) => {
      const pagination = new PaginationShowcasePage(page);

      await pagination.open();
      await pagination.pagination.next();

      expect(await pagination.pagination.hasPage(1)).toBeTruthy();
    }
  );
});
