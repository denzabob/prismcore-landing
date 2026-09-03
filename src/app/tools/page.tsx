import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ToolsPageAnalytics } from "@/components/tools-page-analytics";

export const metadata: Metadata = {
  title: "Инструменты для экспертных расчётов — ПРИЗМА",
  description:
    "Бесплатные инструменты ПРИЗМЫ для расчётов по индексам Росстата и поиска кодов ОКПД2.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Инструменты для экспертных расчётов — ПРИЗМА",
    description:
      "Бесплатные инструменты для профессиональных расчётов, поиска данных и работы с источниками.",
    url: "https://prismcore.ru/tools",
    siteName: "ПРИЗМА",
    locale: "ru_RU",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Инструменты ПРИЗМЫ",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://prismcore.ru/tools",
  description: metadata.description,
};

const tools = [
  {
    number: "01",
    title: "Пересчёт стоимости",
    description: "Рассчитать изменение стоимости по официальным индексам Росстата.",
    href: "/tools/price-change",
    action: "Рассчитать",
  },
  {
    number: "02",
    title: "Поиск ОКПД2",
    description: "Найти код продукции по официальному классификатору.",
    href: "/tools/okpd2",
    action: "Найти код",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Header />
      <main className="pc-tools-page">
        <ToolsPageAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="pc-tools-hero" aria-labelledby="tools-title">
          <p className="pc-overline">PRISMCORE PUBLIC TOOLS</p>
          <h1 id="tools-title">Инструменты ПРИЗМЫ</h1>
          <p>Бесплатные инструменты для профессиональных расчётов, поиска данных и работы с источниками.</p>
        </section>
        <section className="pc-tools-card-grid" aria-label="Рабочие инструменты">
          {tools.map((tool) => (
            <article className="pc-tool-card" key={tool.number}>
              <span className="pc-tools-card-number">{tool.number}</span>
              <div>
                <p className="pc-tools-overline">РАБОЧИЙ ИНСТРУМЕНТ</p>
                <h2>{tool.title}</h2>
                <p>{tool.description}</p>
              </div>
              <Link className="pc-tools-card-link" href={tool.href}>
                {tool.action} <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </section>
        <p className="pc-tools-roadmap">Новые инструменты будут добавляться по мере развития ПРИЗМЫ.</p>
      </main>
      <Footer />
    </>
  );
}
