export interface IndexSeriesSearchItem {
  slug: string;
  family: "producer_prices" | "consumer_prices";
  family_label: string;
  title: string;
  code: string | null;
  unit: string;
  min_period: string;
  max_period: string;
  detail_url: string;
}

export interface IndexSeriesSearchResponse {
  items: IndexSeriesSearchItem[];
}

export interface IndexCalculationResponse {
  series: {
    slug: string;
    family: "producer_prices" | "consumer_prices";
    family_label: string;
    title: string;
    code: string | null;
    detail_url: string;
  };
  period: {
    start: string;
    end: string;
    months: number;
  };
  result: {
    factor: string;
    change_percent: string;
    amount: string | null;
    result_amount: string | null;
    delta_amount: string | null;
  };
  source: {
    publisher: string;
  };
}

export interface Okpd2PathItem {
  code: string;
  title: string;
}

export interface Okpd2SearchItem {
  code: string;
  title: string;
  level: number | null;
  path: Okpd2PathItem[];
  price_index: {
    available: boolean;
    title: string | null;
    url: string | null;
  };
}

export interface Okpd2SearchResponse {
  classifier: {
    name: string;
  };
  items: Okpd2SearchItem[];
}

export interface PublicToolsErrorResponse {
  error?: {
    code?: string;
    message?: string;
    details?: Record<string, string[]>;
  };
}
