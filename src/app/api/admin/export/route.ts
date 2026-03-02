import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasValidAdminSession } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  if (!hasValidAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Build CSV
  const headers = [
    "ID",
    "Дата",
    "Имя",
    "Деятельность",
    "Email",
    "Телефон",
    "Комментарий",
    "Источник",
    "Статус",
    "IP",
    "User-Agent",
  ];

  const escapeCSV = (val: string | null | undefined) => {
    if (val === null || val === undefined) return "";
    const str = String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = leads.map((lead) => [
    lead.id,
    new Date(lead.createdAt).toISOString(),
    escapeCSV(lead.name),
    escapeCSV(lead.activity),
    escapeCSV(lead.email),
    escapeCSV(lead.phone),
    escapeCSV(lead.comment),
    escapeCSV(lead.source),
    escapeCSV(lead.status),
    escapeCSV(lead.ip),
    escapeCSV(lead.userAgent),
  ]);

  const csv =
    "\uFEFF" +
    headers.join(",") +
    "\n" +
    rows.map((row) => row.join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
