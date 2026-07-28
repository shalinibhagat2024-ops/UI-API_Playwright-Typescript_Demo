import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class ModalComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Wait until the modal is visible.
   */
  async open(): Promise<void> {
    await this.waits.visible(this.locator);
  }

  /**
   * Close the modal using the Escape key.
   * Suitable for dialogs that support keyboard dismissal.
   */
  async close(): Promise<void> {
    await this.page.keyboard.press("Escape");
  }

  /**
   * Close the modal using a specific close button.
   *
   * @param closeButton Locator of the modal's close button.
   */
  async closeBy(closeButton: Locator): Promise<void> {
    await this.actions.click(closeButton);
  }

  /**
   * Verify the modal is visible.
   */
  async verifyVisible(): Promise<void> {
    await this.assertions.visible(this.locator);
  }

  /**
   * Verify the modal is hidden.
   */
  async verifyHidden(): Promise<void> {
    await this.assertions.hidden(this.locator);
  }
}
