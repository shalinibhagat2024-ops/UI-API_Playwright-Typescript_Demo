import { expect, test } from "@fixtures/page.fixture";
import { LoginFactory } from "src/testdata/factories/LoginFactory";

const loginUsers = LoginFactory.getAll();

test.describe("Login - Data Driven", () => {
  for (const user of loginUsers) {
    test.skip(
      user.testCase,
      {
        tag: ["@ui", "@auth", "@login", "@datadriven", "@regression"],
      },
      async ({ pages, page }) => {
        await test.step("Open Home Page", async () => {
          await pages.automationExercise.home.open();
        });

        await test.step("Open Login Page", async () => {
          await pages.automationExercise.auth.login.open();
        });

        await test.step(`Login using '${user.email || "Empty Email"}'`, async () => {
          await pages.automationExercise.auth.login.login(user.email, user.password);
        });

        await test.step("Verify login result", async () => {
          switch (user.expectedResult) {
            case "success":
              await expect(page).toHaveURL(/\/$/);
              await pages.automationExercise.home.verifyUserLoggedIn();
              break;

            case "failure":
              await pages.automationExercise.auth.login.verifyLoginError();
              break;

            case "validation":
              await pages.automationExercise.auth.login.verifyValidationMessage();
              break;
          }
        });
      }
    );
  }
});
