import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SupportForm } from "@/components/support-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Поддержка — Призма",
  description: "Свяжитесь с командой ПРИЗМЫ по вопросам работы сервиса.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Поддержка</h1>
          <p className="text-muted-foreground mb-8">
            Опишите вашу проблему или вопрос, и мы свяжемся с вами в ближайшее время.
          </p>
          <SupportForm />
          <p className="mt-8 text-center text-muted-foreground">
            Можно написать напрямую в Telegram:{" "}
            <Link
              href="https://t.me/denzabob"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary hover:underline"
            >
              https://t.me/denzabob
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
