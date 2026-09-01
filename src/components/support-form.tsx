"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendYandexMetrikaGoal } from "@/lib/analytics";

type FormStatus = "idle" | "loading" | "success" | "error";

interface SupportFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: SupportFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function SupportForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState<SupportFormData>(initialFormData);

  const updateField = (field: keyof SupportFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Укажите ваше имя";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Укажите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Укажите тему обращения";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Введите сообщение";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
     if (e) {
       e.preventDefault();
       e.stopPropagation();
     }
     setServerError("");

     if (!validate()) {
       return;
     }

     setStatus("loading");

     try {
       const res = await fetch("/api/support", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
       });

       if (!res.ok) {
         setServerError("Не удалось отправить сообщение. Попробуйте позже или свяжитесь с нами в Telegram.");
         setStatus("error");
         return;
       }

       sendYandexMetrikaGoal('support_submit_success');
       setStatus("success");
       setFormData(initialFormData);
      } catch {
        setServerError("Не удалось отправить сообщение. Попробуйте позже или свяжитесь с нами в Telegram.");
        setStatus("error");
      }
   };

  const handleReset = () => {
    setFormData(initialFormData);
    setStatus("idle");
    setErrors({});
    setServerError("");
  };

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
         {status === "success" ? (
           <div className="flex flex-col items-center gap-4 py-8 text-center">
             <div className="rounded-full bg-emerald-500/10 p-4">
               <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
             </div>
             <h3 className="text-2xl font-bold">Сообщение отправлено</h3>
             <p className="text-muted-foreground">
               Мы свяжемся с вами в ближайшее время.
             </p>
             <Button type="button" onClick={handleReset}>
               Отправить ещё
             </Button>
           </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="support-name">
                Имя <span className="text-destructive">*</span>
              </Label>
              <Input
                id="support-name"
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
              <Label htmlFor="support-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="support-email"
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
              <Label htmlFor="support-subject">
                Тема <span className="text-destructive">*</span>
              </Label>
              <Input
                id="support-subject"
                placeholder="Тема обращения"
                value={formData.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                className={errors.subject ? "border-destructive" : ""}
              />
              {errors.subject && (
                <p className="text-sm text-destructive">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-message">
                Сообщение <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="support-message"
                placeholder="Опишите вашу проблему или вопрос..."
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={6}
                className={errors.message ? "border-destructive" : ""}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message}</p>
              )}
            </div>

            {serverError && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {serverError}
              </div>
            )}

            <Button type="button" className="w-full h-11" disabled={status === "loading"} onClick={() => handleSubmit()}>
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
