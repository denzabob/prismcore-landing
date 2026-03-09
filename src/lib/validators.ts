import { z } from "zod";

export const SPECIALIZATIONS = [
  "Судебный эксперт",
  "Юрист",
  "Оценщик",
  "Другое",
] as const;

const emailSchema = z.string().email("Введите корректный email");

const specializationSchema = z.enum(SPECIALIZATIONS, {
  error: "Выберите специализацию",
});

const consentSchema = z.literal(true, {
  error: "Необходимо согласие на обработку персональных данных",
});

const honeypotSchema = z.string().max(0).optional();

export const pdfLeadSchema = z.object({
  mode: z.literal("pdf"),
  specialization: specializationSchema,
  email: emailSchema,
  consent: consentSchema,
  website: honeypotSchema,
});

export const trialLeadSchema = z.object({
  mode: z.literal("trial"),
  specialization: specializationSchema,
  email: z.string().email("Введите корректный email"),
  phone: z
    .string()
    .refine(
      (val) => {
        if (!val) return true; // Телефон опционален
        // Проверяем что есть минимум 7 цифр/символов
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length >= 7 && val.length <= 25;
      },
      "Введите корректный номер телефона (минимум 7 цифр)"
    ),
  comment: z
    .string()
    .max(1000, "Комментарий слишком длинный")
    .optional()
    .or(z.literal("")),
  consent: consentSchema,
  website: honeypotSchema,
});

export const leadSchema = z.discriminatedUnion("mode", [
  pdfLeadSchema,
  trialLeadSchema,
]);

export type LeadFormData = z.infer<typeof leadSchema>;
