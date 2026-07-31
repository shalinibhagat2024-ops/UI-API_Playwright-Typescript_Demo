import { attachment, ContentType } from "allure-js-commons";

export class AllureReporter {
  static async attachJson(name: string, data: unknown) {
    await attachment(name, JSON.stringify(data, null, 4), ContentType.JSON);
  }

  static async attachText(name: string, text: string) {
    await attachment(name, text, ContentType.TEXT);
  }
}
