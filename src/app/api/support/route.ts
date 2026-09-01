import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const supportFormSchema = z.object({
  name: z.string().min(1, "Укажите ваше имя").max(200, "Имя слишком длинное"),
  email: z.string().email("Некорректный email"),
  subject: z.string().min(1, "Укажите тему обращения").max(200, "Тема слишком длинная"),
  message: z.string().min(1, "Введите сообщение").max(5000, "Сообщение слишком длинное"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = supportFormSchema.safeParse({
      name: body.name?.trim(),
      email: body.email?.trim(),
      subject: body.subject?.trim(),
      message: body.message?.trim(),
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0]?.toString();
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      return NextResponse.json(
        { error: "Ошибка валидации", fields: fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const supportFromEmail = process.env.SUPPORT_FROM_EMAIL;
    const supportToEmail = process.env.SUPPORT_TO_EMAIL;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !supportFromEmail || !supportToEmail) {
      return NextResponse.json(
        { error: "Не удалось отправить сообщение. Попробуйте позже или напишите нам в Telegram." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      requireTLS: true,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: `PrismCore <${supportFromEmail}>`,
      to: supportToEmail,
      replyTo: email,
      subject: `[PrismCore Support] ${subject}`,
      text: `Имя: ${name}\nEmail: ${email}\nТема: ${subject}\n\nСообщение:\n${message}\n\nДата/время: ${new Date().toISOString()}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API /support] Error:", error);
    return NextResponse.json(
      { error: "Не удалось отправить сообщение. Попробуйте позже или напишите нам в Telegram." },
      { status: 500 }
    );
  }
}
