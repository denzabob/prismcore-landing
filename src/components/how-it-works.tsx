"use client";

import { Database, ListChecks, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Database,
    problem: "Нет единого списка цен, норм и исходников.",
    system: "Призма подтягивает данные, фиксирует источники и стандартизирует методику расчёта.",
    result: "Эксперт получает документ, понятный проверяющим и суду.",
  },
  {
    icon: ListChecks,
    problem: "Расчёт приходится пересчитывать и объяснять вручную.",
    system: "Система раскрывает формулы, норму времени и логику агрегации по каждой позиции.",
    result: "Эксперт получает воспроизводимый отчёт без ручной расшифровки каждой строки.",
  },
  {
    icon: ShieldCheck,
    problem: "Замечания затягивают дело и увеличивают число переделок.",
    system: "Призма формирует PDF с доказательной базой, QR-верификацией, hash и версией документа.",
    result: "Эксперт получает материал, который проще защищать в переписке, экспертизе и суде.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Как выглядит процесс в результате
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            От типовой проблемы к понятному для суда и заказчика результату.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <article
              key={step.problem}
              className="rounded-3xl border border-border/60 bg-background p-6 shadow-sm sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Сценарий {index + 1}
                </span>
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-3">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-2xl bg-muted/40 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Проблема
                  </p>
                  <p className="text-sm leading-relaxed">{step.problem}</p>
                </div>
                <div className="rounded-2xl bg-primary/5 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    Что делает система
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.system}</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/5 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    Что получает эксперт
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
