import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { Page } from "@playwright/test";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class ToastShowcasePage extends BasePage {
  readonly btnTimerAlert = this.page.locator("#timerAlertButton");

  readonly alertText = this.page.locator(".alert");

  readonly toast = this.ui.toast(this.alertText);

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigate(ApplicationRoutes.demoqa.baseUrl, ApplicationRoutes.demoqa.alerts);
  }

  async triggerToast() {
    await this.click(this.btnTimerAlert);
  }
}
