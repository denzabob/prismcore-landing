"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import {
  SPECIALIZATIONS,
  pdfLeadSchema,
  trialLeadSchema,
} from "@/lib/validators";

type FormStatus = "idle" | "loading" | "success" | "error";
type LeadMode = "pdf" | "trial";

const initialPdfData = {
  mode: "pdf" as const,
  email: "",
  specialization: "" as string,
  consent: false,
  website: "",
};

const initialTrialData = {
  mode: "trial" as const,
  email: "",
  specialization: "" as string,
  phone: "",
  comment: "",
  consent: false,
  website: "",
};

export function LeadForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<LeadMode>("pdf");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [pdfData, setPdfData] = useState(initialPdfData);
  const [trialData, setTrialData] = useState(initialTrialData);

  useEffect(() => {
    const onOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: LeadMode }>;
      const mode = customEvent.detail?.mode;
      if (mode === "pdf" || mode === "trial") {
        setActiveTab(mode);
      }
      setStatus("idle");
      setErrors({});
      setServerError("");
      setIsOpen(true);
    };

    window.addEventListener("openLeadModal", onOpenModal as EventListener);
    return () => {
      window.removeEventListener("openLeadModal", onOpenModal as EventListener);
    };
  }, []);

  const currentData = activeTab === "pdf" ? pdfData : trialData;

  const updatePdfField = (field: keyof typeof initialPdfData, value: string | boolean) => {
    setPdfData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updateTrialField = (
    field: keyof typeof initialTrialData,
    value: string | boolean,
  ) => {
    setTrialData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const switchTab = (mode: LeadMode) => {
    setActiveTab(mode);
    setErrors({});
    setServerError("");
    setStatus("idle");
  };

  const closeModal = () => {
    setIsOpen(false);
    setErrors({});
    setServerError("");
    setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const schema = activeTab === "pdf" ? pdfLeadSchema : trialLeadSchema;
    const data = activeTab === "pdf" ? pdfData : trialData;
    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0]?.toString();
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const dataResponse = await res.json();

      if (!res.ok) {
        setServerError(dataResponse.error || "Ошибка при отправке. Попробуйте позже.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("Ошибка сети. Проверьте подключение и попробуйте ещё раз.");
      setStatus("error");
    }
  };

  const resetAndClose = () => {
    setPdfData(initialPdfData);
    setTrialData(initialTrialData);
    closeModal();
  };

  return (
    <section id="cta" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 rounded-2xl border border-border/60 bg-muted/30 p-6">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">
            Что вы получите после заявки
          </h3>
          <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
            <li>✔ Образец экспертной сметы с раскрытой методикой</li>
            <li>✔ Расчёт рыночной ставки часа с формулой</li>
            <li>✔ Проверяемые источники цен</li>
            <li>✔ PDF с QR-верификацией</li>
            <li>✔ Доступ без обязательств</li>
          </ul>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8 text-center">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
              Выбор
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Получить образец и тестовый доступ
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Откройте форму в модальном окне и выберите нужный режим.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                type="button"
                className="h-11"
                onClick={() => {
                  setActiveTab("pdf");
                  setIsOpen(true);
                }}
              >
                Образец сметы (PDF)
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11"
                onClick={() => {
                  setActiveTab("trial");
                  setIsOpen(true);
                }}
              >
                Тестовый доступ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl border border-border bg-background"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Закрыть форму"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-border p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
                <button
                  type="button"
                  onClick={() => switchTab("pdf")}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === "pdf"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Образец сметы (PDF)
                </button>
                <button
                  type="button"
                  onClick={() => switchTab("trial")}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === "trial"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Тестовый доступ
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="rounded-full bg-emerald-500/10 p-4">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Готово</h3>
                  <p className="text-muted-foreground">Проверьте почту</p>
                  <Button type="button" onClick={resetAndClose}>
                    Закрыть
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div
                    className="absolute opacity-0 pointer-events-none"
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <Input
                      name="website"
                      value={currentData.website}
                      onChange={(e) =>
                        activeTab === "pdf"
                          ? updatePdfField("website", e.target.value)
                          : updateTrialField("website", e.target.value)
                      }
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={currentData.email}
                      onChange={(e) =>
                        activeTab === "pdf"
                          ? updatePdfField("email", e.target.value)
                          : updateTrialField("email", e.target.value)
                      }
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">
                      Специализация <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={currentData.specialization}
                      onValueChange={(value) =>
                        activeTab === "pdf"
                          ? updatePdfField("specialization", value)
                          : updateTrialField("specialization", value)
                      }
                    >
                      <SelectTrigger
                        id="specialization"
                        className={errors.specialization ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="z-[90]">
                        {SPECIALIZATIONS.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.specialization && (
                      <p className="text-sm text-destructive">{errors.specialization}</p>
                    )}
                  </div>

                  {activeTab === "trial" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          value={trialData.phone}
                          onChange={(e) => updateTrialField("phone", e.target.value)}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comment">Комментарий</Label>
                        <Textarea
                          id="comment"
                          placeholder="Расскажите о ваших задачах..."
                          value={trialData.comment}
                          onChange={(e) => updateTrialField("comment", e.target.value)}
                          rows={3}
                        />
                        {errors.comment && (
                          <p className="text-sm text-destructive">{errors.comment}</p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={currentData.consent}
                      onCheckedChange={(checked) =>
                        activeTab === "pdf"
                          ? updatePdfField("consent", checked === true)
                          : updateTrialField("consent", checked === true)
                      }
                      className={errors.consent ? "border-destructive" : ""}
                    />
                    <Label
                      htmlFor="consent"
                      className="text-sm leading-relaxed font-normal cursor-pointer"
                    >
                      Согласен на обработку персональных данных{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-destructive -mt-2">{errors.consent}</p>
                  )}

                  {serverError && (
                    <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {serverError}
                    </div>
                  )}

                  <Button type="submit" className="w-full h-11" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Отправка...
                      </>
                    ) : activeTab === "pdf" ? (
                      "Получить PDF"
                    ) : (
                      "Начать тестовый период"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                    в&nbsp;соответствии с&nbsp;152-ФЗ.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
