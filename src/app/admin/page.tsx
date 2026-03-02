"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Download,
  CheckCircle2,
  LogIn,
  ChevronLeft,
  ChevronRight,
  Triangle,
} from "lucide-react";

interface Lead {
  id: number;
  createdAt: string;
  name: string;
  activity: string;
  email: string;
  phone: string;
  comment: string | null;
  source: string;
  status: string;
  ip: string | null;
}

interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminPage() {
  const [loginInput, setLoginInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [loginStep, setLoginStep] = useState<"login" | "code">("login");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLeads = useCallback(
    async (searchQuery: string, pg: number) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: pg.toString(),
        });
        if (searchQuery) params.set("search", searchQuery);

        const res = await fetch(`/api/admin/leads?${params}`);
        if (!res.ok) {
          if (res.status === 401) {
            setAuthenticated(false);
            setLoginStep("login");
            setCodeInput("");
            setAuthError("Сессия истекла. Войдите заново.");
            return;
          }
          return;
        }

        const data: LeadsResponse = await res.json();
        setLeads(data.leads);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      } catch (e) {
        console.error("Error fetching leads:", e);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch("/api/admin/leads?page=1");
        if (!res.ok) {
          if (res.status === 401) {
            return;
          }
          return;
        }

        const data: LeadsResponse = await res.json();
        setLeads(data.leads);
        setTotalPages(data.totalPages);
        setTotal(data.total);
        setAuthenticated(true);
      } catch (e) {
        console.error("Error restoring admin session:", e);
      } finally {
        setCheckingSession(false);
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchLeads(search, page);
    }
  }, [authenticated, search, page, fetchLeads]);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();

    setAuthError("");

    if (!loginInput.trim()) {
      setAuthError("Введите логин.");
      return;
    }

    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: loginInput.trim() }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setAuthError(data?.error || "Не удалось отправить код.");
        return;
      }

      setLoginStep("code");
      setCodeInput("");
    } catch (e) {
      console.error("Error requesting admin code:", e);
      setAuthError("Не удалось отправить код.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    setAuthError("");

    if (!/^\d{6}$/.test(codeInput.trim())) {
      setAuthError("Введите 6-значный код.");
      return;
    }

    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: loginInput.trim(),
          code: codeInput.trim(),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setAuthError(data?.error || "Не удалось подтвердить код.");
        return;
      }

      setAuthenticated(true);
      setPage(1);
      await fetchLeads(search, 1);
    } catch (e) {
      console.error("Error verifying admin code:", e);
      setAuthError("Не удалось подтвердить код.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleMarkContacted = async (id: number) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "contacted" }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: "contacted" } : l))
        );
      }
    } catch (e) {
      console.error("Error updating lead:", e);
    }
  };

  const handleExportCSV = () => {
    window.open("/api/admin/export", "_blank");
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 text-sm text-muted-foreground">
        Проверка доступа...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 font-bold text-lg mb-6 justify-center">
              <Triangle className="h-5 w-5 text-primary fill-primary" />
              Призма — Admin
            </div>
            <form
              onSubmit={loginStep === "login" ? handleRequestCode : handleVerifyCode}
              className="space-y-4"
            >
              <div className="space-y-2">
                {loginStep === "login" ? (
                  <Input
                    type="text"
                    placeholder="Введите логин"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    autoComplete="username"
                  />
                ) : (
                  <>
                    <Input
                      type="text"
                      value={loginInput}
                      readOnly
                      className="bg-muted"
                    />
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="Введите 6-значный код"
                      value={codeInput}
                      onChange={(e) =>
                        setCodeInput(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      autoComplete="one-time-code"
                    />
                  </>
                )}
              </div>
              {authError && (
                <p className="text-sm text-destructive">
                  {authError}
                </p>
              )}
              {loginStep === "code" && (
                <p className="text-sm text-muted-foreground">
                  Код отправлен в Telegram-чат уведомлений.
                </p>
              )}
              <Button type="submit" className="w-full" disabled={authLoading}>
                <LogIn className="mr-2 h-4 w-4" />
                {loginStep === "login"
                  ? authLoading
                    ? "Отправка кода..."
                    : "Получить код"
                  : authLoading
                    ? "Проверка..."
                    : "Подтвердить вход"}
              </Button>
              {loginStep === "code" && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setLoginStep("login");
                    setCodeInput("");
                    setAuthError("");
                  }}
                  disabled={authLoading}
                >
                  Изменить логин
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-bold">
            <Triangle className="h-4 w-4 text-primary fill-primary" />
            Призма — Лиды
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">{total} заявок</Badge>
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              CSV
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени, email, телефону..."
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Дата</th>
                  <th className="px-4 py-3 text-left font-medium">Имя</th>
                  <th className="px-4 py-3 text-left font-medium">Деятельность</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Телефон</th>
                  <th className="px-4 py-3 text-left font-medium">Комментарий</th>
                  <th className="px-4 py-3 text-left font-medium">Статус</th>
                  <th className="px-4 py-3 text-left font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                      Загрузка...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                      {search ? "Ничего не найдено" : "Заявок пока нет"}
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 tabular-nums">{lead.id}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3">{lead.activity}</td>
                      <td className="px-4 py-3">{lead.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{lead.phone}</td>
                      <td className="px-4 py-3 max-w-[200px] truncate">
                        {lead.comment || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            lead.status === "contacted" ? "default" : "secondary"
                          }
                        >
                          {lead.status === "new" ? "Новый" : "Связались"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {lead.status === "new" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkContacted(lead.id)}
                          >
                            <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                            Связались
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Стр. {page} из {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
