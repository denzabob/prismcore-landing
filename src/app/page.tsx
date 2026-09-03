import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { PublicToolsTeaser } from "@/components/public-tools-teaser";
import {
  ExpertEstimate,
  MarketSources,
  PlatformIntro,
  ResultSection,
} from "@/components/landing-sections";
import {
  BrandStatement,
  EcosystemSection,
  FinalCta,
  IndicesSection,
  TrustSection,
  WorkflowSection,
} from "@/components/landing-lower-sections";

export const metadata: Metadata = {
  title: "Призма — профессиональные инструменты для экспертной работы",
  description:
    "Расчёты, проверяемые источники и профессиональный результат в единой рабочей среде ПРИЗМЫ.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Призма — профессиональные инструменты для экспертной работы",
    description:
      "Расчёты, проверяемые источники и профессиональный результат в единой рабочей среде.",
    url: "https://prismcore.ru/",
    siteName: "Призма",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Призма — профессиональные инструменты для экспертной работы",
      },
    ],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://prismcore.ru/#organization",
      name: "Призма",
      url: "https://prismcore.ru/",
      logo: "https://prismcore.ru/favicon.svg",
      sameAs: ["https://indices.prismcore.ru/"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://prismcore.ru/#software",
      name: "ПРИЗМА",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://app.prismcore.ru/",
      publisher: { "@id": "https://prismcore.ru/#organization" },
      description: "Рабочая среда для экспертных расчётов, источников и подготовки профессионального результата.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Hero />
        <EcosystemSection />
        <PublicToolsTeaser />
        <PlatformIntro />
        <ExpertEstimate />
        <MarketSources />
        <ResultSection />
        <IndicesSection />
        <WorkflowSection />
        <TrustSection />
        <BrandStatement />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
