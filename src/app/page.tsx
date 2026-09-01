import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";
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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PlatformIntro />
        <ExpertEstimate />
        <MarketSources />
        <ResultSection />
        <IndicesSection />
        <WorkflowSection />
        <TrustSection />
        <EcosystemSection />
        <BrandStatement />
        <FinalCta />
        <LeadForm showSection={false} />
      </main>
      <Footer />
    </>
  );
}
