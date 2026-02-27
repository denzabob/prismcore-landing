import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Audience } from "@/components/audience";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Trust } from "@/components/trust";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Audience />
        <Features />
        <HowItWorks />
        <Trust />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
