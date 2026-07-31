import { WaitHelper } from "@core/helpers/WaitHelper";
import { Logger } from "@core/logger/Logger";
import { Locator, Page } from "@playwright/test";

export class ElementActions {
  private readonly waits: WaitHelper;

  constructor(private readonly page: Page) {
    this.waits = new WaitHelper(page);
  }
  // /**
  //    * Click element
  //    */
  //   public async click(locator: Locator, options?: Parameters<Locator["click"]>[0]){
  //     Logger.info("Clicking element.");

  //     await locator.scrollIntoViewIfNeeded();

  //     await locator.click(options);
  //   }
  //   /**
  //    * Fill textbox
  //    */
  //   async fill(locator: Locator, value: string){
  //     await this.waits.visible(locator);

  //     Logger.info(`Entering value : ${value}`);

  //     await locator.fill(value);
  //   }

  //   /**
  //    * Type text
  //    */
  //   async type(locator: Locator, value: string){
  //     await this.waits.visible(locator);

  //     Logger.info(`Typing : ${value}`);

  //     await locator.type(value);
  //   }

  //   /**
  //    * Clear textbox
  //    */
  //   async clear(locator: Locator){
  //     await this.waits.visible(locator);

  //     Logger.info("Clearing textbox");

  //     await locator.clear();
  //   }

  //   /**
  //    * Hover
  //    */
  //   async hover(locator: Locator){
  //     await this.waits.visible(locator);

  //     Logger.info("Hover element");

  //     await locator.hover();
  //   }

  //   /**
  //    * Double click
  //    */
  //   async doubleClick(locator: Locator){
  //     await this.waits.visible(locator);

  //     Logger.info("Double click");

  //     await locator.dblclick();
  //   }

  //   /**
  //    * Right click
  //    */
  //   async rightClick(locator: Locator){
  //     await this.waits.visible(locator);

  //     Logger.info("Right click");

  //     await locator.click({
  //       button: "right",
  //     });
  //   }

  //   /**
  //    * Check checkbox
  //    */
  //   async check(locator: Locator){
  //     await this.waits.visible(locator);

  //     Logger.info("Check checkbox");

  //     await locator.check();
  //   }

  //   /**
  //    * Uncheck checkbox
  //    */
  //   async uncheck(locator: Locator){
  //     await this.waits.visible(locator);

  //     Logger.info("Uncheck checkbox");

  //     await locator.uncheck();
  //   }

  //   /**
  //    * Focus
  //    */
  //   async focus(locator: Locator){
  //     await this.waits.visible(locator);

  //     await locator.focus();
  //   }

  //   /**
  //    * Scroll into view
  //    */
  //   async scrollIntoView(locator: Locator){
  //     await locator.scrollIntoViewIfNeeded();
  //   }

  //   /**
  //    * Select dropdown
  //    */
  //   public async selectByValue(locator: Locator, value: string){
  //     await locator.selectOption(value);
  //   }

  //   public async selectByLabel(locator: Locator, label: string){
  //     await locator.selectOption({ label });
  //   }

  //   public async selectByIndex(locator: Locator, index: number){
  //     await locator.selectOption({ index });
  //   }

  //   public async getSelectedValue(locator: Locator): Promise<string> {
  //     return await locator.inputValue();
  //   }

  //   public async getSelectedLabel(locator: Locator): Promise<string> {
  //     return await locator.evaluate((select: HTMLSelectElement) => {
  //       return select.selectedOptions[0]?.label ?? "";
  //     });
  //   }

  //   public async getOptions(locator: Locator): Promise<string[]> {
  //     return await locator.evaluate((select: HTMLSelectElement) =>
  //       Array.from(select.options).map((option) => option.text)
  //     );
  //   }

  //   public async isOptionSelected(locator: Locator, label: string): Promise<boolean> {
  //     const selected = await this.getSelectedLabel(locator);
  //     return selected === label;
  //   }
  //   /**
  //    * Press keyboard key
  //    */
  //   async press(locator: Locator, key: string){
  //     await this.waits.visible(locator);

  //     await locator.press(key);
  //   }

  //   /**
  //    * Get text
  //    */
  //   async getText(locator: Locator): Promise<string> {
  //     await this.waits.visible(locator);

  //     return (await locator.textContent())?.trim() ?? "";
  //   }

  //   /**
  //    * Get attribute
  //    */
  //   async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
  //     return locator.getAttribute(attribute);
  //   }

  //   /**
  //    * Is Visible
  //    */
  //   async isVisible(locator: Locator): Promise<boolean> {
  //     return locator.isVisible();
  //   }

  //   /**
  //    * Is Enabled
  //    */
  //   async isEnabled(locator: Locator): Promise<boolean> {
  //     return locator.isEnabled();
  //   }

  // Mouse Actions
  public async click(locator: Locator, options?: Parameters<Locator["click"]>[0]) {
    await this.waits.visible(locator);
    await locator.scrollIntoViewIfNeeded();
    Logger.info("Clicking element.");
    await locator.click(options);
  }

  public async doubleClick(locator: Locator) {
    await this.waits.visible(locator);
    Logger.info("Double clicking element.");
    await locator.dblclick();
  }

