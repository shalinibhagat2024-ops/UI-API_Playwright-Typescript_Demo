import { Environment } from "@core/config/Environment";
import { JsonConfigLoader } from "@core/config/JsonConfigLoader";
import { TestDataSource } from "@core/constants/TestDataSource";
import dotenv from "dotenv";
import path from "path";
import { LoginRequest } from "src/api/modules/auth/models/LoginRequest";

export class EnvironmentManager {
  private static configuration: Environment;

  private static readonly environment = process.env.ENV ?? "qa";

  private static readonly profile =
    process.env.CI === "true"
      ? `${EnvironmentManager.environment}-ci`
      : EnvironmentManager.environment;

  /**
   * Initialize Framework Configuration
   */
  public static initialize(): void {
    dotenv.config({
      path: path.resolve(process.cwd(), `.env.${this.environment}`),
      override: true,
    });

    this.configuration = JsonConfigLoader.load(this.profile);

    this.validate();

    console.log("=================================");
    console.log(`Environment : ${this.environment}`);
    console.log(`Profile     : ${this.profile}`);
    console.log(`Base URL    : ${this.configuration.baseUrl}`);
    console.log(`API URL     : ${this.configuration.apiBaseUrl}`);
    console.log("=================================");
  }

  /**
   * Validate mandatory configuration
   */
  private static validate(): void {
    const required = ["ADMIN_USERNAME", "ADMIN_PASSWORD"];

    for (const key of required) {
      if (!process.env[key]) {
        throw new Error(`${key} is missing in .env.${this.environment}`);
      }
    }
  }

  public static getConfig(): Environment {
    return this.configuration;
  }

  public static getBaseUrl(): string {
    return this.configuration.baseUrl;
  }

  public static getApiBaseUrl(): string {
    return this.configuration.apiBaseUrl;
  }

  public static getBrowserConfig() {
    return this.configuration.browser;
  }

  public static getExecutionConfig() {
    return this.configuration.execution;
  }

  public static getReportingConfig() {
    return this.configuration.reporting;
  }

  public static getEnvironmentName(): string {
    return this.configuration.environment;
  }

  public static getApplicationName(): string {
    return this.configuration.applicationName;
  }

  public static getTestDataSource(): TestDataSource {
    return this.configuration.testDataSource as TestDataSource;
  }

  public static isCI(): boolean {
    return process.env.CI === "true";
  }

  public static getAdminUser(): LoginRequest {
    return {
      username: process.env.ADMIN_USERNAME!,
      password: process.env.ADMIN_PASSWORD!,
      expiresInMins: 30,
    };
  }

  public static getStandardUser(): LoginRequest {
    return {
      username: process.env.STANDARD_USERNAME!,
      password: process.env.STANDARD_PASSWORD!,
      expiresInMins: 30,
    };
  }
}
