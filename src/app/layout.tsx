import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["cyrillic", "latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Призма — профессиональная платформа для работы эксперта",
  description:
    "Инструменты для расчёта стоимости, работы с данными и подготовки экспертных исследований — в единой профессиональной среде.",
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
    title: "Призма — профессиональная платформа для работы эксперта",
    description:
      "Инструменты для расчётов, анализа данных и подготовки экспертных исследований.",
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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=107046462', 'ym');

            ym(107046462, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
      </head>
      <body
        className={`${manrope.variable} ${sourceSerif.variable} antialiased font-sans`}
      >
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mc.yandex.ru/watch/107046462"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
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
