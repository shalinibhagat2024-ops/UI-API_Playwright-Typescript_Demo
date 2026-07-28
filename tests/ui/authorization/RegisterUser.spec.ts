import { test } from "@fixtures/page.fixture";
import { UserDataProvider } from "src/testdata/providers/UserDataProvider";

const users = UserDataProvider.validUsers();

test.describe("Register New User", () => {
  // Registration scenarios should execute sequentially
  test.describe.configure({
    mode: "serial",
  });

  for (const user of users) {
    test(
      `Register ${user.name}`,
      {
        tag: ["@ui", "@smoke", "@registerNewUser", "@p1"],
      },
      async ({ pages }) => {
        await test.step("Open application and navigate to Sign Up", async () => {
          await pages.automationExercise.home.open();
          await pages.automationExercise.home.openLogin();
        });

        await test.step("Register a new user account", async () => {
          await pages.automationExercise.auth.login.startSignup(user.name, user.email);

          await pages.automationExercise.auth.signupInformation.register(user);
        });

        await test.step("Verify account creation", async () => {
          await pages.automationExercise.auth.accountCreated.verifyNewAccountCreated();
          await pages.automationExercise.auth.accountCreated.continue();
        });

        await test.step("Verify user is logged in", async () => {
          await pages.automationExercise.common.header.verifyLoggedIn(user.name);
        });

        await test.step("Delete the user account", async () => {
          await pages.automationExercise.common.header.deleteAccount();
          await pages.automationExercise.auth.deleteAccount.verifyDeleted();
          await pages.automationExercise.auth.deleteAccount.continue();
        });
      }
    );
  }
});
