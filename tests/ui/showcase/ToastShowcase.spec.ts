import { test } from "@playwright/test";

import { ToastShowcasePage } from "../../../src/pages/showcase/ToastShowcasePage";

test.describe("Toast Component", () => {
  test(
    "Verify toast message",

    {
      tag: ["@ui", "@component", "@toast", "@regression", "@P1"],
    },

    async ({ page }) => {
      const toast = new ToastShowcasePage(page);
      await toast.open();
      await toast.triggerToast();
      await toast.toast.waitForToast();
      await toast.toast.verifyContains("success");
    }
  );
});
