import { ComponentBase } from "@core/helpers/components/ComponentBase";
import { Locator, Page } from "@playwright/test";

export class CalendarComponent extends ComponentBase {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Enter a date into the calendar.
   */
  async enter(date: string) {
    await this.enterText(date);
  }

  /**
   * Type a date into the calendar.
   */
  async type(date: string) {
    await this.typeText(date);
  }

  /**
   * Clear the selected date.
   */
  async clear() {
    await super.clear();
  }

  /**
   * Open the calendar picker.
   */
  async open() {
    await this.click();
  }

  /**
   * Get the selected date.
   */
  async getValue(): Promise<string> {
    return (await this.getAttribute("value")) ?? "";
  }

  /**
   * Get the placeholder text.
   */
  async getPlaceholder(): Promise<string> {
    return (await this.getAttribute("placeholder")) ?? "";
  }

  /**
   * Returns true if the calendar is read-only.
   */
  async isReadOnly(): Promise<boolean> {
    return (await this.getAttribute("readonly")) !== null;
  }

  /**
   * Returns true if the calendar is required.
   */
  async isRequired(): Promise<boolean> {
    return (await this.getAttribute("required")) !== null;
  }

  /**
   * Verify the selected date.
   */
  async verifyValue(expected: string | RegExp) {
    await this.assertions.value(this.locator, expected);
  }

  /**
   * Verify the placeholder.
   */
  async verifyPlaceholder(expected: string | RegExp) {
    await this.assertions.attribute(this.locator, "placeholder", expected);
  }

  /**
   * Verify the calendar is editable.
   */
  async verifyEditable() {
    await this.assertions.editable(this.locator);
  }

  /**
   * Verify the calendar is empty.
   */
  async verifyEmpty() {
    await this.assertions.empty(this.locator);
  }

  /**
   * Verify the calendar is visible.
   */
  async verifyVisible() {
    await this.assertions.visible(this.locator);
  }

  /**
   * Verify the calendar is enabled.
   */
  async verifyEnabled() {
    await this.assertions.enabled(this.locator);
  }

  /**
   * Verify the calendar is disabled.
   */
  async verifyDisabled() {
    await this.assertions.disabled(this.locator);
  }

  /**
   * Verify the calendar is read-only.
   */
  async verifyReadOnly() {
    if (!(await this.isReadOnly())) {
      throw new Error("Expected calendar to be read-only.");
    }
  }

  /**
   * Verify the calendar is required.
   */
  async verifyRequired() {
    if (!(await this.isRequired())) {
      throw new Error("Expected calendar to be required.");
    }
  }
}
