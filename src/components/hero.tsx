"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-transparent rounded-full blur-3xl dark:from-blue-500/10 dark:via-violet-500/5" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl dark:from-emerald-500/5" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Открыт набор на тестовый период
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Призма — сметный расчёт
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
            и доказательная база
          </span>
          <br />
          для эксперта
        </h1>

        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
          Структурируйте расчёты, формируйте прозрачные сметы
          и&nbsp;создавайте документы, пригодные для приложения к&nbsp;экспертному заключению.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#cta">
            <Button size="lg" className="text-base px-8 h-12">
              Получить тестовый доступ
            </Button>
          </a>
          <a href="#features">
            <Button variant="outline" size="lg" className="text-base px-8 h-12">
              Узнать больше
            </Button>
          </a>
        </div>

        <div className="mt-16 animate-bounce">
          <a href="#audience" className="inline-flex">
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  );
}
