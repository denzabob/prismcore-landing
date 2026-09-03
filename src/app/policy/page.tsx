import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Призма",
  description: "Политика конфиденциальности расширения «Призма — Автосбор материалов».",
  alternates: { canonical: "/policy" },
};

export default function PolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Политика конфиденциальности расширения «Призма — Автосбор материалов»
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Последнее обновление: 10 апреля 2026 г.
          </p>
          <p className="text-muted-foreground mb-8">
            Настоящая Политика конфиденциальности описывает, как расширение «Призма — Автосбор материалов» («мы», «расширение») собирает, использует и защищает вашу информацию при использовании нашего расширения для браузера Chrome.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Собираемая информация</h2>
            <p className="text-muted-foreground mb-4">
              Расширение «Призма — Автосбор материалов» собирает следующие категории данных:
            </p>

            <h3 className="text-xl font-medium mb-2">1.1. Данные со страниц поставщиков</h3>
            <p className="text-muted-foreground mb-4">
              Данные о товарах: наименование товара, цена, артикул, характеристики, изображения и иные доступные параметры страницы товара. Эти данные собираются только по явному действию пользователя (нажатию на иконку расширения) для передачи в систему «Призма».
            </p>

            <h3 className="text-xl font-medium mb-2">1.2. Технические данные</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              <li><span className="text-foreground">Данные авторизации:</span> параметры подключения и токены авторизации для взаимодействия с системой «Призма».</li>
              <li><span className="text-foreground">Настройки расширения:</span> пользовательские предпочтения и конфигурация расширения.</li>
              <li><span className="text-foreground">Данные текущей вкладки:</span> доступ к активной вкладке браузера для извлечения данных о товаре.</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">1.3. Локально хранимые данные</h3>
            <p className="text-muted-foreground mb-4">
              Данные хранятся локально в браузере с использованием chrome.storage для обеспечения работы расширения между сеансами браузера.
            </p>

            <h3 className="text-xl font-medium mb-2">Мы не собираем:</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Персональные данные, кроме тех, что вы предоставляете добровольно</li>
              <li>Историю просмотров</li>
              <li>Данные без явного действия пользователя</li>
              <li>Данные для целей, не связанных с основной функциональностью расширения</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Цели использования информации</h2>
            <p className="text-muted-foreground mb-4">
              Мы используем описанные выше данные исключительно для предоставления основной функциональности расширения:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              <li>Для извлечения данных о товарах со страниц поставщиков</li>
              <li>Для передачи собранных данных в систему «Призма»</li>
              <li>Для хранения настроек расширения и параметров подключения</li>
              <li>Для обеспечения авторизации в системе «Призма»</li>
              <li>Для снижения ошибок при ручном переносе данных и ускорения подготовки смет и спецификаций</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Мы не используем ваши данные:</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Для продажи третьим лицам</li>
              <li>Для рекламы</li>
              <li>Для отслеживания поведения пользователя</li>
              <li>Для целей, не связанных с работой расширения</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Передача данных третьим сторонам</h2>
            <p className="text-muted-foreground mb-4">
              Расширение передает данные исключительно:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              <li><span className="text-foreground">Системе «Призма»:</span> данные о товарах передаются в систему «Призма» через защищенное HTTPS-соединение для обработки и использования в спецификациях, расчетах и внутреннем каталоге материалов.</li>
            </ul>
            <p className="text-muted-foreground">
              Мы не передаем ваши данные другим третьим сторонам, за исключением случаев, требуемых по закону.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Хранение и защита данных</h2>

            <h3 className="text-xl font-medium mb-2">4.1. Безопасность передачи</h3>
            <p className="text-muted-foreground mb-4">
              Все данные передаются через защищенное HTTPS-соединение с использованием современных протоколов шифрования.
            </p>

            <h3 className="text-xl font-medium mb-2">4.2. Локальное хранение</h3>
            <p className="text-muted-foreground mb-4">
              Данные, хранящиеся локально в браузере с использованием chrome.storage, остаются на вашем устройстве и не передаются без явного действия пользователя.
            </p>

            <h3 className="text-xl font-medium mb-2">4.3. Хранение на сервере</h3>
            <p className="text-muted-foreground mb-4">
              Данные авторизации и параметры подключения хранятся в зашифрованном виде для обеспечения безопасного взаимодействия с системой «Призма».
            </p>

            <h3 className="text-xl font-medium mb-2">4.4. Ограничения доступа</h3>
            <p className="text-muted-foreground mb-2">Расширение запрашивает доступ только к тем данным и разрешениям, которые необходимы для его основной функции:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><span className="text-foreground">activeTab</span> — для временного доступа к текущей вкладке после действия пользователя</li>
              <li><span className="text-foreground">storage</span> — для локального хранения настроек и данных авторизации</li>
              <li><span className="text-foreground">scripting</span> — для программного анализа DOM-структуры страницы</li>
              <li><span className="text-foreground">Доступ к хостам</span> — только для взаимодействия с API системы «Призма»</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Разрешения расширения</h2>
            <p className="text-muted-foreground mb-4">Расширение запрашивает следующие разрешения:</p>

            <ul className="list-disc pl-6 text-muted-foreground space-y-3">
              <li>
                <span className="text-foreground font-medium">activeTab:</span> Используется для временного доступа к текущей активной вкладке после явного действия пользователя (нажатия на иконку расширения). Необходимо для обработки открытой страницы поставщика и извлечения данных о товаре.
              </li>
              <li>
                <span className="text-foreground font-medium">storage:</span> Используется для локального хранения настроек расширения, параметров подключения и данных авторизации, необходимых для взаимодействия с системой «Призма» между сеансами браузера.
              </li>
              <li>
                <span className="text-foreground font-medium">scripting:</span> Используется для программной инъекции встроенного скрипта расширения на текущую открытую страницу после действия пользователя. Необходимо для анализа DOM-структуры страницы и извлечения данных о товаре.
              </li>
              <li>
                <span className="text-foreground font-medium">Доступ к хостам:</span> Используется только для взаимодействия с API системы «Призма», необходимого для проверки, обработки и передачи данных, собранных со страницы товара. Доступ не используется для фонового мониторинга сайтов поставщиков.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Права пользователей</h2>
            <p className="text-muted-foreground mb-4">Вы имеете право:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              <li>Запросить доступ к вашим данным</li>
              <li>Потребовать исправления ваших данных</li>
              <li>Потребовать удаления ваших данных</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Удалить расширение в любой момент, что приведет к удалению всех локально хранимых данных</li>
            </ul>
            <p className="text-muted-foreground">
              Для реализации этих прав свяжитесь с нами по электронной почте, указанной в разделе «Контакты».
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Ограниченное использование данных</h2>
            <p className="text-muted-foreground mb-4">
              В соответствии с политикой ограниченного использования Chrome Web Store:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Мы используем данные только для предоставления основной функциональности расширения</li>
              <li>Мы не передаем данные для целей персонализированной рекламы</li>
              <li>Мы не используем данные для определения кредитоспособности или для целей кредитования</li>
              <li>Мы не продаем данные пользователей</li>
              <li>Доступ к данным предоставляется только по явному действию пользователя</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Изменения в Политике конфиденциальности</h2>
            <p className="text-muted-foreground mb-4">
              Мы можем время от времени обновлять настоящую Политику конфиденциальности. Дата «Последнего обновления» вверху страницы отражает последнюю версию. Продолжение использования расширения после внесения изменений означает принятие обновленной политики.
            </p>
            <p className="text-muted-foreground">
              О существенных изменениях мы уведомим вас через обновление расширения или иным доступным способом.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">9. Соответствие законодательству</h2>
            <p className="text-muted-foreground mb-4">Расширение соответствует:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Правилам Chrome Web Store Developer Program Policies</li>
              <li>Требованиям к конфиденциальности данных Google</li>
              <li>Применимому законодательству о защите персональных данных</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">10. Контакты</h2>
            <p className="text-muted-foreground mb-4">
              Если у вас возникли вопросы по настоящей Политике конфиденциальности или практике обработки данных, свяжитесь с нами:
            </p>
            <ul className="text-muted-foreground space-y-1 mb-4">
              <li>Email: <a href="mailto:info@prismcore.ru" className="underline underline-offset-4 hover:text-foreground transition-colors">info@prismcore.ru</a></li>
              <li>Разработчик: Призма</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">11. Удаление данных</h2>
            <p className="text-muted-foreground mb-4">
              При удалении расширения все локально хранимые данные автоматически удаляются из браузера. Для удаления данных с сервера системы «Призма» свяжитесь с нами по указанному выше email.
            </p>
            <p className="text-muted-foreground font-medium">
              Используя расширение «Призма — Автосбор материалов», вы соглашаетесь с условиями настоящей Политики конфиденциальности.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
