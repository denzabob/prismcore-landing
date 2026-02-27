"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Scale, Gavel, BarChart3 } from "lucide-react";

const audiences = [
  {
    icon: Scale,
    title: "Эксперт",
    description:
      "Формирование смет для экспертных заключений с прозрачной методологией расчёта.",
  },
  {
    icon: Gavel,
    title: "Юрист",
    description:
      "Обоснование стоимости работ и материалов в судебных и досудебных процессах.",
  },
  {
    icon: BarChart3,
    title: "Оценщик",
    description:
      "Структурированные расчёты стоимости восстановительного ремонта и строительства.",
  },
];

export function Audience() {
  return (
    <section id="audience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Кому подходит
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Призма создана для специалистов, которым важна точность и&nbsp;обоснованность сметных расчётов.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((item) => (
            <Card
              key={item.title}
              className="group relative overflow-hidden border-border/50 hover:border-border hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-xl bg-muted p-3 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
