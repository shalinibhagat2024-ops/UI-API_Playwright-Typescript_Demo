import { BusinessComponentBase } from "@core/helpers/components/automationexercise/BusinessComponentBase";
import { Logger } from "@core/logger/Logger";
import { Page } from "@playwright/test";

export class BrandComponent extends BusinessComponentBase {
  constructor(page: Page) {
    super(page);
  }

  public async select(brand: string) {
    Logger.info(`Brand : ${brand}`);

    await this.click(
      this.page.locator(".brands-name").getByRole("link", {
        name: new RegExp(brand),
      })
    );
  }
}
