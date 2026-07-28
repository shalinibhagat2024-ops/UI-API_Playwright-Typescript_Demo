import { BasePage } from "src/pages/AutomationExercise/basePage/BasePage";

export class DragDropShowcasePage extends BasePage {
  readonly source = this.page.locator("#column-a");

  readonly target = this.page.locator("#column-b");

  readonly dragDrop = this.ui.dragDrop(this.source);

  async dragAtoB(): Promise<void> {
    await this.dragDrop.dragTo(this.target);
  }
}
