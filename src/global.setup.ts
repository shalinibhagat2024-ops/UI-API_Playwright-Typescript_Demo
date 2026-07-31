import { ReportInitializer } from "@core/reporting/ReportInitializer";

async function globalSetup() {
  ReportInitializer.initialize();
}
export default globalSetup;
