import { expect, Locator, Page } from "@playwright/test";

export class UiAssertions {
  constructor(private readonly page: Page) {}

  // ============================================================================
  // Element Assertions
  // ============================================================================

  /**
   * Verify element is visible.
   */
  async visible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  /**
   * Verify element is hidden.
   */
  async hidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  /**
   * Verify element is enabled.
   */
  async enabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }

  /**
   * Verify element is disabled.
   */
  async disabled(locator: Locator) {
    await expect(locator).toBeDisabled();
  }

  /**
   * Verify element is editable.
   */
  async editable(locator: Locator) {
    await expect(locator).toBeEditable();
  }

  /**
   * Verify element is focused.
   */
  async focused(locator: Locator) {
    await expect(locator).toBeFocused();
  }

  /**
   * Verify element is empty.
   */
  async empty(locator: Locator) {
    await expect(locator).toBeEmpty();
  }

  // ============================================================================
  // Checkbox Assertions
  // ============================================================================

  /**
   * Verify checkbox is checked.
   */
  async checked(locator: Locator) {
    await expect(locator).toBeChecked();
  }

  /**
   * Verify checkbox is unchecked.
   */
  async unchecked(locator: Locator) {
    await expect(locator).not.toBeChecked();
  }

  // ============================================================================
  // Text Assertions
  // ============================================================================

  /**
   * Verify exact text.
   */
  async text(locator: Locator, expected: string | RegExp) {
    await expect(locator).toHaveText(expected);
  }

  /**
   * Verify text contains expected value.
   */
  async containsText(locator: Locator, expected: string | RegExp) {
    await expect(locator).toContainText(expected);
  }

  /**
   * Verify text does not contain expected value.
   */
  async notContainsText(locator: Locator, expected: string | RegExp) {
    await expect(locator).not.toContainText(expected);
  }

  // ============================================================================
  // Value Assertions
  // ============================================================================

  /**
   * Verify input value.
   */
  async value(locator: Locator, expected: string | RegExp) {
    await expect(locator).toHaveValue(expected);
  }

  /**
   * Alias for exact value verification.
   */
  async exactValue(locator: Locator, expected: string | RegExp) {
    await expect(locator).toHaveValue(expected);
  }

  // ============================================================================
  // Attribute Assertions
  // ============================================================================

  /**
   * Verify element has exact attribute value.
   */
  async attribute(locator: Locator, attribute: string, value: string | RegExp) {
    await expect(locator).toHaveAttribute(attribute, value);
  }

  /**
   * Verify element contains the specified CSS class.
   */
  async classContains(locator: Locator, className: string) {
    await expect(locator).toHaveClass(new RegExp(`\\b${className}\\b`));
  }

  /**
   * Verify CSS property.
   */
  async cssProperty(locator: Locator, property: string, value: string) {
    await expect(locator).toHaveCSS(property, value);
  }

  /**
   * Verify JavaScript property.
   */
  async jsProperty(locator: Locator, property: string, value: unknown) {
    await expect(locator).toHaveJSProperty(property, value);
  }

  // ============================================================================
  // Collection Assertions
  // ============================================================================

  /**
   * Verify locator count.
   */
  async count(locator: Locator, expected: number) {
    await expect(locator).toHaveCount(expected);
  }

  // ============================================================================
  // Page Assertions
  // ============================================================================

  /**
   * Verify current page URL.
   */
  async url(expected: string | RegExp) {
    await expect(this.page).toHaveURL(expected);
  }

  /**
   * Verify current page title.
   */
  async title(expected: string | RegExp) {
    await expect(this.page).toHaveTitle(expected);
  }

  async urlContains(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }
}
