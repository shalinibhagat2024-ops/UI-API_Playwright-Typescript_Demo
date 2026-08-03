import { ApplicationRoutes } from "@core/config/ApplicationRoutes";
import { DatePickerComponent } from "@core/helpers/components/DatePickerComponent";
import { Page } from "@playwright/test";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class CalendarShowcasePage extends BasePage {
  readonly datePicker: DatePickerComponent;

  constructor(page: Page) {
    super(page);

    this.datePicker = new DatePickerComponent(page, page.locator("#datePickerMonthYearInput"));
  }

  async open() {
    await this.navigate(ApplicationRoutes.demoqa.baseUrl, ApplicationRoutes.demoqa.datePicker);
  }

  async selectBirthDate() {
    await this.datePicker.selectDate("2026", "June", "25");
  }

  async verifySelectedDate() {
    await this.datePicker.verifyValue("06/25/2026");
  }
}
