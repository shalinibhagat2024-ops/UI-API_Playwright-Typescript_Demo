import { BrowserManager } from "@core/helpers/actions/BrowserActions";
import { ElementActions } from "@core/helpers/actions/ElementActions";
import { KeyboardActions } from "@core/helpers/actions/KeyboardActions";
import { MouseActions } from "@core/helpers/actions/MouseActions";
import { Page } from "@playwright/test";

export class ActionProvider {
  public readonly element: ElementActions;
  public readonly mouse: MouseActions;
  public readonly keyboard: KeyboardActions;
  public readonly browser: BrowserManager;

  constructor(page: Page) {
    this.element = new ElementActions(page);
    this.mouse = new MouseActions(page);
    this.keyboard = new KeyboardActions(page);
    this.browser = new BrowserManager(page);
  }
}
