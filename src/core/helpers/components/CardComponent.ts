import { Locator, Page } from "@playwright/test";

import { ComponentBase } from "./ComponentBase";

export class CardComponent extends ComponentBase {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Returns a child locator inside the card.
   */
  public find(selector: string): Locator {
    return this.locator.locator(selector);
  }

  /**
   * Hover over the card.
   */
  public async hover() {
    await super.hover();
  }

  /**
   * Click the card.
   */
  public async click() {
    await super.click();
  }

  /**
   * Returns all text from the card.
   */
  public async getText(): Promise<string> {
    return await super.getText();
  }

  /**
   * Verify the card is visible.
   */
  public async verifyVisible() {
    await this.assertions.visible(this.locator);
  }

  /**
   * Verify the card is hidden.
   */
  public async verifyHidden() {
    await this.assertions.hidden(this.locator);
  }

  /**
   * Verify the card is enabled.
   */
  public async verifyEnabled() {
    await this.assertions.enabled(this.locator);
  }

  /**
   * Verify the card is disabled.
   */
  public async verifyDisabled() {
    await this.assertions.disabled(this.locator);
  }

  /**
   * Verify the card contains the expected text.
   */
  public async verifyContains(expected: string | RegExp) {
    await this.assertions.containsText(this.locator, expected);
  }

  /**
   * Verify the card text.
   */
  public async verifyText(expected: string | RegExp) {
    await this.assertions.text(this.locator, expected);
  }

  /**
   * Verify the card is empty.
   */
  public async verifyEmpty() {
    await this.assertions.empty(this.locator);
  }
}
