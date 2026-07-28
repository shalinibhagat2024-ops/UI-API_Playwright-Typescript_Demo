import { expect, Locator, Page } from "@playwright/test";

export class WaitHelper {
  private static readonly DEFAULT_TIMEOUT = 30_000;

  constructor(private readonly page: Page) {}

  // ============================================================================
  // Element Waits
  // ============================================================================

  /**
   * Wait until element is visible.
   */
  async visible(locator: Locator, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await locator.waitFor({
      state: "visible",
      timeout,
    });
  }

  /**
   * Backward compatible alias.
   */
  async waitForVisible(locator: Locator, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await this.visible(locator, timeout);
  }

  /**
   * Wait until element is hidden.
   */
  async hidden(locator: Locator, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await locator.waitFor({
      state: "hidden",
      timeout,
    });
  }

  /**
   * Backward compatible alias.
   */
  async waitForHidden(locator: Locator, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await this.hidden(locator, timeout);
  }

  /**
   * Wait until element is attached.
   */
  async attached(locator: Locator, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await locator.waitFor({
      state: "attached",
      timeout,
    });
  }

  /**
   * Wait until element is detached.
   */
  async detached(locator: Locator, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await locator.waitFor({
      state: "detached",
      timeout,
    });
  }

  /**
   * Wait until element is enabled.
   */
  async enabled(locator: Locator, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await expect(locator).toBeEnabled({
      timeout,
    });
  }

  /**
   * Wait until element is disabled.
   */
  async disabled(locator: Locator, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await expect(locator).toBeDisabled({
      timeout,
    });
  }

  // ============================================================================
  // Page Waits
  // ============================================================================

  /**
   * Wait for page load.
   */
  async pageLoad(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  /**
   * Backward compatible alias.
   */
  async waitForPageLoad(): Promise<void> {
    await this.pageLoad();
  }

  /**
   * Wait until DOM is loaded.
   */
  async domLoaded(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * Wait until network becomes idle.
   * Falls back to 'load' if networkidle is never reached.
   */
  async networkIdle(timeout = 10_000): Promise<void> {
    try {
      await this.page.waitForLoadState("networkidle", {
        timeout,
      });
    } catch {
      await this.page
        .waitForLoadState("load", {
          timeout: Math.min(timeout, 5000),
        })
        .catch(() => undefined);
    }
  }

  /**
   * Wait for URL containing the specified value.
   */
  async urlContains(value: string, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await this.page.waitForURL(`**${value}**`, {
      timeout,
    });
  }

  /**
   * Wait for exact URL or URL pattern.
   */
  async url(url: string | RegExp, timeout = WaitHelper.DEFAULT_TIMEOUT): Promise<void> {
    await this.page.waitForURL(url, {
      timeout,
    });
  }

  // ============================================================================
  // Utility Waits
  // ============================================================================

  /**
   * Explicit wait.
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Backward compatible alias.
   */
  async sleep(milliseconds: number): Promise<void> {
    await this.wait(milliseconds);
  }
}
