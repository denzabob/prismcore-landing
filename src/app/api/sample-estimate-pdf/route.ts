function buildSamplePdf(): Uint8Array {
  const contentStream = [
    "BT",
    "/F1 26 Tf",
    "60 770 Td",
    "(Expert Estimate Sample) Tj",
    "0 -42 Td",
    "/F1 16 Tf",
    "(Verification: QR / Hash) Tj",
    "0 -24 Td",
    "(Hash: 95b7c8f13de3a09f) Tj",
    "0 -24 Td",
    "(Ready for attachment to expert report) Tj",
    "ET",
    "",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${Buffer.byteLength(contentStream, "utf8")} >>\nstream\n${contentStream}endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];

  objects.forEach((obj, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${offset.toString().padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefStart}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

export async function GET() {
  const pdfBytes = buildSamplePdf();

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="smeta_11-46.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
