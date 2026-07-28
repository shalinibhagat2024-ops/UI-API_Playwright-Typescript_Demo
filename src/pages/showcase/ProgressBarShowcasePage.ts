import { BasePage } from "src/pages/AutomationExercise/basePage/BasePage";

export class ProgressBarShowcasePage extends BasePage {
  readonly startButton = this.ui.button(
    this.page.getByRole("button", {
      name: "Start",
    })
  );

  readonly resetButton = this.ui.button(
    this.page.getByRole("button", {
      name: "Reset",
    })
  );

  readonly progressBar = this.ui.progressBar(this.page.locator("#progressBar"));

  async start(): Promise<void> {
    await this.startButton.click();
    console.log(await this.page.locator("#progressBar").getAttribute("aria-valuenow"));
  }

  async reset(): Promise<void> {
    await this.resetButton.click();
  }
}
