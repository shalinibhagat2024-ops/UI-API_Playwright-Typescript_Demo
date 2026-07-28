import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class DragDropComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Drag current element to target element.
   */
  async dragTo(target: Locator): Promise<void> {
    await this.locator.dragTo(target);
  }

  /**
   * Drag current element by mouse offset.
   */
  async dragByOffset(x: number, y: number): Promise<void> {
    const box = await this.locator.boundingBox();

    if (!box) {
      throw new Error("Unable to determine element position.");
    }

    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    await this.page.mouse.down();

    await this.page.mouse.move(box.x + box.width / 2 + x, box.y + box.height / 2 + y);

    await this.page.mouse.up();
  }

  /**
   * Drag using custom target coordinates.
   */
  async dragToPosition(x: number, y: number): Promise<void> {
    const box = await this.locator.boundingBox();

    if (!box) {
      throw new Error("Unable to determine element position.");
    }

    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    await this.page.mouse.down();

    await this.page.mouse.move(x, y);

    await this.page.mouse.up();
  }

  /**
   * Returns current position.
   */
  async position() {
    return await this.locator.boundingBox();
  }

  /**
   * Verify element is visible.
   */
  async verifyVisible(): Promise<void> {
    await this.assertions.visible(this.locator);
  }
}
