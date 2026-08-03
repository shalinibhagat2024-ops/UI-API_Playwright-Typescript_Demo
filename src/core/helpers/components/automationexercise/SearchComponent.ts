import { BusinessComponentBase } from "@core/helpers/components/automationexercise/BusinessComponentBase";
import { Logger } from "@core/logger/Logger";
import { Product } from "@model/products/Product";
import { Locator, Page } from "@playwright/test";

export class SearchComponent extends BusinessComponentBase {
  private readonly txtSearch: Locator;
  private readonly btnSearch: Locator;

  constructor(page: Page) {
    super(page);

    this.txtSearch = page.locator("#search_product");
    this.btnSearch = page.locator("#submit_search");
  }

  /**
   * Search product.
   */
  public async search(product: Product | string) {
    const productName = typeof product === "string" ? product : product.name;

    Logger.info(`Searching product : ${productName}`);

    await this.enterText(productName, this.txtSearch);

    await this.click(this.btnSearch);

    await this.waits.networkIdle();
  }

  /**
   * Clear search textbox.
   */
  public async clearSearch() {
    Logger.info("Clearing search textbox.");

    await this.clear(this.txtSearch);
  }

  /**
   * Verify search controls.
   */
  public async verifyLoaded(): Promise<this> {
    await this.assertions.visible(this.txtSearch);
    await this.assertions.visible(this.btnSearch);

    return this;
  }

  /**
   * Returns current search keyword.
   */
  public async getSearchKeyword(): Promise<string> {
    return this.getValue(this.txtSearch);
  }

  /**
   * Returns search textbox visibility.
   */
  public async isDisplayed(): Promise<boolean> {
    return this.isVisible(this.txtSearch);
  }
}
