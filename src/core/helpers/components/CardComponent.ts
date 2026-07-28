import { expect, Locator, Page } from "@playwright/test";

import { BaseComponent } from "./BaseComponent";

export class CardComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Returns child locator inside the card.
   */
  public find(selector: string): Locator {
    return this.locator.locator(selector);
  }

  /**
   * Hover over the card.
   */
  public async hover(): Promise<void> {
    await this.locator.hover();
  }

  /**
   * Click on the card.
   */
  public async click(): Promise<void> {
    await this.locator.click();
  }

  /**
   * Verify card is visible.
   */
  public async verifyVisible(): Promise<void> {
    await expect(this.locator).toBeVisible();
  }

  /**
   * Verify card contains text.
   */
  public async contains(text: string): Promise<void> {
    await expect(this.locator).toContainText(text);
  }

  /**
   * Returns all text from card.
   */
  public async text(): Promise<string> {
    return (await this.locator.textContent())?.trim() ?? "";
  }
}
