import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class PaginationComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Wait until pagination is visible.
   */
  async waitUntilVisible(): Promise<void> {
    await this.waits.visible(this.locator);
  }

  /**
   * Click the Next button.
   *
   * @param nextButton Locator for the Next button.
   */
  async next(nextButton: Locator): Promise<void> {
    await this.actions.click(nextButton);
  }

  /**
   * Click the Previous button.
   *
   * @param previousButton Locator for the Previous button.
   */
  async previous(previousButton: Locator): Promise<void> {
    await this.actions.click(previousButton);
  }

  /**
   * Navigate to a specific page.
   *
   * @param pageLocator Locator for the page number.
   */
  async goToPage(pageLocator: Locator): Promise<void> {
    await this.actions.click(pageLocator);
  }

  /**
   * Returns whether a page number is visible.
   *
   * @param pageLocator Locator for the page number.
   */
  async hasPage(pageLocator: Locator): Promise<boolean> {
    return await this.actions.isVisible(pageLocator);
  }
}
