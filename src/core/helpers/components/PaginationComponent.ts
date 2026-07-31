import { ComponentBase } from "@core/helpers/components/ComponentBase";
import { Locator, Page } from "@playwright/test";

export class PaginationComponent extends ComponentBase {
  private readonly btnPrevious: Locator;
  private readonly btnNext: Locator;

  constructor(page: Page, locator: Locator) {
    super(page, locator);

    this.btnPrevious = locator.getByRole("button", {
      name: /previous/i,
    });

    this.btnNext = locator.getByRole("button", {
      name: /next/i,
    });
  }

  // ==========================================================================
  // Waits
  // ==========================================================================

  async waitUntilVisible() {
    await this.waitForVisible();
  }

  async waitUntilHidden() {
    await this.waitForHidden();
  }

  // ==========================================================================
  // Verifications
  // ==========================================================================

  async verifyVisible() {
    await this.assertions.visible(this.locator);
  }

  async verifyHidden() {
    await this.assertions.hidden(this.locator);
  }

  // ==========================================================================
  // Navigation
  // ==========================================================================

  async next() {
    await this.waitForVisible(this.btnNext);
    await this.click(this.btnNext);
  }

  async previous() {
    await this.waitForVisible(this.btnPrevious);
    await this.click(this.btnPrevious);
  }

  async goToPage(pageNumber: number) {
    const pageButton = this.getPageButton(pageNumber);

    await this.waitForVisible(pageButton);
    await this.click(pageButton);
  }

  // ==========================================================================
  // Information
  // ==========================================================================

  async hasPage(pageNumber: number): Promise<boolean> {
    return this.isVisible(this.getPageButton(pageNumber));
  }

  async pageCount(): Promise<number> {
    return await this.locator
      .getByRole("button")
      .filter({
        hasText: /^\d+$/,
      })
      .count();
  }

  async verifyCurrentPage(pageNumber: number) {
    const pageButton = this.getPageButton(pageNumber);

    await this.assertions.attribute(pageButton, "aria-current", "page");
  }

  // ==========================================================================
  // Private Helpers
  // ==========================================================================

  private getPageButton(pageNumber: number): Locator {
    return this.locator.getByRole("button", {
      name: pageNumber.toString(),
    });
  }
}
