import { ApplicationRoutes } from "src/core/config/ApplicationRoutes";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class InputControlsShowcasePage extends BasePage {
  readonly txtFullName = this.page.getByPlaceholder("Full Name");

  readonly txtEmail = this.page.getByPlaceholder("name@example.com");

  readonly btnSubmit = this.page.getByRole("button", {
    name: "Submit",
  });

  async open() {
    await this.navigate(ApplicationRoutes.demoqa.baseUrl, ApplicationRoutes.demoqa.textBox);
  }

  async submitInputForm() {
    await this.enterText("John Doe", this.txtFullName);
    await this.enterText("john.doe@example.com", this.txtEmail);
    await this.click(this.btnSubmit);
  }
}
