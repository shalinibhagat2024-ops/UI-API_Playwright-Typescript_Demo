import { ComponentBase } from "@core/helpers/components/ComponentBase";
import { Locator, Page } from "@playwright/test";

export class GridComponent extends ComponentBase {
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
  async containsRow(text: string): Promise<boolean> {
    return (await this.rowContaining(text).count()) > 0;
  }

  rowContaining(text: string): Locator {
    return this.locator.locator("tr").filter({
      hasText: text,
    });
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

  async clickRow(index: number) {
    await this.click(this.row(index));
  }

  async clickCell(row: number, column: number) {
    await this.click(this.cell(row, column));
  }
}
