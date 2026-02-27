"use client";

import {
  FileText,
  QrCode,
  ShoppingCart,
  Clock,
  ListTree,
  SlidersHorizontal,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "PDF-отчёты",
    description:
      "Автоматическое формирование сметной документации в формате PDF, готовой для приложения к заключению.",
  },
  {
    icon: QrCode,
    title: "Верификация и QR-код",
    description:
      "Каждый документ содержит QR-код для быстрой проверки подлинности и целостности расчётов.",
  },
  {
    icon: ShoppingCart,
    title: "Поставщики и цены",
    description:
      "Актуальная база поставщиков и рыночных цен для объективного обоснования стоимости материалов.",
  },
  {
    icon: Clock,
    title: "Операции и нормо-часы",
    description:
      "Справочник нормативных трудозатрат для точного расчёта стоимости работ.",
  },
  {
    icon: ListTree,
    title: "Структурирование сметы",
    description:
      "Разделение расчётов на логические блоки: демонтаж, материалы, работы, сопутствующие расходы.",
  },
  {
    icon: SlidersHorizontal,
    title: "Контроль коэффициентов",
    description:
      "Настройка региональных, сезонных и прочих поправочных коэффициентов для корректного расчёта.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Что внутри
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Инструменты, которые помогают обосновать каждую строку сметы.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-4"
            >
              <div className="shrink-0 mt-1">
                <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
