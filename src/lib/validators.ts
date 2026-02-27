import { z } from "zod";

export const ACTIVITIES = [
  "Эксперт",
  "Юрист",
  "Оценщик",
  "Подрядчик/строитель",
  "Другое",
] as const;

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Слишком длинное имя"),
  activity: z.enum(ACTIVITIES, {
    error: "Выберите вид деятельности",
  }),
  email: z.string().email("Введите корректный email"),
  phone: z
    .string()
    .min(7, "Введите корректный номер телефона")
    .max(20, "Слишком длинный номер")
    .regex(
      /^\+?[0-9\s\-()]{7,20}$/,
      "Введите корректный номер телефона (формат: +7...)"
    ),
  comment: z
    .string()
    .max(1000, "Комментарий слишком длинный")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    error: "Необходимо согласие на обработку персональных данных",
  }),
  // Honeypot field — must be empty
  website: z.string().max(0).optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
