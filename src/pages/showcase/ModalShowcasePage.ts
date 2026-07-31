import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { Page } from "@playwright/test";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class ModalShowcasePage extends BasePage {
  readonly btnSmallModal = this.page.getByRole("button", {
    name: "Small modal",
  });

  readonly btnClose = this.page.getByRole("button", {
    name: "Close",
  });

  readonly modal = this.ui.modal(this.page.locator(".modal-content"));

  constructor(page: Page) {
    super(page);
  }

  /**
   * Open the Modal Dialogs showcase page.
   */
  async open() {
    await this.navigate(ApplicationRoutes.demoqa.baseUrl, ApplicationRoutes.demoqa.modalDialogs);
  }

  /**
   * Open the Small Modal dialog.
   */
  async openSmallModal() {
    await this.btnSmallModal.click();
    await this.modal.waitUntilVisible();
  }

  /**
   * Close the Small Modal dialog.
   */
  async closeModal() {
    await this.modal.closeBy(this.btnClose);
    await this.modal.waitUntilHidden();
  }

  /**
   * Returns the modal title.
   */
  async getTitle(): Promise<string> {
    return ((await this.page.locator("#example-modal-sizes-title-sm").textContent()) ?? "").trim();
  }
}
