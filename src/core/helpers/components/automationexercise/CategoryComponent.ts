import { BusinessComponentBase } from "@core/helpers/components/automationexercise/BusinessComponentBase";
import { Logger } from "@core/logger/Logger";
import { Page } from "@playwright/test";

export class CategoryComponent extends BusinessComponentBase {
  constructor(page: Page) {
    super(page);
  }

  public async select(parent: string, child: string) {
    Logger.info(`Category : ${parent} -> ${child}`);

    await this.click(this.page.locator(`a[href='#${parent}']`));

    await this.click(
      this.page.locator(`#${parent}`).getByRole("link", {
        name: child,
        exact: true,
      })
    );
  }
}
