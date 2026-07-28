import { test } from "@playwright/test";

import { ModalShowcasePage } from "../../../src/pages/showcase/ModalShowcasePage";

test.describe("Modal Component", () => {
  test(
    "Verify user can open and close modal",
    {
      tag: ["@ui", "@component", "@modal", "@regression", "@P1"],
    },
    async ({ page }) => {
      const modal = new ModalShowcasePage(page);

      await modal.open();
      await modal.openSmallModal();

      await modal.modal.verifyVisible();

      await modal.closeModal();
      await modal.modal.verifyHidden();
    }
  );
});
