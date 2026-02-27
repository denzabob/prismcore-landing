import type { Lead } from "@prisma/client";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function sendLeadToTelegram(lead: Lead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return;
  }

  const mode = lead.source === "landing_pdf" ? "Образец PDF" : "Тестовый доступ";
  const phone = lead.phone?.trim() ? lead.phone : "—";
  const comment = lead.comment?.trim() ? lead.comment : "—";

  const text = [
    "<b>Новая заявка с лендинга</b>",
    `Режим: <b>${escapeHtml(mode)}</b>`,
    `Специализация: <b>${escapeHtml(lead.activity)}</b>`,
    `Email: ${escapeHtml(lead.email)}`,
    `Телефон: ${escapeHtml(phone)}`,
    `Комментарий: ${escapeHtml(comment)}`,
    `Источник: ${escapeHtml(lead.source)}`,
    `ID: ${lead.id}`,
    `Дата: ${escapeHtml(lead.createdAt.toISOString())}`,
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${errorText}`);
  }
}
