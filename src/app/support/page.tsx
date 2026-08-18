import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SupportForm } from "@/components/support-form";

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
        </div>
      </main>
      <Footer />
    </>
  );
}
