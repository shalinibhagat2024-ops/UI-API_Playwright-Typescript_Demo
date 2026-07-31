import { AttachmentHelper } from "@core/reporting/attachment/AttachmentHelper";
import { ApiRequestMetadata } from "@core/reporting/metadata/ApiRequestMetadata";
import { ApiResponseMetadata } from "@core/reporting/metadata/ApiResponseMetadata";

export class ApiReportHelper {
  public static async attachRequest(request: ApiRequestMetadata) {
    await AttachmentHelper.attachJson("API Request", request);
  }

  public static async attachResponse(response: ApiResponseMetadata) {
    await AttachmentHelper.attachJson("API Response", response);
  }
}
