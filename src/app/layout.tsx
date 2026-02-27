import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Призма — сметный расчёт и доказательная база для эксперта",
  description:
    "Структурируйте расчёты, формируйте прозрачные сметы и создавайте документы, пригодные для приложения к экспертному заключению. Призма — сметное приложение для экспертов, юристов и оценщиков.",
  keywords: [
    "смета",
    "сметный расчёт",
    "экспертиза",
    "оценка ущерба",
    "строительная экспертиза",
    "призма",
    "сметное приложение",
  ],
  openGraph: {
    title: "Призма — сметный расчёт и доказательная база для эксперта",
    description:
      "Структурируйте расчёты, формируйте прозрачные сметы и создавайте документы для экспертных заключений.",
    type: "website",
    locale: "ru_RU",
    siteName: "Призма",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
