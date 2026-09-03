import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PriceChangeCalculator } from "@/components/price-change-calculator";

export const metadata: Metadata = {
  title: "Пересчёт стоимости по индексам Росстата — ПРИЗМА",
  description:
    "Бесплатный расчёт изменения стоимости по опубликованным месячным индексам Росстата.",
  alternates: { canonical: "/tools/price-change" },
  openGraph: {
    title: "Пересчёт стоимости по индексам Росстата — ПРИЗМА",
    description:
      "Рассчитайте изменение стоимости по официальному статистическому ряду без регистрации.",
    url: "https://prismcore.ru/tools/price-change",
    siteName: "ПРИЗМА",
    locale: "ru_RU",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Пересчёт стоимости по индексам Росстата",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://prismcore.ru/tools/price-change",
  description: metadata.description,
};

export default function PriceChangePage() {
  return (
    <>
      <Header />
      <main className="pc-tools-page pc-tools-page--calculator">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="pc-tools-hero" aria-labelledby="price-change-title">
          <p className="pc-overline">ПЕРЕСЧЁТ СТОИМОСТИ</p>
          <h1 id="price-change-title">Пересчитать стоимость по индексам Росстата</h1>
          <p>Выберите официальный статистический ряд, задайте период и получите накопленный коэффициент изменения.</p>
        </section>
        <PriceChangeCalculator />
        <section className="pc-tools-method" aria-labelledby="price-method-title">
          <div>
            <p className="pc-tools-overline">МЕТОДИКА</p>
            <h2 id="price-method-title">Как считается изменение стоимости</h2>
          </div>
          <div className="pc-tools-method-copy">
            <p>Выбирается официальный статистический ряд и опубликованные Росстатом месячные показатели.</p>
            <p>Показатели последовательно связываются за выбранный период: участвуют месяцы после начального и по конечный включительно.</p>
            <p>Так получается накопленный коэффициент. Если указана исходная стоимость, она умножается на этот коэффициент.</p>
          </div>
        </section>
        <section className="pc-tools-limit" aria-labelledby="price-limit-title">
          <p className="pc-tools-overline">ВАЖНО</p>
          <h2 id="price-limit-title">Ограничения расчёта</h2>
          <p>Расчёт показывает изменение в соответствии с выбранным статистическим рядом и не определяет автоматически, какой показатель должен применяться в конкретной экспертизе, договоре или споре.</p>
          <Link href="/tools/okpd2">Не знаете код продукции? Найти ОКПД2 <ArrowUpRight aria-hidden="true" /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
