import { EnvironmentManager } from "@core/config/EnvironmentManager";
import { ConsoleLogger } from "@core/logger/ConsoleLogger";
import { FileLogger } from "@core/logger/FileLogger";
import { LoggerConfig } from "@core/logger/LoggerConfig";
import { LogLevel } from "@core/logger/LogLevel";
import * as allure from "allure-js-commons";

export class Logger {
  /**
   * Returns current timestamp.
   */
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Builds a formatted log message.
   */
  private static format(level: LogLevel, message: string): string {
    const parts: string[] = [];

    if (LoggerConfig.showTimestamp) {
      parts.push(Logger.getTimestamp());
    }

    if (LoggerConfig.showEnvironment) {
      parts.push(EnvironmentManager.getEnvironmentName());
    }

    parts.push(level);
    parts.push(message);

    return parts.join(" | ");
  }

  /**
   * INFO
   */
  public static async info(message: string) {
    console.log(message);
    await allure.step(message, async () => {});
  }

  /**
   * WARN
   */
  public static warn(message: string): void {
    console.warn(Logger.format(LogLevel.WARN, message));
  }

  /**
   * ERROR
   */
  public static error(message: string): void {
    console.error(Logger.format(LogLevel.ERROR, message));
  }

  /**
   * DEBUG
   */
  public static debug(message: string): void {
    if (!LoggerConfig.enableDebug) {
      return;
    }
    console.debug(Logger.format(LogLevel.DEBUG, message));
  }

  private static log(level: LogLevel, message: string): void {
    const formatted = `[${new Date().toISOString()}] [${level}] ${message}`;

    ConsoleLogger.log(level, message);

    FileLogger.write(formatted);
  }
}
