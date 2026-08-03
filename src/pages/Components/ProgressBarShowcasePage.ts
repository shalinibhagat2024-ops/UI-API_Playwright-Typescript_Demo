import { BasePage } from "src/pages/AutomationExercise/basePage/BasePage";

export class ProgressBarShowcasePage extends BasePage {
  readonly btnStart = this.page.getByRole("button", {
    name: "Start",
  });

  readonly btnReset = this.page.getByRole("button", {
    name: "Reset",
  });

  readonly progressBar = this.ui.progressBar(this.page.locator("#progressBar"));

  async start() {
    await this.click(this.btnStart);
  }

  async reset() {
    await this.click(this.btnReset);
  }

  async getProgress(): Promise<number> {
    const value = await this.progressBar.isCompleted();

    return Number(value);
  }
}
