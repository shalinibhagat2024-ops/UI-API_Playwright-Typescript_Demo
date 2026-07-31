import * as allure from "allure-js-commons";
import fs from "fs";

export class AttachmentHelper {
  public static async attachFile(title: string, filePath: string, contentType: string) {
    if (!filePath || !fs.existsSync(filePath)) {
      return;
    }

    await allure.attachmentPath(title, filePath, {
      contentType,
    });
  }

  public static async attachText(title: string, content: string) {
    await allure.attachment(title, content, "text/plain");
  }

  public static async attachJson(title: string, object: unknown) {
    await allure.attachment(title, JSON.stringify(object, null, 2), "application/json");
  }
}
