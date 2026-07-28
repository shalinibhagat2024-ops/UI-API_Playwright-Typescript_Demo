import { test } from "@playwright/test";
import path from "path";

import { FileUploadShowcasePage } from "../../../src/pages/showcase/FileUploadShowcasePage";

test.describe("File Upload Component", () => {
  test(
    "Verify user can upload file",
    {
      tag: ["@ui", "@component", "@upload", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const upload = new FileUploadShowcasePage(page);

      await upload.open();

      const filePath = path.join(process.cwd(), "src", "testdata", "sample.pdf");

      await upload.uploadSampleFile(filePath);
      await upload.verifyUploadedFile("sample.pdf");
    }
  );
});
