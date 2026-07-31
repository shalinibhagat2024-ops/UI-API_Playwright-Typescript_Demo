import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { Page } from "@playwright/test";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class TableShowcasePage extends BasePage {
  readonly employeeTable = this.ui.table(this.page.locator(".rt-table"));

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigate(ApplicationRoutes.demoqa.baseUrl, ApplicationRoutes.demoqa.webTables);
  }
}
