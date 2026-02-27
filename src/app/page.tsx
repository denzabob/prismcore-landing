import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CourtEvidence } from "@/components/court-evidence";
import { Methodology } from "@/components/methodology";
import { CourtMarkers } from "@/components/court-markers";
import { Faq } from "@/components/faq";
import { Audience } from "@/components/audience";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { WhereUsed } from "@/components/where-used";
import { Trust } from "@/components/trust";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CourtEvidence />
        <Methodology />
        <CourtMarkers />
        <Audience />
        <Features />
        <HowItWorks />
        <WhereUsed />
        <Trust />
        <LeadForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
