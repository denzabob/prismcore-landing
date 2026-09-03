"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Clipboard, Check, LoaderCircle } from "lucide-react";
import { sendYandexMetrikaGoal } from "@/lib/analytics";
import { publicToolsErrorMessage } from "@/lib/public-tools-client";
import type {
  Okpd2SearchItem,
  Okpd2SearchResponse,
} from "@/lib/public-tools-types";

const unavailableMessage =
  "Сервис данных временно недоступен. Попробуйте ещё раз.";

export function Okpd2Search() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Okpd2SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (normalizedQuery.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ q: normalizedQuery, limit: "20" });
        const response = await fetch(`/api/tools/okpd2/search?${params.toString()}`, {
          signal: controller.signal,
        });
        const payload = (await response.json()) as Okpd2SearchResponse | unknown;
        if (!response.ok) {
          throw new Error(publicToolsErrorMessage(payload, unavailableMessage));
        }
        const result = payload as Okpd2SearchResponse;
        setItems(result.items ?? []);
        sendYandexMetrikaGoal("tool_okpd2_search", {
          tool: "okpd2",
          result_count: result.items?.length ?? 0,
        });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }
        setItems([]);
        setError(requestError instanceof Error ? requestError.message : unavailableMessage);
      } finally {
        setLoading(false);
      }
    }, 320);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  function handleQueryChange(value: string) {
    const normalizedValue = value.trim();
    setQuery(value);
    setItems([]);
    setError(null);
    setLoading(normalizedValue.length >= 2);
  }

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  async function copyCode(code: string) {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copied = document.execCommand("copy");
      textarea.remove();
    }

    if (copied) {
      setCopiedCode(code);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopiedCode(null), 1800);
    }
  }

  return (
    <section className="pc-okpd2-tool" aria-label="Результаты поиска ОКПД2">
      <div className="pc-tools-field">
        <label htmlFor="okpd2-search">Код или название продукции</label>
        <input
          id="okpd2-search"
          type="search"
          value={query}
          placeholder="Например, кухонная мебель или 31.02.10"
          onChange={(event) => handleQueryChange(event.target.value)}
        />
        <p className="pc-tools-field-help">
          Поиск по официальному классификатору ОКПД2. Введите от двух символов.
        </p>
      </div>

      <div className="pc-okpd2-results" aria-live="polite">
        {loading && (
          <p className="pc-tools-search-status" role="status">
            <LoaderCircle className="pc-tools-spin" aria-hidden="true" />
            Ищем в классификаторе…
          </p>
        )}
        {!loading && error && <p className="pc-tools-inline-error" role="alert">{error}</p>}
        {!loading && !error && query.trim().length >= 2 && items.length === 0 && (
          <p className="pc-tools-search-status">Ничего не найдено. Попробуйте изменить запрос.</p>
        )}
        {!loading && !error && items.length > 0 && (
          <div className="pc-okpd2-result-list">
            {items.map((item) => (
              <article className="pc-okpd2-result-card" key={item.code}>
                <div className="pc-okpd2-result-heading">
                  <div>
                    <span className="pc-tools-code">{item.code}</span>
                    <h2>{item.title}</h2>
                  </div>
                  <button type="button" className="pc-tools-copy-button" onClick={() => void copyCode(item.code)}>
                    {copiedCode === item.code ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
                    {copiedCode === item.code ? "Код скопирован" : "Скопировать код"}
                  </button>
                </div>
                {item.path.length > 1 && (
                  <p className="pc-okpd2-path">
                    {item.path.slice(0, -1).map((pathItem) => pathItem.title).join(" → ")}
                  </p>
                )}
                {item.price_index.available && item.price_index.url ? (
                  <a
                    className="pc-okpd2-index-link"
                    href={item.price_index.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      sendYandexMetrikaGoal("tool_okpd2_result_open", {
                        tool: "okpd2",
                        has_linked_index: true,
                      });
                      sendYandexMetrikaGoal("tool_indices_open", { tool: "okpd2" });
                    }}
                  >
                    Есть индекс цен · Посмотреть динамику цен <ArrowUpRight aria-hidden="true" />
                  </a>
                ) : (
                  <p className="pc-okpd2-no-index">Связанный публичный ряд ПРИЗМА Индексы пока не найден.</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
