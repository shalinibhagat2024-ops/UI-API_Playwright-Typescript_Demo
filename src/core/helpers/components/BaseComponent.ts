import { UiAssertions } from "@core/assertions/UiAssertions";
import { ElementActions } from "@core/helpers/actions/ElementActions";
import { WaitHelper } from "@core/helpers/WaitHelper";
import { Locator, Page } from "@playwright/test";

export abstract class BaseComponent {
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

  /**
   * Click element
   */
  async click(): Promise<void> {
    await this.actions.click(this.locator);
  }

  /**
   * Hover over element
   */
  async hover(): Promise<void> {
    await this.actions.hover(this.locator);
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(): Promise<void> {
    await this.actions.scrollIntoView(this.locator);
  }

  /**
   * Focus element
   */
  async focus(): Promise<void> {
    await this.actions.focus(this.locator);
  }

  /**
   * Verify visible
   */
  async isVisible(): Promise<void> {
    await this.assertions.visible(this.locator);
  }

  /**
   * Verify hidden
   */
  async isHidden(): Promise<void> {
    await this.assertions.hidden(this.locator);
  }

  /**
   * Verify enabled
   */
  async isEnabled(): Promise<void> {
    await this.assertions.enabled(this.locator);
  }

  /**
   * Verify disabled
   */
  async isDisabled(): Promise<void> {
    await this.assertions.disabled(this.locator);
  }

  /**
   * Get element text
   */
  async getText(): Promise<string> {
    return (await this.locator.textContent())?.trim() ?? "";
  }

  /**
   * Get input value
   */
  async getValue(): Promise<string> {
    return await this.locator.inputValue();
  }

  /**
   * Returns underlying locator.
   * Useful for advanced/custom scenarios.
   */
  protected getLocator(): Locator {
    return this.locator;
  }
}
