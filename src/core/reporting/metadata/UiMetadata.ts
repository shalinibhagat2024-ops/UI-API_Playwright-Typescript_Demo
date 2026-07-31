// UiMetadata.ts
import { MetadataHelper } from "src/core/reporting/metadata/MetadataHelper";

export class UiMetadata {
  public static async productSearch() {
    await MetadataHelper.epic("Automation Exercise");
    await MetadataHelper.feature("Products");
    await MetadataHelper.story("Search Product");
    await MetadataHelper.owner("Shalini Bhagat");
    await MetadataHelper.severity("critical");
    await MetadataHelper.tag("UI", "Smoke", "Products");
  }

  public static async checkout() {
    await MetadataHelper.epic("Automation Exercise");
    await MetadataHelper.feature("Checkout");
    await MetadataHelper.story("Place Order");
    await MetadataHelper.owner("Shalini Bhagat");
    await MetadataHelper.severity("blocker");
    await MetadataHelper.tag("UI", "Regression", "Checkout");
  }
}
