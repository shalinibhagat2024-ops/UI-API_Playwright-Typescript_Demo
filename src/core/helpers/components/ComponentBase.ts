import { UiAssertions } from "@core/assertions/UiAssertions";
import { ElementActions } from "@core/helpers/actions/ElementActions";
import { WaitHelper } from "@core/helpers/WaitHelper";
import { Locator, Page } from "@playwright/test";

export abstract class ComponentBase {
  protected readonly actions: ElementActions;
  protected readonly waits: WaitHelper;
  protected readonly assertions: UiAssertions;

  constructor(
    protected readonly page: Page,
    protected readonly locator: Locator
  ) {
    this.actions = new ElementActions(page);
    this.waits = new WaitHelper(page);
    this.assertions = new UiAssertions(page);
  }

  // ==========================================================================
  // Mouse Actions
  // ==========================================================================

  protected async click(
    locator: Locator = this.locator,
    options?: Parameters<Locator["click"]>[0]
  ) {
    await this.actions.click(locator, options);
  }

  protected async doubleClick(locator: Locator = this.locator) {
    await this.actions.doubleClick(locator);
  }

  protected async rightClick(locator: Locator = this.locator) {
    await this.actions.rightClick(locator);
  }

  protected async hover(locator: Locator = this.locator) {
    await this.actions.hover(locator);
  }

  // ==========================================================================
  // Text Actions
  // ==========================================================================

  protected async enterText(value: string, locator: Locator = this.locator) {
    await this.actions.fill(locator, value);
  }

  protected async typeText(value: string, locator: Locator = this.locator) {
    await this.actions.type(locator, value);
  }

  protected async clear(locator: Locator = this.locator) {
    await this.actions.clear(locator);
  }

  // ==========================================================================
  // Checkbox
  // ==========================================================================

  protected async check(locator: Locator = this.locator) {
    await this.actions.check(locator);
  }

  protected async uncheck(locator: Locator = this.locator) {
    await this.actions.uncheck(locator);
  }

  // ==========================================================================
  // Keyboard
  // ==========================================================================

  protected async press(key: string, locator: Locator = this.locator) {
    await this.actions.press(locator, key);
  }

  // ==========================================================================
  // Dropdown
  // ==========================================================================

  protected async selectByValue(value: string, locator: Locator = this.locator) {
    await this.actions.selectByValue(locator, value);
  }

  protected async selectByLabel(label: string, locator: Locator = this.locator) {
    await this.actions.selectByLabel(locator, label);
  }

  protected async selectByIndex(index: number, locator: Locator = this.locator) {
    await this.actions.selectByIndex(locator, index);
  }

  protected async getSelectedValue(locator: Locator = this.locator): Promise<string> {
    return this.actions.getSelectedValue(locator);
  }

  protected async getSelectedLabel(locator: Locator = this.locator): Promise<string> {
    return this.actions.getSelectedLabel(locator);
  }

  protected async getOptions(locator: Locator = this.locator): Promise<string[]> {
    return this.actions.getOptions(locator);
  }

  protected async isOptionSelected(
    label: string,
    locator: Locator = this.locator
  ): Promise<boolean> {
    return this.actions.isOptionSelected(locator, label);
  }

  // ==========================================================================
  // Getters
  // ==========================================================================

  protected async getText(locator: Locator = this.locator): Promise<string> {
    return this.actions.getText(locator);
  }

  protected async getValue(locator: Locator = this.locator): Promise<string> {
    return (await this.actions.getAttribute(locator, "value")) ?? "";
  }

  protected async getAttribute(
    attribute: string,
    locator: Locator = this.locator
  ): Promise<string | null> {
    return this.actions.getAttribute(locator, attribute);
  }

  protected async isVisible(locator: Locator = this.locator): Promise<boolean> {
    return this.actions.isVisible(locator);
  }

  protected async isEnabled(locator: Locator = this.locator): Promise<boolean> {
    return this.actions.isEnabled(locator);
  }

  // ==========================================================================
  // Wait Helpers
  // ==========================================================================

  protected async waitForVisible(locator: Locator = this.locator) {
    await this.waits.visible(locator);
  }

  protected async waitForHidden(locator: Locator = this.locator) {
    await this.waits.hidden(locator);
  }

  protected async waitForAttached(locator: Locator = this.locator) {
    await this.waits.attached(locator);
  }

  protected async waitForDetached(locator: Locator = this.locator) {
    await this.waits.detached(locator);
  }

  protected async waitForEnabled(locator: Locator = this.locator) {
    await this.waits.enabled(locator);
  }

  protected async waitForDisabled(locator: Locator = this.locator) {
    await this.waits.disabled(locator);
  }

  protected async waitUntilVisible() {
    await this.waitForVisible();
  }

  protected async waitUntilHidden() {
    await this.waitForHidden();
  }

  protected async verifyVisible() {
    await this.assertions.visible(this.locator);
  }

  protected async verifyHidden() {
    await this.assertions.hidden(this.locator);
  }
}
