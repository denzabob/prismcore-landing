import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Okpd2Search } from "@/components/okpd2-search";

export const metadata: Metadata = {
  title: "Поиск кода ОКПД2 — ПРИЗМА",
  description:
    "Поиск по официальному классификатору ОКПД2 по коду или названию продукции.",
  alternates: { canonical: "/tools/okpd2" },
  openGraph: {
    title: "Поиск кода ОКПД2 — ПРИЗМА",
    description:
      "Найдите код продукции по официальному классификатору и проверьте связанный индекс цен.",
    url: "https://prismcore.ru/tools/okpd2",
    siteName: "ПРИЗМА",
    locale: "ru_RU",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Поиск кода ОКПД2",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://prismcore.ru/tools/okpd2",
  description: metadata.description,
};

export default function Okpd2Page() {
  return (
    <>
      <Header />
      <main className="pc-tools-page pc-tools-page--okpd2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="pc-tools-hero" aria-labelledby="okpd2-title">
          <p className="pc-overline">ОФИЦИАЛЬНЫЙ КЛАССИФИКАТОР</p>
          <h1 id="okpd2-title">Найти код ОКПД2</h1>
          <p>Поиск по официальному классификатору по коду или названию продукции.</p>
        </section>
        <Okpd2Search />
      </main>
      <Footer />
    </>
  );
}
