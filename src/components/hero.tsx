"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, X } from "lucide-react";

export function Hero() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const documentPreviewPdfSrc = "/api/sample-estimate-pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH";

  const openLeadModal = (mode: "pdf" | "trial") => {
    window.dispatchEvent(new CustomEvent("openLeadModal", { detail: { mode } }));
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden px-0 pb-12 pt-20 sm:min-h-[90vh] sm:pb-16 sm:pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-transparent rounded-full blur-3xl dark:from-blue-500/10 dark:via-violet-500/5" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl dark:from-emerald-500/5" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:gap-12 sm:px-6">
        <div className="min-w-0 text-center">
          <div className="mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-center text-xs text-muted-foreground sm:text-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="break-words">Открыт набор на тестовый период</span>
          </div>

          <h1 className="mt-3 mb-6 break-words bg-gradient-to-r from-slate-950 via-blue-700 to-cyan-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent leading-[1.1] dark:from-white dark:via-blue-300 dark:to-cyan-300 sm:mt-4 sm:text-5xl lg:text-6xl">
            Смета, которую сложно оспорить в суде
          </h1>

          <p className="mx-auto mb-4 max-w-2xl break-words text-base text-muted-foreground leading-relaxed sm:text-xl">
            Автоматически формируйте экономически и методически обоснованный расчёт стоимости устранения дефектов мебели — с раскрытием источников цен, норм времени и формулы рыночной ставки часа.
          </p>
          <p className="mx-auto mb-6 max-w-2xl break-words text-sm text-muted-foreground/90 sm:text-base">
            PDF с QR-верификацией и hash. Готово для приложения к экспертному заключению.
          </p>
          <p className="mx-auto mb-8 max-w-2xl break-words text-xs text-muted-foreground sm:text-sm">
            Формат отчёта разработан под требования судебной и досудебной экспертизы.
          </p>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button
              type="button"
              size="lg"
              className="h-auto w-full max-w-sm whitespace-normal px-6 py-3 text-center text-sm sm:w-auto sm:text-base"
              onClick={() => openLeadModal("pdf")}
            >
              Получить образец экспертной сметы (PDF)
            </Button>
            <a href="#evidence" className="w-full max-w-sm sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="h-auto w-full whitespace-normal px-6 py-3 text-center text-sm sm:text-base"
              >
                Посмотреть, как обосновывается ставка часа
              </Button>
            </a>
          </div>
        </div>

        <div className="w-full">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="group relative block w-full overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            aria-label="Открыть PDF-превью сметы"
          >
            <div className="flex items-center justify-between px-5 pb-3 pt-5 text-xs text-muted-foreground sm:px-6">
              <span>Превью документа</span>
              <span>1 / 1</span>
            </div>

            <div className="relative overflow-hidden rounded-[1.4rem] border-y border-border/60 bg-slate-100/70">
              <div className="relative aspect-[16/11] w-full bg-white">
                <iframe
                  title="Встроенное превью первой страницы PDF"
                  src={documentPreviewPdfSrc}
                  className="h-full w-full"
                />
              </div>
            </div>

            <p className="px-5 py-4 text-xs text-muted-foreground transition-colors group-hover:text-foreground sm:px-6">
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
              src={documentPreviewPdfSrc}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
