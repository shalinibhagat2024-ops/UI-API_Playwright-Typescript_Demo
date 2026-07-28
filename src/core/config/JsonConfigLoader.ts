import { Environment } from "@core/config/Environment";
import fs from "fs";
import path from "path";

export class JsonConfigLoader {
  public static load(profile: string): Environment {
    const filePath = path.resolve(
      process.cwd(),
      "src",
      "resources",
      "environment",
      `${profile}.json`
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`Environment file not found: ${filePath}`);
    }

    return JSON.parse(fs.readFileSync(filePath, "utf8")) as Environment;
  }
}
