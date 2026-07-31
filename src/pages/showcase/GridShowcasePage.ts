import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { Page } from "@playwright/test";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class GridShowcasePage extends BasePage {
  readonly employeeGrid = this.ui.grid(this.page.locator(".-striped"));

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigate(ApplicationRoutes.agGrid.baseUrl, ApplicationRoutes.agGrid.grid);
  }
}
