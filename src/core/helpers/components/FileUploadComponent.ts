import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class FileUploadComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Upload single or multiple files.
   */
  async upload(file: string | string[]): Promise<void> {
    await this.waits.visible(this.locator);
    await this.locator.setInputFiles(file);
  }

  /**
   * Upload multiple files.
   * Wrapper around upload() for readability.
   */
  async uploadMultiple(files: string[]): Promise<void> {
    await this.upload(files);
  }

  /**
   * Remove uploaded files.
   */
  async clear(): Promise<void> {
    await this.waits.visible(this.locator);
    await this.locator.setInputFiles([]);
  }

  /**
   * Returns uploaded file names.
   */
  async fileNames(): Promise<string[]> {
    return await this.locator.evaluate((element) => {
      const input = element as HTMLInputElement;

      if (!input.files) {
        return [];
      }

      return Array.from(input.files).map((file) => file.name);
    });
  }

  /**
   * Returns true if at least one file is selected.
   */
  async hasFile(): Promise<boolean> {
    return (await this.fileNames()).length > 0;
  }
}
