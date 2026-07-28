import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class GridComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Returns the total number of rows.
   *
   * @param rowLocator Relative locator for grid rows.
   */
  async rowCount(rowLocator = "tr"): Promise<number> {
    return await this.locator.locator(rowLocator).count();
  }

  /**
   * Returns the total number of columns in the first row.
   *
   * @param cellLocator Relative locator for cells.
   */
  async columnCount(cellLocator = "td"): Promise<number> {
    const firstRow = this.locator.locator("tr").first();
    return await firstRow.locator(cellLocator).count();
  }

  /**
   * Checks whether a row containing the specified text exists.
   *
   * @param text Text to search.
   * @param rowLocator Relative locator for rows.
   */
  async containsRow(text: string, rowLocator = "tr"): Promise<boolean> {
    return (await this.locator.locator(rowLocator).filter({ hasText: text }).count()) > 0;
  }

  /**
   * Returns a row locator by index.
   */
  row(index: number): Locator {
    return this.locator.locator("tr").nth(index);
  }

  /**
   * Returns a cell locator.
   */
  cell(rowIndex: number, columnIndex: number): Locator {
    return this.row(rowIndex).locator("td").nth(columnIndex);
  }
}
