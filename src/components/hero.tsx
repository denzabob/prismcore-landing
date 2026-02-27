"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, X } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const openLeadModal = (mode: "pdf" | "trial") => {
    window.dispatchEvent(new CustomEvent("openLeadModal", { detail: { mode } }));
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-transparent rounded-full blur-3xl dark:from-blue-500/10 dark:via-violet-500/5" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl dark:from-emerald-500/5" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Открыт набор на тестовый период
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl lg:text-6xl">
            Смета, которую сложно оспорить в суде
          </h1>

          <p className="mx-auto mb-4 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl lg:mx-0">
            Автоматически формируйте экономически и методически обоснованный расчёт стоимости устранения дефектов мебели — с раскрытием источников цен, норм времени и формулы рыночной ставки часа.
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-sm text-muted-foreground/90 sm:text-base lg:mx-0">
            PDF с QR-верификацией и hash. Готово для приложения к экспертному заключению.
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-xs text-muted-foreground sm:text-sm lg:mx-0">
            Формат отчёта разработан под требования судебной и досудебной экспертизы.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button
              type="button"
              size="lg"
              className="h-12 px-8 text-base"
              onClick={() => openLeadModal("pdf")}
            >
              Получить образец экспертной сметы (PDF)
            </Button>
            <a href="#evidence">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Посмотреть, как обосновывается ставка часа
              </Button>
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:mx-0">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="group w-full rounded-2xl border border-border/60 bg-card/80 p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            aria-label="Открыть PDF-превью сметы"
          >
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>smeta_11 (46)</span>
              <span>1 / 1</span>
            </div>
            <Image
              src="/previews/pdf-verification-page.svg"
              alt="Превью первой страницы PDF: проверка подлинности, QR и hash"
              width={960}
              height={620}
              className="h-auto w-full rounded-xl border border-border/60"
            />
            <p className="mt-3 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              Нажмите для встроенного просмотра PDF
            </p>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#audience" className="inline-flex">
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </a>
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-md border border-border bg-background/90 p-2 text-muted-foreground hover:text-foreground"
              aria-label="Закрыть просмотр"
            >
              <X className="h-4 w-4" />
            </button>
            <iframe
              title="PDF-превью сметы"
              src="/api/sample-estimate-pdf#toolbar=0&navpanes=0&scrollbar=0"
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
