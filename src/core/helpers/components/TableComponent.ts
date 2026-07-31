import { ComponentBase } from "@core/helpers/components/ComponentBase";
import { Locator, Page } from "@playwright/test";

export class TableComponent extends ComponentBase {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Returns all table rows.
   */
  rows(): Locator {
    return this.locator.locator("tbody tr");
  }

  /**
   * Returns all table headers.
   */
  columns(): Locator {
    return this.locator.locator("thead th");
  }

  /**
   * Returns total row count.
   */
  async rowCount(): Promise<number> {
    return this.rows().count();
  }

  /**
   * Returns total column count.
   */
  async columnCount(): Promise<number> {
    return this.columns().count();
  }

  /**
   * Returns all header names.
   */
  async headers(): Promise<string[]> {
    return (await this.columns().allInnerTexts()).map((header) => header.trim());
  }

  /**
   * Returns a specific row.
   */
  row(index: number): Locator {
    return this.rows().nth(index);
  }

  /**
   * Returns a specific cell.
   */
  cell(row: number, column: number): Locator {
    return this.row(row).locator("td").nth(column);
  }

  /**
   * Returns cell text.
   */
  async cellText(row: number, column: number): Promise<string> {
    return this.getText(this.cell(row, column));
  }

  /**
   * Returns all values from a row.
   */
  async rowText(row: number): Promise<string[]> {
    return (await this.row(row).locator("td").allInnerTexts()).map((text) => text.trim());
  }

  /**
   * Returns all values from a column.
   */
  async columnText(column: number): Promise<string[]> {
    const rows = this.rows();
    const values: string[] = [];

    for (let index = 0; index < (await rows.count()); index++) {
      values.push(await this.getText(this.cell(index, column)));
    }

    return values;
  }

  /**
   * Click a row.
   */
  async clickRow(index: number) {
    await this.click(this.row(index));
  }

  /**
   * Click a cell.
   */
  async clickCell(row: number, column: number) {
    await this.click(this.cell(row, column));
  }

  /**
   * Returns true if a row contains the specified text.
   */
  async containsRow(text: string): Promise<boolean> {
    return (await this.rowContaining(text).count()) > 0;
  }

  /**
   * Returns the matching row locator.
   */
  rowContaining(text: string): Locator {
    return this.rows().filter({
      hasText: text,
    });
  }

  /**
   * Click a row containing the specified text.
   */
  async clickRowContaining(text: string) {
    await this.click(this.rowContaining(text));
  }

  /**
   * Returns a cell by column header.
   */
  async cellByHeader(row: number, header: string): Promise<Locator> {
    const headers = await this.headers();
    const columnIndex = headers.indexOf(header);

    if (columnIndex === -1) {
      throw new Error(`Table header '${header}' was not found.`);
    }

    return this.cell(row, columnIndex);
  }

  /**
   * Returns text by column header.
   */
  async cellTextByHeader(row: number, header: string): Promise<string> {
    const cell = await this.cellByHeader(row, header);
    return this.getText(cell);
  }

  /**
   * Verify text exists in the table.
   */
  async verifyContainsText(text: string) {
    await this.assertions.containsText(this.locator, text);
  }

  /**
   * Verify no records message.
   */
  async verifyNoRecords(message = "No Records Found") {
    await this.assertions.containsText(this.locator, message);
  }

  /**
   * Verify row exists.
   */
  async verifyRowExists(text: string) {
    const exists = await this.containsRow(text);

    if (!exists) {
      throw new Error(`Row containing '${text}' was not found.`);
    }
  }

  /**
   * Verify row does not exist.
   */
  async verifyRowNotExists(text: string) {
    const exists = await this.containsRow(text);

    if (exists) {
      throw new Error(`Row containing '${text}' was found.`);
    }
  }
}