  public async rightClick(locator: Locator) {
    await this.waits.visible(locator);
    Logger.info("Right clicking element.");
    await locator.click({ button: "right" });
  }

  public async hover(locator: Locator) {
    await this.waits.visible(locator);
    Logger.info("Hovering over element.");
    await locator.hover();
  }

  public async dragAndDrop(source: Locator, destination: Locator) {
    await this.waits.visible(source);
    await this.waits.visible(destination);
    Logger.info("Dragging element.");
    await source.dragTo(destination);
  }

  public async clickAt(x: number, y: number) {
    await this.page.mouse.click(x, y);
  }
  public async doubleClickAt(x: number, y: number) {
    await this.page.mouse.dblclick(x, y);
  }
  public async moveMouse(x: number, y: number) {
    await this.page.mouse.move(x, y);
  }
  public async mouseDown() {
    await this.page.mouse.down();
  }
  public async mouseUp() {
    await this.page.mouse.up();
  }
  public async wheel(deltaX: number, deltaY: number) {
    await this.page.mouse.wheel(deltaX, deltaY);
  }

  // Text Actions
  public async fill(locator: Locator, value: string) {
    await this.waits.visible(locator);
    Logger.info(`Fill: ${value}`);
    await locator.fill(value);
  }
  public async type(locator: Locator, value: string) {
    await this.waits.visible(locator);
    Logger.info(`Type: ${value}`);
    await locator.type(value);
  }
  public async clear(locator: Locator) {
    await this.waits.visible(locator);
    await locator.clear();
  }
  public async focus(locator: Locator) {
    await this.waits.visible(locator);
    await locator.focus();
  }
  public async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  // Checkbox
  public async check(locator: Locator) {
    await this.waits.visible(locator);
    await locator.check();
  }
  public async uncheck(locator: Locator) {
    await this.waits.visible(locator);
    await locator.uncheck();
  }

  // Dropdown
  public async selectByValue(locator: Locator, value: string) {
    await this.waits.visible(locator);
    await locator.selectOption(value);
  }
  public async selectByLabel(locator: Locator, label: string) {
    await this.waits.visible(locator);
    await locator.selectOption({ label });
  }
  public async selectByIndex(locator: Locator, index: number) {
    await this.waits.visible(locator);
    await locator.selectOption({ index });
  }
  public async getSelectedValue(locator: Locator) {
    return locator.inputValue();
  }
  public async getSelectedLabel(locator: Locator) {
    return locator.evaluate((s: HTMLSelectElement) => s.selectedOptions[0]?.label ?? "");
  }
  public async getOptions(locator: Locator) {
    return locator.evaluate((s: HTMLSelectElement) => Array.from(s.options).map((o) => o.text));
  }
  public async isOptionSelected(locator: Locator, label: string) {
    return (await this.getSelectedLabel(locator)) === label;
  }

  // Keyboard
  public async press(locator: Locator, key: string) {
    await this.waits.visible(locator);
    await locator.press(key);
  }
  public async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }
  public async tab() {
    await this.pressKey("Tab");
  }
  public async enter() {
    await this.pressKey("Enter");
  }
  public async escape() {
    await this.pressKey("Escape");
  }
  public async backspace() {
    await this.pressKey("Backspace");
  }
  public async delete() {
    await this.pressKey("Delete");
  }
  public async arrowUp() {
    await this.pressKey("ArrowUp");
  }
  public async arrowDown() {
    await this.pressKey("ArrowDown");
  }
  public async arrowLeft() {
    await this.pressKey("ArrowLeft");
  }
  public async arrowRight() {
    await this.pressKey("ArrowRight");
  }
  public async home() {
    await this.pressKey("Home");
  }
  public async end() {
    await this.pressKey("End");
  }
  public async pageUp() {
    await this.pressKey("PageUp");
  }
  public async pageDown() {
    await this.pressKey("PageDown");
  }
  public async selectAll() {
    await this.pressKey("Control+A");
  }
  public async copy() {
    await this.pressKey("Control+C");
  }
  public async paste() {
    await this.pressKey("Control+V");
  }
  public async cut() {
    await this.pressKey("Control+X");
  }
  public async undo() {
    await this.pressKey("Control+Z");
  }
  public async redo() {
    await this.pressKey("Control+Y");
  }
  public async typeUsingKeyboard(text: string) {
    await this.page.keyboard.type(text);
  }

  // Information
  public async getText(locator: Locator) {
    await this.waits.visible(locator);
    return (await locator.textContent())?.trim() ?? "";
  }
  public async getValue(locator: Locator) {
    return locator.inputValue();
  }
  public async getAttribute(locator: Locator, attribute: string) {
    return locator.getAttribute(attribute);
  }
  public async isVisible(locator: Locator) {
    return locator.isVisible();
  }
  public async isHidden(locator: Locator) {
    return locator.isHidden();
  }
  public async isEnabled(locator: Locator) {
    return locator.isEnabled();
  }
  public async isDisabled(locator: Locator) {
    return locator.isDisabled();
  }
  public async isChecked(locator: Locator) {
    return locator.isChecked();
  }
  public async getCount(locator: Locator) {
    return locator.count();
  }
}
