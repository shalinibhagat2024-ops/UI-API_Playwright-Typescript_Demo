import { test } from "@playwright/test";

import { ModalShowcasePage } from "../../src/pages/showcase/ModalShowcasePage";

test.describe("Modal Component", () => {
  test.skip(
    "Verify user can open and close modal",
    {
      tag: ["@ui", "@component", "@modal", "@regression", "@P1"],
    },
    async ({ page }) => {
      const modal = new ModalShowcasePage(page);

      await test.step("Open Modal Showcase page", async () => {
        await modal.open();
      });

      await test.step("Open the small modal", async () => {
        await modal.openSmallModal();
      });

      await test.step("Verify the modal is displayed", async () => {
        await modal.modal.verifyVisible();
      });

      await test.step("Close the modal", async () => {
        await modal.closeModal();
      });

      await test.step("Verify the modal is closed", async () => {
        await modal.modal.verifyHidden();
      });
    }
  );
});
