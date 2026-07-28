import { WaitHelper } from "@core/helpers/WaitHelper";
import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";

export class ElementActions {
  private readonly waits: WaitHelper;

  constructor(private readonly page: Page) {
    this.waits = new WaitHelper(page);
  }

  /**
   * Click element
   */
  async click(locator: Locator, options?: Parameters<Locator["click"]>[0]): Promise<void> {
    await this.waits.visible(locator);
    await this.waits.enabled(locator);

    Logger.info("Clicking element.");

    await locator.click(options);
  }

  /**
   * Fill textbox
   */
  async fill(locator: Locator, value: string): Promise<void> {
    await this.waits.visible(locator);

    Logger.info(`Entering value : ${value}`);

    await locator.fill(value);
  }

  /**
   * Type text
   */
  async type(locator: Locator, value: string): Promise<void> {
    await this.waits.visible(locator);

    Logger.info(`Typing : ${value}`);

    await locator.type(value);
  }

  /**
   * Clear textbox
   */
  async clear(locator: Locator): Promise<void> {
    await this.waits.visible(locator);

    Logger.info("Clearing textbox");

    await locator.clear();
  }

  /**
   * Hover
   */
  async hover(locator: Locator): Promise<void> {
    await this.waits.visible(locator);

    Logger.info("Hover element");

    await locator.hover();
  }

  /**
   * Double click
   */
  async doubleClick(locator: Locator): Promise<void> {
    await this.waits.visible(locator);

    Logger.info("Double click");

    await locator.dblclick();
  }

  /**
   * Right click
   */
  async rightClick(locator: Locator): Promise<void> {
    await this.waits.visible(locator);

    Logger.info("Right click");

    await locator.click({
      button: "right",
    });
  }

  /**
   * Check checkbox
   */
  async check(locator: Locator): Promise<void> {
    await this.waits.visible(locator);

    Logger.info("Check checkbox");

    await locator.check();
  }

  /**
   * Uncheck checkbox
   */
  async uncheck(locator: Locator): Promise<void> {
    await this.waits.visible(locator);

    Logger.info("Uncheck checkbox");

    await locator.uncheck();
  }

  /**
   * Focus
   */
  async focus(locator: Locator): Promise<void> {
    await this.waits.visible(locator);

    await locator.focus();
  }

  /**
   * Scroll into view
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Select dropdown
   */
  async selectByValue(locator: Locator, value: string): Promise<void> {
    await this.waits.visible(locator);

    Logger.info(`Select : ${value}`);

    await locator.selectOption(value);
  }

  /**
   * Press keyboard key
   */
  async press(locator: Locator, key: string): Promise<void> {
    await this.waits.visible(locator);

    await locator.press(key);
  }

  /**
   * Get text
   */
  async getText(locator: Locator): Promise<string> {
    await this.waits.visible(locator);

    return (await locator.textContent())?.trim() ?? "";
  }

  /**
   * Get attribute
   */
  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return locator.getAttribute(attribute);
  }

  /**
   * Is Visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  /**
   * Is Enabled
   */
  async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }
}
