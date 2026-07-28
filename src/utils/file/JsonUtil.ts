import fs from "fs";

export class JsonUtil {
  /**
   * Read JSON file.
   */
  public static read<T>(filePath: string): T {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  }

  /**
   * Write JSON.
   */
  public static write(filePath: string, data: unknown): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  /**
   * Convert object to JSON.
   */
  public static stringify(data: unknown): string {
    return JSON.stringify(data, null, 2);
  }

  /**
   * Parse JSON.
   */
  public static parse<T>(json: string): T {
    return JSON.parse(json) as T;
  }
}

/*
USAGE
const config = JsonUtil.read<User>("user.json");

JsonUtil.write("result.json", response);

const json = JsonUtil.stringify(response);
*/
