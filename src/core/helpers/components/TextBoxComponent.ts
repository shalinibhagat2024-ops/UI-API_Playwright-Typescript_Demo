import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class TextBoxComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Enter text into the textbox.
   */
  async enter(text: string): Promise<void> {
    await this.fill(text);
  }

  /**
   * Fill the textbox.
   */
  async fill(text: string): Promise<void> {
    await this.actions.fill(this.locator, text);
  }

  /**
   * Type text character by character.
   */
  async type(text: string): Promise<void> {
    await this.actions.type(this.locator, text);
  }

  /**
   * Append text to the existing value.
   */
  async append(text: string): Promise<void> {
    await this.locator.pressSequentially(text);
  }

  /**
   * Clear the textbox.
   */
  async clear(): Promise<void> {
    await this.actions.clear(this.locator);
  }

  /**
   * Returns the current value.
   */
  async value(): Promise<string> {
    return await this.getValue();
  }

  /**
   * Verify textbox value.
   */
  async verifyValue(expected: string | RegExp): Promise<void> {
    await this.assertions.value(this.locator, expected);
  }

  /**
   * Verify placeholder text.
   */
  async verifyPlaceholder(expected: string | RegExp): Promise<void> {
    await this.assertions.attribute(this.locator, "placeholder", expected);
  }

  /**
   * Returns placeholder text.
   */
  async placeholder(): Promise<string | null> {
    return await this.actions.getAttribute(this.locator, "placeholder");
  }

  /**
   * Returns whether the textbox is readonly.
   */
  async isReadOnly(): Promise<boolean> {
    return (await this.actions.getAttribute(this.locator, "readonly")) !== null;
  }

  /**
   * Returns whether the textbox is required.
   */
  async isRequired(): Promise<boolean> {
    return (await this.actions.getAttribute(this.locator, "required")) !== null;
  }
}
