import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { Page } from "@playwright/test";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class FileUploadShowcasePage extends BasePage {
  readonly uploadInput = this.ui.upload(this.page.locator("#uploadFile"));
  readonly uploadedFile = this.page.locator("#uploadedFilePath");

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigate(ApplicationRoutes.demoqa.baseUrl, ApplicationRoutes.demoqa.uploadDownload);
  }

  async uploadSampleFile(filePath: string) {
    await this.uploadInput.upload(filePath);
  }

  async verifyUploadedFile(expected: string) {
    await this.assertions.containsText(this.uploadedFile, expected);
  }
}
