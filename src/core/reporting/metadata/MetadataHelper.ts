import * as allure from "allure-js-commons";

export class MetadataHelper {
  public static async epic(name: string) {
    await allure.epic(name);
  }

  public static async feature(name: string) {
    await allure.feature(name);
  }

  public static async story(name: string) {
    await allure.story(name);
  }

  public static async owner(name: string) {
    await allure.owner(name);
  }

  public static async severity(level: "blocker" | "critical" | "normal" | "minor" | "trivial") {
    await allure.severity(level);
  }

  public static async tag(...tags: string[]) {
    for (const tag of tags) {
      await allure.tag(tag);
    }
  }
}
