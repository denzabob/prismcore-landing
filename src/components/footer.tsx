import { Triangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-semibold">
            <Triangle className="h-4 w-4 text-primary fill-primary" />
            Призма
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#audience" className="hover:text-foreground transition-colors">
              Кому подходит
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Возможности
            </a>
            <a href="#cta" className="hover:text-foreground transition-colors">
              Заявка
            </a>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Призма. Все права защищены.</p>
          <p>
            Контакты:{" "}
            <a
              href="mailto:info@prisma-smeta.ru"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              info@prisma-smeta.ru
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
