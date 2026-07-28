import { ApplicationRoutes } from "@core/config/ApplicationRoutes";

import { BasePage } from "../AutomationExercise/basePage/BasePage";

export class CheckboxShowcasePage extends BasePage {
  /**
   * Home Checkbox
   */
  readonly homeCheckbox = this.ui.checkbox(this.page.locator(".rc-tree-checkbox"));

  /**
   * Expand All Button
   */
  readonly expandAllButton = this.ui.button(this.page.locator("button[title='Expand all']"));

  /**
   * Collapse All Button
   */
  readonly collapseAllButton = this.ui.button(this.page.locator("button[title='Collapse all']"));

  /**
   * Result Text
   */
  readonly result = this.page.locator("#result");

  /**
   * Open Checkbox Page
   */
  async open(): Promise<void> {
    await this.navigate(ApplicationRoutes.demoqa.baseUrl, ApplicationRoutes.demoqa.checkBox);
  }

  /**
   * Expand All Nodes
   */
  async expandAll(): Promise<void> {
    await this.expandAllButton.click();
  }

  /**
   * Collapse All Nodes
   */
  async collapseAll(): Promise<void> {
    await this.collapseAllButton.click();
  }

  /**
   * Select Home Checkbox
   */
  async selectHome(): Promise<void> {
    await this.homeCheckbox.click();
  }

  /**
   * Unselect Home Checkbox
   */
  async unselectHome(): Promise<void> {
    await this.homeCheckbox.click();
  }

  /**
   * Verify Result Contains
   */
  async verifyResultContains(expected: string): Promise<void> {
    await this.assertions.containsText(this.result, expected);
  }
}
