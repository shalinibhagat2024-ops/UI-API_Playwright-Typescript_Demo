import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { Page } from "@playwright/test";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class PaginationShowcasePage extends BasePage {
  readonly pagination = this.ui.pagination(this.page.locator(".-pagination"));

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigate(ApplicationRoutes.demoqa.baseUrl, ApplicationRoutes.demoqa.webTables);
  }
}
