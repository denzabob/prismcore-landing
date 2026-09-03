"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, LoaderCircle } from "lucide-react";
import { sendYandexMetrikaGoal } from "@/lib/analytics";
import {
  formatDecimal,
  formatPeriod,
  formatRubles,
  formatSignedPercent,
  monthValue,
  periodOptions,
  publicToolsErrorMessage,
} from "@/lib/public-tools-client";
import type {
  IndexCalculationResponse,
  IndexSeriesSearchItem,
  IndexSeriesSearchResponse,
} from "@/lib/public-tools-types";

const emptySearchError = "Сервис данных временно недоступен. Попробуйте ещё раз.";

export function PriceChangeCalculator() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<IndexSeriesSearchItem[]>([]);
  const [selectedSeries, setSelectedSeries] =
    useState<IndexSeriesSearchItem | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [startPeriod, setStartPeriod] = useState("");
  const [endPeriod, setEndPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [calculation, setCalculation] =
    useState<IndexCalculationResponse | null>(null);
  const [calculationLoading, setCalculationLoading] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [periodError, setPeriodError] = useState<string | null>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const options = useMemo(
    () =>
      selectedSeries
        ? periodOptions(selectedSeries.min_period, selectedSeries.max_period)
        : [],
    [selectedSeries],
  );

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (selectedSeries?.title === query || normalizedQuery.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      setSearchError(null);
      setSearchOpen(true);
      setHighlightedIndex(-1);

      try {
        const params = new URLSearchParams({ q: normalizedQuery, limit: "10" });
        const response = await fetch(
          `/api/tools/index-series/search?${params.toString()}`,
          { signal: controller.signal },
        );
        const payload = (await response.json()) as
          | IndexSeriesSearchResponse
          | unknown;
        if (!response.ok) {
          throw new Error(publicToolsErrorMessage(payload, emptySearchError));
        }

        const result = payload as IndexSeriesSearchResponse;
        setItems(result.items ?? []);
        sendYandexMetrikaGoal("tool_price_series_search", {
          tool: "price-change",
          result_count: result.items?.length ?? 0,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setItems([]);
        setSearchError(error instanceof Error ? error.message : emptySearchError);
      } finally {
        setSearchLoading(false);
      }
    }, 320);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, selectedSeries]);

  useEffect(() => {
    return () => {
      if (blurTimer.current) {
        clearTimeout(blurTimer.current);
      }
    };
  }, []);

  function selectSeries(series: IndexSeriesSearchItem) {
    setSelectedSeries(series);
    setQuery(series.title);
    setItems([]);
    setSearchOpen(false);
    setHighlightedIndex(-1);
    setStartPeriod(series.min_period);
    setEndPeriod(series.max_period);
    setCalculation(null);
    setCalculationError(null);
    setPeriodError(null);
    sendYandexMetrikaGoal("tool_price_series_select", {
      tool: "price-change",
      family: series.family,
      series: series.slug,
    });
  }

  function handleQueryChange(value: string) {
    const normalizedValue = value.trim();
    setQuery(value);
    setSelectedSeries(null);
    setItems([]);
    setSearchError(null);
    setSearchLoading(normalizedValue.length >= 2);
    setCalculation(null);
    setCalculationError(null);
    setSearchOpen(normalizedValue.length >= 2);
    setHighlightedIndex(-1);
  }

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && items.length > 0) {
      event.preventDefault();
      setSearchOpen(true);
      setHighlightedIndex((current) => (current + 1) % items.length);
    }
    if (event.key === "ArrowUp" && items.length > 0) {
      event.preventDefault();
      setHighlightedIndex((current) =>
        current <= 0 ? items.length - 1 : current - 1,
      );
    }
    if (event.key === "Enter" && searchOpen) {
      const item = items[highlightedIndex] ?? items[0];
      if (item) {
        event.preventDefault();
        selectSeries(item);
      }
    }
    if (event.key === "Escape") {
      setSearchOpen(false);
      setHighlightedIndex(-1);
    }
  }

  function normalizeAmount(value: string): string | null {
    const normalized = value
      .trim()
      .replace(/[\s\u00a0\u202f]/g, "")
      .replace(",", ".");
    return /^\d+(?:\.\d{1,2})?$/.test(normalized) ? normalized : null;
  }

  async function calculate() {
    if (!selectedSeries) {
      setCalculationError("Сначала выберите статистический ряд.");
      return;
    }
    if (monthValue(endPeriod) <= monthValue(startPeriod)) {
      setPeriodError("Конечный месяц должен быть позже начального.");
      return;
    }
    setPeriodError(null);

    const normalizedAmount = amount.trim() ? normalizeAmount(amount) : null;
    if (amount.trim() && normalizedAmount === null) {
      setCalculationError("Введите сумму числом: например, 100 000,50.");
      return;
    }

    setCalculationLoading(true);
    setCalculationError(null);
    setCalculation(null);
    sendYandexMetrikaGoal("tool_price_calculate", {
      tool: "price-change",
      family: selectedSeries.family,
      series: selectedSeries.slug,
      period_length: monthValue(endPeriod) - monthValue(startPeriod),
      has_amount: Boolean(normalizedAmount),
    });

    try {
      const response = await fetch("/api/tools/index-series/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          family: selectedSeries.family,
          slug: selectedSeries.slug,
          start_period: startPeriod,
          end_period: endPeriod,
          amount: normalizedAmount,
        }),
      });
      const payload = (await response.json()) as
        | IndexCalculationResponse
        | unknown;
      if (!response.ok) {
        throw new Error(
          publicToolsErrorMessage(
            payload,
            "Для выбранного периода недостаточно опубликованных данных.",
          ),
        );
      }
      const result = payload as IndexCalculationResponse;
      setCalculation(result);
      sendYandexMetrikaGoal("tool_price_calculate_success", {
        tool: "price-change",
        family: result.series.family,
        series: result.series.slug,
        period_length: result.period.months,
        has_amount: result.result.amount !== null,
      });
    } catch (error) {
      setCalculationError(
        error instanceof Error
          ? error.message
          : "Сервис данных временно недоступен. Попробуйте ещё раз.",
      );
    } finally {
      setCalculationLoading(false);
    }
  }

  const activeDescendant =
    highlightedIndex >= 0 ? `series-option-${highlightedIndex}` : undefined;

  return (
    <div className="pc-tools-calculator-layout">
      <form
        className="pc-tools-calculator"
        onSubmit={(event) => {
          event.preventDefault();
          void calculate();
        }}
      >
        <div className="pc-tools-form-heading">
          <span className="pc-tools-step">01</span>
          <div>
            <h2>Что пересчитываем?</h2>
            <p>Выберите опубликованный месячный статистический ряд.</p>
          </div>
        </div>

        <div className="pc-tools-field pc-tools-series-field">
          <label htmlFor="price-series-search">Что пересчитываем?</label>
          <div className="pc-tools-combobox">
            <input
              id="price-series-search"
              role="combobox"
              type="search"
              value={query}
              placeholder="Кухонная мебель, услуги, непродовольственные товары..."
              aria-autocomplete="list"
              aria-controls="price-series-listbox"
              aria-expanded={searchOpen}
              aria-activedescendant={activeDescendant}
              onChange={(event) => handleQueryChange(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => {
                if (items.length > 0) setSearchOpen(true);
              }}
              onBlur={() => {
                blurTimer.current = setTimeout(() => setSearchOpen(false), 120);
              }}
            />
            <ChevronDown aria-hidden="true" />
            {searchOpen && (
              <div className="pc-tools-search-popover">
                {searchLoading && (
                  <p className="pc-tools-search-status" role="status">
                    <LoaderCircle className="pc-tools-spin" aria-hidden="true" />
                    Ищем ряд…
                  </p>
                )}
                {!searchLoading && searchError && (
                  <p className="pc-tools-search-status pc-tools-search-status--error" role="alert">
                    {searchError}
                  </p>
                )}
                {!searchLoading && !searchError && items.length === 0 && (
                  <p className="pc-tools-search-status">
                    Ничего не найдено. Попробуйте изменить запрос.
                  </p>
                )}
                {!searchLoading && !searchError && items.length > 0 && (
                  <ul id="price-series-listbox" role="listbox">
                    {items.map((item, index) => (
                      <li key={`${item.family}-${item.slug}`}>
                        <button
                          id={`series-option-${index}`}
                          type="button"
                          role="option"
                          aria-selected={highlightedIndex === index}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => selectSeries(item)}
                          className={highlightedIndex === index ? "is-highlighted" : ""}
                        >
                          <strong>{item.title}</strong>
                          <span>{item.family_label}</span>
                          {item.code && <small>ОКПД2 {item.code}</small>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <p className="pc-tools-field-help">
            Доступны индексы цен производителей и индекс потребительских цен.
          </p>
        </div>

        {selectedSeries && (
          <>
            <div className="pc-tools-selected-series">
              <span>Выбранный ряд</span>
              <strong>{selectedSeries.title}</strong>
              <small>
                {selectedSeries.family_label}
                {selectedSeries.code ? ` · ОКПД2 ${selectedSeries.code}` : ""}
              </small>
            </div>

            <div className="pc-tools-period-grid">
              <div className="pc-tools-field">
                <label htmlFor="price-start-period">С</label>
                <select
                  id="price-start-period"
                  value={startPeriod}
                  onChange={(event) => setStartPeriod(event.target.value)}
                >
                  {options.map((period) => (
                    <option key={period} value={period}>
                      {formatPeriod(period)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pc-tools-field">
                <label htmlFor="price-end-period">По</label>
                <select
                  id="price-end-period"
                  value={endPeriod}
                  onChange={(event) => setEndPeriod(event.target.value)}
                >
                  {options.map((period) => (
                    <option key={period} value={period}>
                      {formatPeriod(period)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {periodError && <p className="pc-tools-validation-error">{periodError}</p>}

            <div className="pc-tools-field">
              <label htmlFor="price-amount">Исходная стоимость, ₽ <span>необязательно</span></label>
              <input
                id="price-amount"
                inputMode="decimal"
                value={amount}
                placeholder="100 000"
                onChange={(event) => setAmount(event.target.value)}
              />
              <p className="pc-tools-field-help">Можно использовать пробел и запятую в копейках.</p>
            </div>

            <button className="pc-tools-primary-button" type="submit" disabled={calculationLoading || options.length < 2}>
              {calculationLoading && <LoaderCircle className="pc-tools-spin" aria-hidden="true" />}
              {calculationLoading ? "Рассчитываем…" : "Рассчитать"}
            </button>
          </>
        )}

        {!selectedSeries && (
          <button className="pc-tools-primary-button" type="submit" disabled>
            Рассчитать
          </button>
        )}
        {calculationError && <p className="pc-tools-validation-error" role="alert">{calculationError}</p>}
      </form>

      <aside className="pc-tools-side-note">
        <span className="pc-tools-overline">ОБЫЧНЫЙ РАСЧЁТ</span>
        <p>Сначала выберите ряд, затем месяц начала и месяц окончания.</p>
        <div className="pc-tools-side-note-line" aria-hidden="true"><i /><i /><i /></div>
        <p>Без регистрации и без копирования данных в отдельную базу.</p>
      </aside>

      {calculation && (
        <section className="pc-tools-result" aria-live="polite" aria-labelledby="price-result-title">
          <div className="pc-tools-result-header">
            <span className="pc-tools-overline">РЕЗУЛЬТАТ</span>
            <h2 id="price-result-title">Изменение за период</h2>
            <strong className="pc-tools-result-percent">{formatSignedPercent(calculation.result.change_percent)}</strong>
            <p>{formatPeriod(calculation.period.start)} — {formatPeriod(calculation.period.end)}</p>
          </div>
          <dl className="pc-tools-result-details">
            <div><dt>Коэффициент</dt><dd>{formatDecimal(calculation.result.factor, 4)}</dd></div>
            {calculation.result.amount !== null && (
              <>
                <div><dt>Исходная стоимость</dt><dd>{formatRubles(calculation.result.amount)}</dd></div>
                <div><dt>Расчётная стоимость</dt><dd>{formatRubles(calculation.result.result_amount ?? "0")}</dd></div>
                <div><dt>Разница</dt><dd>{formatRubles(calculation.result.delta_amount ?? "0")}</dd></div>
              </>
            )}
          </dl>
          <div className="pc-tools-provenance">
            <p>Расчёт выполнен по:</p>
            <strong>{calculation.series.title}</strong>
            {calculation.series.code && <span>ОКПД2 {calculation.series.code}</span>}
            <span>Источник данных: {calculation.source.publisher}</span>
          </div>
          <div className="pc-tools-result-actions">
            <a
              href={calculation.series.detail_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendYandexMetrikaGoal("tool_indices_open", { tool: "price-change", family: calculation.series.family, series: calculation.series.slug })}
            >
              Открыть полный ряд <ArrowUpRight aria-hidden="true" />
            </a>
            <Link href="/tools/okpd2" onClick={() => sendYandexMetrikaGoal("tool_okpd2_result_open", { tool: "price-change" })}>
              Не знаете код продукции? Найти ОКПД2 <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
