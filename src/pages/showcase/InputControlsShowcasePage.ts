import { ApplicationRoutes } from "src/core/config/ApplicationRoutes";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class InputControlsShowcasePage extends BasePage {
  readonly fullName = this.ui.textbox(this.page.getByPlaceholder("Full Name"));
  readonly email = this.ui.textbox(this.page.getByPlaceholder("name@example.com"));
  readonly submit = this.ui.button(
    this.page.getByRole("button", {
      name: "Submit",
    })
  );

  async open(): Promise<void> {
    await this.navigate(ApplicationRoutes.demoqa.baseUrl, ApplicationRoutes.demoqa.textBox);
  }

  async submitInputForm(): Promise<void> {
    await this.fullName.fill("John Doe");
    await this.email.fill("john.doe@example.com");
    await this.submit.click();
  }
}
