"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Это примут в суде?",
    answer:
      "Отчёт построен так, чтобы расчёт можно было проверить: раскрыты источники цен, нормы времени и формула рыночной ставки часа. Документ содержит QR-верификацию, hash и версию. Процессуальную оценку даёт суд, но расчёт сделан воспроизводимым и проверяемым.",
  },
  {
    question: "Можно проверить, откуда взялись цены?",
    answer:
      "Да. В отчёте фиксируются источники и диапазон цен. При нескольких источниках указывается метод агрегации (среднее/медиана) и перечень источников, чтобы эксперт или суд могли перепроверить данные.",
  },
  {
    question: "Как считается ставка часа?",
    answer:
      "Ставка рассчитывается по открытым данным рынка и раскрывается в отчёте. Учитываются обязательные начисления, коэффициент загрузки и плановая рентабельность. В документе показаны промежуточные значения и итоговая ставка.",
  },
  {
    question: "По какой методике считается расчёт?",
    answer:
      "Применяется метод восстановительной стоимости. Трудозатраты рассчитываются по A1 (аналитическая декомпозиция на подоперации) и A2 (экспертная оценка укрупнённых работ). Методика и допущения раскрываются в отчёте.",
  },
  {
    question: "Насколько актуальны цены?",
    answer:
      "В каждом отчёте фиксируется дата расчёта и список источников, чтобы подтвердить актуальность данных на момент формирования документа.",
  },
  {
    question: "Можно ли сразу приложить PDF к заключению?",
    answer:
      "Да. Формируется структурированный PDF для приложения к экспертному заключению: сводные итоги, детализация, методика, источники, расчёт ставки часа, а также QR, hash и версия для контроля неизменности.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            FAQ
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {faqItems.map((item, index) => (
            <article
              key={item.question}
              className="group rounded-2xl border border-border/60 bg-background p-6 sm:p-7 shadow-sm"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex((prev) => (prev === index ? -1 : index))
                }
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-base sm:text-lg font-semibold">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
