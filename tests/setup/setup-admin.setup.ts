import { expect, test as setup } from "@playwright/test";
import { EnvironmentManager } from "src/core/config/EnvironmentManager";

setup("Authenticate", async ({ page }) => {
  await page.goto(EnvironmentManager.getBaseUrl());

  await page.locator("a[href='/login']").click();
  await page.locator("[data-qa='login-email']").fill(EnvironmentManager.getAdminUsername());
  await page.locator("[data-qa='login-password']").fill(EnvironmentManager.getAdminPassword());
  await page.locator("[data-qa='login-button']").click();

  // Verify login succeeded
  await expect(page).toHaveURL(/.*\/$/);

  await page.context().storageState({
    path: "playwright/.auth/AdminUser.json",
  });
});
