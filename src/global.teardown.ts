import { Logger } from "@core/logger/Logger";

async function globalTeardown() {
  Logger.info("Stopping services...");

  // Stop mock server
  // Upload Allure results
  // Compress reports
  // Delete temp files
  // Send notifications

  Logger.info("Global teardown completed.");
}

export default globalTeardown;
