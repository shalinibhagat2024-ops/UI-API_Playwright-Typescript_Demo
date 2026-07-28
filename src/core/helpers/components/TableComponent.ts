import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class TableComponent extends BaseComponent {
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
   * Returns all table columns.
   */
  columns(): Locator {
    return this.locator.locator("thead th");
  }

  /**
   * Returns total row count.
   */
  async rowCount(): Promise<number> {
    return await this.rows().count();
  }

  /**
   * Returns total column count.
   */
  async columnCount(): Promise<number> {
    return await this.columns().count();
  }

  /**
   * Returns all table headers.
   */
  async headers(): Promise<string[]> {
    return (await this.columns().allInnerTexts()).map((h) => h.trim());
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
    return (await this.cell(row, column).innerText()).trim();
  }

  /**
   * Returns all cell values from a row.
   */
  async rowText(row: number): Promise<string[]> {
    return (await this.row(row).allInnerTexts()).map((text) => text.trim());
  }

  /**
   * Click a specific row.
   */
  async clickRow(index: number): Promise<void> {
    await this.actions.click(this.row(index));
  }

  /**
   * Click a specific cell.
   */
  async clickCell(row: number, column: number): Promise<void> {
    await this.actions.click(this.cell(row, column));
  }

  /**
   * Returns true if a row contains text.
   */
  async containsRow(text: string): Promise<boolean> {
    return (await this.rows().filter({ hasText: text }).count()) > 0;
  }

  /**
   * Returns locator for matching row.
   */
  rowContaining(text: string): Locator {
    return this.rows().filter({
      hasText: text,
    });
  }

  /**
   * Verify text exists in the table.
   */
  async verifyContainsText(text: string): Promise<void> {
    await this.assertions.containsText(this.locator, text);
  }

  /**
   * Verify no records are displayed.
   */
  async verifyNoRecords(message = "No Records Found"): Promise<void> {
    await this.assertions.containsText(this.locator, message);
  }
}
