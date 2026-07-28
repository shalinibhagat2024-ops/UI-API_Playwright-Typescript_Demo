import { FrameLocator, Locator, Page } from "@playwright/test";

export class FrameComponent {
  private readonly frame: FrameLocator;

  constructor(
    private readonly page: Page,
    frameLocator: Locator
  ) {
    this.frame = frameLocator.contentFrame();
  }

  /**
   * Returns locator inside frame.
   */
  locator(selector: string): Locator {
    return this.frame.locator(selector);
  }

  /**
   * Returns locator by role.
   */
  getByRole(
    role: Parameters<FrameLocator["getByRole"]>[0],
    options?: Parameters<FrameLocator["getByRole"]>[1]
  ): Locator {
    return this.frame.getByRole(role, options);
  }

  /**
   * Returns locator by text.
   */
  getByText(text: string | RegExp): Locator {
    return this.frame.getByText(text);
  }

  /**
   * Returns locator by placeholder.
   */
  getByPlaceholder(text: string): Locator {
    return this.frame.getByPlaceholder(text);
  }

  /**
   * Returns locator by label.
   */
  getByLabel(text: string): Locator {
    return this.frame.getByLabel(text);
  }

  /**
   * Returns underlying FrameLocator.
   */
  frameLocator(): FrameLocator {
    return this.frame;
  }
}
