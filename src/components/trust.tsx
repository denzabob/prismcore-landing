"use client";

import { ShieldCheck, Lock, BellOff } from "lucide-react";

export function Trust() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Тестовый доступ к рабочей версии
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:mb-12 sm:text-lg">
          Оставьте заявку — предоставим доступ и поможем запустить первый расчёт.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-emerald-500/10 p-3">
              <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm text-muted-foreground">
              Данные обрабатываются в&nbsp;соответствии с&nbsp;152-ФЗ
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-blue-500/10 p-3">
              <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm text-muted-foreground">
              Передача данных защищена шифрованием
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-violet-500/10 p-3">
              <BellOff className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <p className="text-sm text-muted-foreground">
              Мы не спамим и&nbsp;не&nbsp;передаём данные третьим лицам
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
