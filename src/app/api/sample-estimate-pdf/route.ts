import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const filePath = path.join(process.cwd(), "src", "app", "api", "sample-estimate-pdf", "smeta_11-47.pdf");
  const pdfBuffer = await readFile(filePath);

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="smeta_11-47.pdf"',
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
