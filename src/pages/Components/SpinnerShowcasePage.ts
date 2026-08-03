import { SpinnerComponent } from "@core/helpers/components/SpinnerComponent";
import { BasePage } from "src/pages/AutomationExercise/basePage/BasePage";

export class SpinnerShowcasePage extends BasePage {
  readonly btnStart = this.page.getByRole("button", {
    name: "Start",
  });

  readonly spinner = new SpinnerComponent(this.page, this.page.locator("#loading"));

  readonly finishMessage = this.page.locator("#finish");

  async clickStart() {
    await this.click(this.btnStart);
  }

  async waitForLoading() {
    await this.spinner.waitUntilVisible();
    await this.spinner.waitUntilHidden();
  }

  async verifyLoaded() {
    await this.assertions.visible(this.finishMessage);
  }
}
