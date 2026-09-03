"use client";

import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { EstimatePreview } from "@/components/estimate-preview";
import { handleYandexMetrikaClick } from "@/lib/analytics";

const estimateBenefits = [
  ["01", "Рыночные цены", "Ценовые предложения для обоснования стоимости."],
  ["02", "Материалы и работы", "Раздельный структурированный расчёт."],
  ["03", "Проверяемые источники", "Данные, на которых основан расчёт."],
  ["04", "Прозрачная структура", "Исходные данные остаются частью результата."],
];

const sources = [
  {
    number: "01",
    name: "ЛДСП влагостойкая, 16 мм",
    type: "Товарное предложение",
    date: "12.06.2026",
    price: "18 400 ₽",
  },
  {
    number: "02",
    name: "Кромка ПВХ, 2 мм",
    type: "Поставщик / источник",
    date: "10.06.2026",
    price: "6 800 ₽",
  },
  {
    number: "03",
    name: "Монтаж мебели, нормо-час",
    type: "Исполнитель работ",
    date: "14.06.2026",
    price: "3 950 ₽",
  },
];

export function PlatformIntro() {
  return (
    <section className="pc-platform" id="capabilities">
      <p className="pc-overline">ПОДХОД ПРИЗМЫ</p>
      <div>
        <h2>Расчёты, источники и результат — в одной рабочей среде.</h2>
        <p>
          Призма помогает эксперту сохранить основание результата и пройти
          путь от исходных данных до проверяемого расчёта.
        </p>
      </div>
    </section>
  );
}

export function ExpertEstimate() {
  return (
    <section className="pc-estimate-feature" id="estimate">
      <div className="pc-section-heading">
        <div>
          <p className="pc-overline">ПРИЗМА / ЭКСПЕРТНАЯ СМЕТА</p>
          <h2>Рабочая среда для расчёта стоимости и профессионального результата</h2>
        </div>
        <p>
          Материалы, работы и рыночные цены собираются в структурированный
          расчёт с раскрытием исходных данных.
        </p>
      </div>

      <EstimatePreview compact />

      <div className="pc-benefit-grid">
        {estimateBenefits.map(([number, title, description]) => (
          <article key={number}>
            <b>{number}</b>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MarketSources() {
  return (
    <section className="pc-sources" id="sources">
      <div className="pc-source-copy">
        <p className="pc-overline">ОСНОВАНИЕ РЕЗУЛЬТАТА</p>
        <h2>У результата есть источник</h2>
        <p>
          Сохраняйте структуру расчёта и данные, на которых он основан.
        </p>
      </div>

      <div className="pc-sources-ui">
        <div className="pc-source-head">
          <span>Рыночные предложения</span>
          <b>3 источника</b>
        </div>
        {sources.map((source) => (
          <article className="pc-source-row" key={source.number}>
            <b>{source.number}</b>
            <div>
              <strong>{source.name}</strong>
              <span>
                {source.type} · {source.date}
              </span>
            </div>
            <em>{source.price}</em>
            <i>
              <Check aria-hidden="true" /> Проверено
            </i>
          </article>
        ))}
        <div className="pc-source-flow" aria-hidden="true">
          <span>Источники</span>
          <ArrowDown />
          <span>Расчётная стоимость</span>
        </div>
        <div className="pc-source-total">
          Расчётная стоимость <strong>287 400 ₽</strong>
        </div>
      </div>
    </section>
  );
}

export function ResultSection() {
  return (
    <section className="pc-result" id="result">
      <div className="pc-result-copy">
        <p className="pc-overline">РЕЗУЛЬТАТ РАСЧЁТА</p>
        <h2>Стоимость устранения недостатков</h2>
        <strong className="pc-big-price">438 420 ₽</strong>
        <div className="pc-price-breakdown">
          <p>
            Материалы <b>287 400 ₽</b>
          </p>
          <p>
            Работы <b>126 020 ₽</b>
          </p>
          <p>
            Прочие расходы <b>25 000 ₽</b>
          </p>
        </div>
      </div>

      <div className="pc-report-wrap">
        <div className="pc-report-sheet" aria-label="Пример страницы отчёта">
          <div className="pc-report-logo">
            <BrandMark /> ПРИЗМА
          </div>
          <p>ЭКСПЕРТНОЕ ИССЛЕДОВАНИЕ</p>
          <h3>Расчёт стоимости устранения недостатков</h3>
          <span>
            Проект: #2-5437/2025
            <br />
            Объект: Кухонный гарнитур
          </span>
          <div className="pc-report-line" />
          <b>ИТОГОВАЯ СТОИМОСТЬ</b>
          <strong>438 420 ₽</strong>
          <small>Сформировано в PrismCore</small>
        </div>
         <a
           className="pc-report-link"
           href="/api/sample-estimate-pdf"
           target="_blank"
           rel="noreferrer"
           onClick={handleYandexMetrikaClick('sample_pdf_open')}
         >
           Открыть пример PDF <ArrowUpRight aria-hidden="true" />
         </a>
      </div>
    </section>
  );
}
