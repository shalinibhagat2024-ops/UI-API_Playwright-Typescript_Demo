import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class CalendarComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Enter date into calendar input.
   */
  async enter(date: string): Promise<void> {
    await this.actions.fill(this.locator, date);
  }

  /**
   * Type date into calendar input.
   */
  async type(date: string): Promise<void> {
    await this.actions.type(this.locator, date);
  }

  /**
   * Clear selected date.
   */
  async clear(): Promise<void> {
    await this.actions.clear(this.locator);
  }

  /**
   * Open calendar.
   */
  async open(): Promise<void> {
    await this.click();
  }

  /**
   * Get selected date.
   */
  async value(): Promise<string> {
    return await this.getValue();
  }

  /**
   * Verify selected date.
   */
  async verifyValue(expected: string | RegExp): Promise<void> {
    await this.assertions.value(this.locator, expected);
  }

  /**
   * Verify calendar is editable.
   */
  async verifyEditable(): Promise<void> {
    await this.assertions.editable(this.locator);
  }

  /**
   * Verify calendar is empty.
   */
  async verifyEmpty(): Promise<void> {
    await this.assertions.empty(this.locator);
  }

  /**
   * Verify placeholder text.
   */
  async verifyPlaceholder(expected: string | RegExp): Promise<void> {
    await this.assertions.attribute(this.locator, "placeholder", expected);
  }

  /**
   * Get placeholder text.
   */
  async placeholder(): Promise<string | null> {
    return await this.actions.getAttribute(this.locator, "placeholder");
  }

  /**
   * Check if calendar is readonly.
   */
  async isReadOnly(): Promise<boolean> {
    return (await this.actions.getAttribute(this.locator, "readonly")) !== null;
  }

  /**
   * Check if calendar is required.
   */
  async isRequired(): Promise<boolean> {
    return (await this.actions.getAttribute(this.locator, "required")) !== null;
  }
}
