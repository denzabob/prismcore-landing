"use client";

import {
  CheckCircle2,
  SearchCheck,
  MessageSquareWarning,
  Scale,
} from "lucide-react";

const features = [
  {
    icon: SearchCheck,
    title: "Нет нужды вручную собирать цены и источники",
    description:
      "Система подтягивает источники, фиксирует диапазоны цен и сохраняет их в составе расчёта.",
  },
  {
    icon: CheckCircle2,
    title: "Отчёт можно воспроизвести шаг за шагом",
    description:
      "Каждая цифра в смете привязана к формуле, норме времени и источнику, поэтому расчёт проверяется без догадок.",
  },
  {
    icon: MessageSquareWarning,
    title: "Меньше замечаний от экспертов и заказчиков",
    description:
      "Прозрачная структура отчёта снижает количество вопросов по методике, ставкам и входным данным.",
  },
  {
    icon: Scale,
    title: "Меньше ручных правок и судебных проволочек",
    description:
      "Если расчёт уже собран по стандарту, правки вносятся быстрее, а позицию проще защищать в споре.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Как Призма решает эти боли
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Не набор функций, а конкретный результат для эксперта, юриста и заказчика.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border/50 bg-background p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Результат {index + 1}
                </span>
                <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
