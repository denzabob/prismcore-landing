"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { EstimatePreview } from "@/components/estimate-preview";
import { handleYandexMetrikaClick } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="pc-hero" id="top">
      <div className="pc-hero-copy">
        <p className="pc-overline">
          PRISMCORE <span>·</span> PROFESSIONAL EXPERT SOFTWARE
        </p>
        <h1>
          Профессиональные инструменты <em>для</em>{" "}
          <span>экспертной работы</span>
        </h1>
        <p className="pc-hero-intro">
          Проводите расчёты, сохраняйте источники и получайте профессиональный
          результат, который можно проверить и воспроизвести.
        </p>
          <div className="pc-hero-actions">
            <a
              className="pc-button pc-button--primary"
              href="https://app.prismcore.ru"
              onClick={handleYandexMetrikaClick('app_open')}
            >
              Начать работу <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="pc-button pc-button--secondary" href="#products">
              Сервисы ПРИЗМЫ <ArrowRight aria-hidden="true" />
            </a>
          </div>
        <p className="pc-mvp-note">
          <span /> Два продукта уже доступны для профессиональной работы
        </p>
      </div>

      <div className="pc-hero-product">
        <div className="pc-product-label">
          РАБОЧАЯ СРЕДА <b>01</b>
        </div>
        <EstimatePreview />
      </div>
    </section>
  );
}
