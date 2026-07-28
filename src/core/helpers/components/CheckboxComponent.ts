import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class CheckboxComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Check checkbox.
   */
  async check(): Promise<void> {
    await this.actions.check(this.locator);
  }

  /**
   * Uncheck checkbox.
   */
  async uncheck(): Promise<void> {
    await this.actions.uncheck(this.locator);
  }

  /**
   * Toggle checkbox state.
   */
  async toggle(): Promise<void> {
    await this.click();
  }

  /**
   * Set checkbox state.
   *
   * @param checked true to check, false to uncheck.
   */
  async set(checked: boolean): Promise<void> {
    if (checked) {
      await this.check();
    } else {
      await this.uncheck();
    }
  }

  /**
   * Returns checked state.
   */
  async isChecked(): Promise<boolean> {
    return await this.locator.isChecked();
  }

  /**
   * Verify checkbox is checked.
   */
  async verifyChecked(): Promise<void> {
    await this.assertions.checked(this.locator);
  }

  /**
   * Verify checkbox is unchecked.
   */
  async verifyUnchecked(): Promise<void> {
    await this.assertions.unchecked(this.locator);
  }
}
