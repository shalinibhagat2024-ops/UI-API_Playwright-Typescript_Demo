import { EnvironmentManager } from "@core/config/EnvironmentManager";
import fs from "fs";
import os from "os";
import path from "path";

export class AllureEnvironment {
  public static generate(): void {
    const outputFolder = path.join(process.cwd(), "allure-results");

    fs.mkdirSync(outputFolder, {
      recursive: true,
    });

    const suite = (process.env.SUITE ?? "ui").toLowerCase();

    const environment: string[] = [];

    // Common properties
    environment.push(`Environment=${EnvironmentManager.getEnvironmentName()}`);
    environment.push(`Execution=${process.env.GITHUB_ACTIONS ? "GitHub Actions" : "Local"}`);

    // UI properties
    if (suite === "ui" || suite === "all") {
      environment.push(`Browser=${EnvironmentManager.getBrowserConfig().name}`);
      environment.push(`Base_URL=${EnvironmentManager.getBaseUrl()}`);
    }

    // API properties
    if (suite === "api" || suite === "all") {
      environment.push(`API_URL=${EnvironmentManager.getApiBaseUrl()}`);
    }

    // System properties
    environment.push(`Branch=${process.env.GITHUB_REF_NAME ?? "Local"}`);
    environment.push(`Commit=${process.env.GITHUB_SHA ?? "N/A"}`);
    environment.push(`Build=${process.env.GITHUB_RUN_NUMBER ?? "Local"}`);
    environment.push(`Repository=${process.env.GITHUB_REPOSITORY ?? "Local Repository"}`);
    environment.push(`OS=${os.type()} ${os.release()}`);
    environment.push(`Node=${process.version}`);
    environment.push(`Framework=Playwright + TypeScript Enterprise`);
    environment.push(`User=${os.userInfo().username}`);

    fs.writeFileSync(path.join(outputFolder, "environment.properties"), environment.join("\n"));
  }
}
