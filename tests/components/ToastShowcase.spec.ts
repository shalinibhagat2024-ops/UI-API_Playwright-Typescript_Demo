import { test } from "@playwright/test";

import { ToastShowcasePage } from "../../src/pages/showcase/ToastShowcasePage";

test.describe("Toast Component", () => {
  test.fixme(
    "Verify toast message",
    {
      tag: ["@ui", "@component", "@toast", "@regression", "@P1"],
    },
    async ({ page }) => {
      const toast = new ToastShowcasePage(page);

      await test.step("Open Toast Showcase page", async () => {
        await toast.open();
      });

      await test.step("Trigger the success toast notification", async () => {
        await toast.triggerToast();
      });

      await test.step("Verify the success toast notification is displayed", async () => {
        await toast.toast.waitForToast();
        await toast.toast.verifyContains("success");
      });
    }
  );
});
