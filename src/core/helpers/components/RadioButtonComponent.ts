import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class RadioButtonComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Check the radio button.
   */
  async check(): Promise<void> {
    await this.select();
  }

  /**
   * Select the radio button.
   */
  async select(): Promise<void> {
    await this.click();
  }

  /**
   * Select the radio button only if it is not already selected.
   */
  async set(): Promise<void> {
    if (!(await this.isSelected())) {
      await this.select();
    }
  }

  /**
   * Returns whether the radio button is selected.
   */
  async isSelected(): Promise<boolean> {
    return await this.locator.isChecked();
  }

  /**
   * Verify the radio button is selected.
   */
  async verifySelected(): Promise<void> {
    await this.assertions.checked(this.locator);
  }

  /**
   * Verify the radio button is not selected.
   */
  async verifyNotSelected(): Promise<void> {
    await this.assertions.unchecked(this.locator);
  }

  /**
   * @deprecated Radio buttons cannot be toggled.
   * Use select() or set() instead.
   */
  async toggle(): Promise<void> {
    await this.select();
  }
}
