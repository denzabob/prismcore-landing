import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const tools = [
  {
    number: "01",
    title: "Пересчёт стоимости",
    description: "Рассчитать изменение стоимости по официальным индексам Росстата.",
    href: "/tools/price-change",
    action: "Рассчитать",
  },
  {
    number: "02",
    title: "Поиск ОКПД2",
    description: "Найти код продукции по официальному классификатору.",
    href: "/tools/okpd2",
    action: "Найти код",
  },
];

export function PublicToolsTeaser() {
  return (
    <section className="pc-tools-teaser" aria-labelledby="public-tools-teaser-title">
      <div className="pc-tools-teaser-heading">
        <div>
          <p className="pc-overline">ПУБЛИЧНЫЕ ИНСТРУМЕНТЫ</p>
          <h2 id="public-tools-teaser-title">Инструменты ПРИЗМЫ</h2>
        </div>
        <p>Быстрые расчёты и поиск по официальным данным — без регистрации.</p>
      </div>
      <div className="pc-tools-teaser-grid">
        {tools.map((tool) => (
          <article key={tool.number}>
            <span>{tool.number}</span>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            <Link href={tool.href}>
              {tool.action} <ArrowUpRight aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
      <Link className="pc-tools-teaser-all" href="/tools">
        Все инструменты <ArrowUpRight aria-hidden="true" />
      </Link>
    </section>
  );
}
