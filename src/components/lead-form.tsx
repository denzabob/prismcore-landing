"use client";

import { useState } from "react";
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
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { ACTIVITIES, leadSchema, type LeadFormData } from "@/lib/validators";

type FormStatus = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    activity: "" as string,
    email: "",
    phone: "",
    comment: "",
    consent: false,
    website: "", // honeypot
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    // Client-side validation
    const result = leadSchema.safeParse(formData);
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Ошибка при отправке. Попробуйте позже.");
        setStatus("error");
        return;
      }

      setStatus("success");
      console.log("[Призма] Заявка успешно отправлена", data);

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          activity: "",
          email: "",
          phone: "",
          comment: "",
          consent: false,
          website: "",
        });
        setStatus("idle");
      }, 5000);
    } catch {
      setServerError("Ошибка сети. Проверьте подключение и попробуйте ещё раз.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="cta" className="py-24 sm:py-32">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
              <div className="rounded-full bg-emerald-500/10 p-4">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold">Заявка отправлена!</h3>
              <p className="text-muted-foreground">
                Мы свяжемся с вами в ближайшее время для предоставления тестового доступа.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="cta" className="py-24 sm:py-32">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Получить тестовый доступ
          </h2>
          <p className="text-muted-foreground text-lg">
            Заполните форму — мы свяжемся с вами и расскажем о&nbsp;возможностях.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot - hidden from humans */}
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">
                  Имя <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity">
                  Вид деятельности <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.activity}
                  onValueChange={(value) => updateField("activity", value)}
                >
                  <SelectTrigger
                    id="activity"
                    className={errors.activity ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACTIVITIES.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.activity && (
                  <p className="text-sm text-destructive">{errors.activity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Телефон <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Что хотите автоматизировать?</Label>
                <Textarea
                  id="comment"
                  placeholder="Расскажите о ваших задачах..."
                  value={formData.comment}
                  onChange={(e) => updateField("comment", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) =>
                    updateField("consent", checked === true)
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

              <Button
                type="submit"
                className="w-full h-11"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  "Отправить заявку"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                в&nbsp;соответствии с&nbsp;152-ФЗ.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
