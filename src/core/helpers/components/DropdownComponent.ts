import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class DropdownComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Select native option by visible label.
   */
  async selectByLabel(label: string): Promise<void> {
    await this.waits.visible(this.locator);
    await this.locator.selectOption({ label });
  }

  /**
   * Select native option by value.
   */
  async selectByValue(value: string): Promise<void> {
    await this.actions.selectByValue(this.locator, value);
  }

  /**
   * Select native option by index.
   */
  async selectByIndex(index: number): Promise<void> {
    await this.waits.visible(this.locator);
    await this.locator.selectOption({ index });
  }

  /**
   * Select option from a custom dropdown.
   */
  async selectCustom(text: string | RegExp): Promise<void> {
    await this.waits.visible(this.locator);

    await this.click();

    await this.page
      .getByText(text, {
        exact: typeof text === "string",
      })
      .click();
  }

  /**
   * Returns the selected option text.
   * Supports both native <select> and custom dropdowns.
   */
  async selectedText(): Promise<string> {
    return await this.locator.evaluate((element) => {
      if (element instanceof HTMLSelectElement) {
        return element.options[element.selectedIndex]?.text.trim() ?? "";
      }

      return element.textContent?.trim() ?? "";
    });
  }

  /**
   * Verify selected option text.
   */
  async verifySelectedText(expected: string | RegExp): Promise<void> {
    const actual = await this.selectedText();

    if (expected instanceof RegExp) {
      if (!expected.test(actual)) {
        throw new Error(`Expected selected text to match ${expected}, but found "${actual}".`);
      }
    } else if (actual !== expected) {
      throw new Error(`Expected selected text to be "${expected}", but found "${actual}".`);
    }
  }

  /**
   * Returns all available options.
   * Works only for native HTML <select>.
   */
  async options(): Promise<string[]> {
    return await this.locator.evaluate((element) => {
      if (!(element instanceof HTMLSelectElement)) {
        return [];
      }

      return Array.from(element.options).map((option) => option.text.trim());
    });
  }

  /**
   * Returns total number of options.
   * Works only for native HTML <select>.
   */
  async count(): Promise<number> {
    return (await this.options()).length;
  }
}
