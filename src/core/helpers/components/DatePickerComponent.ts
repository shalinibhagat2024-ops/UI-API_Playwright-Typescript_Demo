import { ComponentBase } from "@core/helpers/components/ComponentBase";
import { expect, Locator, Page } from "@playwright/test";

export class DatePickerComponent extends ComponentBase {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  async selectDate(year: string, month: string, day: string) {
    await this.locator.click();

    await this.page.locator(".react-datepicker__year-select").selectOption(year);

    await this.page.locator(".react-datepicker__month-select").selectOption(month);

    await this.page
      .locator(
        `.react-datepicker__day:not(.react-datepicker__day--outside-month):text-is("${day}")`
      )
      .click();
  }

  async verifyValue(expected: string) {
    await expect(this.locator).toHaveValue(expected);
  }
}
