import fs from "fs";
import path from "path";

export class FileUtil {
  /**
   * Check file exists.
   */
  public static exists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  /**
   * Delete file.
   */
  public static delete(filePath: string): void {
    if (this.exists(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  /**
   * Read file.
   */
  public static read(filePath: string): string {
    return fs.readFileSync(filePath, "utf8");
  }

  /**
   * Write file.
   */
  public static write(filePath: string, data: string): void {
    fs.writeFileSync(filePath, data);
  }

  /**
   * Append file.
   */
  public static append(filePath: string, data: string): void {
    fs.appendFileSync(filePath, data);
  }

  /**
   * Create directory.
   */
  public static createDirectory(directory: string): void {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  /**
   * Delete directory.
   */
  public static deleteDirectory(directory: string): void {
    if (fs.existsSync(directory)) {
      fs.rmSync(directory, {
        recursive: true,
        force: true,
      });
    }
  }

  /**
   * Get filename.
   */
  public static fileName(filePath: string): string {
    return path.basename(filePath);
  }

  /**
   * Get extension.
   */
  public static extension(filePath: string): string {
    return path.extname(filePath);
  }

  /**
   * Get directory.
   */
  public static directory(filePath: string): string {
    return path.dirname(filePath);
  }
}
