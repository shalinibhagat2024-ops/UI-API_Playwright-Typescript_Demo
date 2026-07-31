import { ComponentBase } from "@core/helpers/components/ComponentBase";
import { Locator, Page } from "@playwright/test";

export class ModalComponent extends ComponentBase {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Wait until the modal is visible.
   */
  async waitUntilVisible() {
    await this.waits.visible(this.locator);
  }

  /**
   * Wait until the modal is hidden.
   */
  async waitUntilHidden() {
    await this.waits.hidden(this.locator);
  }

  /**
   * Close the modal using the Escape key.
   */
  async close() {
    await this.page.keyboard.press("Escape");
  }

  /**
   * Close the modal using the specified close button.
   */
  async closeBy(closeButton: Locator) {
    await this.click(closeButton);
  }

  /**
   * Verify the modal is visible.
   */
  async verifyVisible() {
    await this.assertions.visible(this.locator);
  }

  /**
   * Verify the modal is hidden.
   */
  async verifyHidden() {
    await this.assertions.hidden(this.locator);
  }

  /**
   * Returns whether the modal is currently visible.
   */
  async isOpen(): Promise<boolean> {
    return this.isVisible();
  }
}
