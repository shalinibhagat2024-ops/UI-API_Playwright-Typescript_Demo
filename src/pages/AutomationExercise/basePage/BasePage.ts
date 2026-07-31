import { UiAssertions } from "@core/assertions/UiAssertions";
import { ElementActions } from "@core/helpers/actions/ElementActions";
import { WaitHelper } from "@core/helpers/WaitHelper";
import { Logger } from "@core/logger/Logger";
import { UIManager } from "@core/managers/UIManager";
import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly ui: UIManager;
  protected readonly waits: WaitHelper;
  protected readonly assertions: UiAssertions;
  protected readonly actions: ElementActions;

  constructor(page: Page) {
    this.page = page;
    this.ui = new UIManager(page);
    this.waits = new WaitHelper(page);
    this.assertions = new UiAssertions(page);
    this.actions = new ElementActions(page);
  }

  // ==========================================================================
  // Navigation
  // ==========================================================================

  protected async navigate(baseUrl: string, path = "") {
    const url = `${baseUrl}${path}`;

    Logger.info(`Navigating to ${url}`);

    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
    });
  }

  protected async refresh() {
    Logger.info("Refreshing page.");
    await this.page.reload();
  }

  protected async reload() {
    Logger.info("Reloading page.");
    await this.page.reload();
  }

  protected async currentUrl(): Promise<string> {
    return this.page.url();
  }

  protected async title(): Promise<string> {
    return this.page.title();
  }

  protected async waitForPageLoad() {
    await this.page.waitForLoadState("load");
  }

  protected async waitForDomLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  // ==========================================================================
  // Mouse Actions
  // ==========================================================================

  protected async click(locator: Locator, options?: Parameters<Locator["click"]>[0]) {
    await this.actions.click(locator, options);
  }

  protected async doubleClick(locator: Locator) {
    await this.actions.doubleClick(locator);
  }

  protected async rightClick(locator: Locator) {
    await this.actions.rightClick(locator);
  }

  protected async hover(locator: Locator) {
    await this.actions.hover(locator);
  }

  // ==========================================================================
  // Text Actions
  // ==========================================================================

  protected async enterText(value: string, locator: Locator) {
    await this.actions.fill(locator, value);
  }

  protected async typeText(value: string, locator: Locator) {
    await this.actions.type(locator, value);
  }

  protected async clear(locator: Locator) {
    await this.actions.clear(locator);
  }

  // ==========================================================================
  // Checkbox
  // ==========================================================================

  protected async check(locator: Locator) {
    await this.actions.check(locator);
  }

  protected async uncheck(locator: Locator) {
    await this.actions.uncheck(locator);
  }

  // ==========================================================================
  // Keyboard
  // ==========================================================================

  protected async press(key: string, locator: Locator) {
    await this.actions.press(locator, key);
  }

  // ==========================================================================
  // Dropdown
  // ==========================================================================

  protected async selectByValue(value: string, locator: Locator) {
    await this.actions.selectByValue(locator, value);
  }

  protected async selectByLabel(label: string, locator: Locator) {
    await this.actions.selectByLabel(locator, label);
  }

  protected async selectByIndex(index: number, locator: Locator) {
    await this.actions.selectByIndex(locator, index);
  }
  protected async getSelectedValue(locator: Locator): Promise<string> {
    return this.actions.getSelectedValue(locator);
  }

  protected async getSelectedLabel(locator: Locator): Promise<string> {
    return this.actions.getSelectedLabel(locator);
  }

  protected async getOptions(locator: Locator): Promise<string[]> {
    return this.actions.getOptions(locator);
  }

  protected async isOptionSelected(label: string, locator: Locator): Promise<boolean> {
    return this.actions.isOptionSelected(locator, label);
  }
  // ==========================================================================
  // Getters
  // ==========================================================================

  protected async getText(locator: Locator): Promise<string> {
    return this.actions.getText(locator);
  }

  protected async getValue(locator: Locator): Promise<string> {
    return (await this.actions.getAttribute(locator, "value")) ?? "";
  }

  protected async getAttribute(attribute: string, locator: Locator): Promise<string | null> {
    return this.actions.getAttribute(locator, attribute);
  }

  protected async isVisible(locator: Locator): Promise<boolean> {
    return this.actions.isVisible(locator);
  }

  protected async isEnabled(locator: Locator): Promise<boolean> {
    return this.actions.isEnabled(locator);
  }

  // ==========================================================================
  // Wait Helpers
  // ==========================================================================

  protected async waitForVisible(locator: Locator) {
    await this.waits.visible(locator);
  }

  protected async waitForHidden(locator: Locator) {
    await this.waits.hidden(locator);
  }

  protected async waitForEnabled(locator: Locator) {
    await this.waits.enabled(locator);
  }
}
