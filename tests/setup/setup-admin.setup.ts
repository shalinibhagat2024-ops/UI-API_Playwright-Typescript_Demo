import { expect, test as setup } from "@playwright/test";
import { LoginPage } from "src/pages/AutomationExercise/authorization/LoginPage";

setup("Authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Open Login Page
  await loginPage.open();

  // Login as Admin
  await loginPage.loginAsAdmin();

  // Verify login succeeded
  await expect(page).toHaveURL(/.*\/$/);

  // Save authenticated session
  await page.context().storageState({
    path: "playwright/.auth/AdminUser.json",
  });
});
