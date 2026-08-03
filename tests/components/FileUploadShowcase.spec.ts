import { test } from "@playwright/test";
import path from "path";
import { FileUploadShowcasePage } from "src/pages/Components/FileUploadShowcasePage";

test.describe("File Upload Component", () => {
  test.skip(
    "Verify user can upload file",
    {
      tag: ["@ui", "@component", "@upload", "@smoke", "@P1"],
    },
    async ({ page }) => {
      const upload = new FileUploadShowcasePage(page);

      const filePath = path.join(process.cwd(), "src", "testdata", "sample.pdf");

      await test.step("Open File Upload Showcase page", async () => {
        await upload.open();
      });

      await test.step("Upload the sample PDF file", async () => {
        await upload.uploadSampleFile(filePath);
      });

      await test.step("Verify the uploaded file name is displayed", async () => {
        await upload.verifyUploadedFile("sample.pdf");
      });
    }
  );
});
