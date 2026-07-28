import { SpinnerComponent } from "@core/helpers/components/SpinnerComponent";
import { BasePage } from "src/pages/AutomationExercise/basePage/BasePage";

export class SpinnerShowcasePage extends BasePage {
  readonly startButton = this.page.getByRole("button", {
    name: "Start",
  });

  readonly spinner = new SpinnerComponent(this.page, this.page.locator("#loading"));

  readonly finishMessage = this.page.locator("#finish");

  /**
   * Click Start button.
   */
  async clickStart(): Promise<void> {
    await this.startButton.click();
  }

  /**
   * Wait for loading to complete.
   */
  async waitForLoading(): Promise<void> {
    await this.spinner.waitUntilVisible();
    await this.spinner.waitUntilHidden();
  }

  /**
   * Verify loading completed.
   */
  async verifyLoaded(): Promise<void> {
    await this.finishMessage.waitFor({
      state: "visible",
    });
  }
}
