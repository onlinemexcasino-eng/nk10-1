NK101 Nepal - третий сайт (nk101.netlify.app), папка site/ = корень деплоя
=========================================================================

Структура
---------
/                       главная (непальский)
/sign-up/  /app/  /promotions/  /slot-games/  /slot-games/sugar-rush-1000/
/about-us/  /privacy-policy/  /responsible-gambling/  /terms-and-conditions/   (трастовые, без картинок)
/en/ + те же пути       английская версия
/thanks/                страница после отправки формы контакта (noindex)
/go/index.html          fallback-редирект на реф
_redirects              Netlify: /go и /go/ -> реф (302)
_headers                security + cache заголовки
netlify.toml            publish = "." (если корень репозитория = содержимое site/)
/static/css/main.css  /static/js/app.js  /static/img/
/sitemap.xml  /robots.txt  /404.html

Что заменить
------------
1. REF_LINK -> реф-ссылка (абсолютная, с https://). Вхождения: _redirects (2), go/index.html (3).
   grep -r REF_LINK .
2. Если домен будет не nk101.netlify.app - заменить "https://nk101.netlify.app" во всех html,
   sitemap.xml и robots.txt.
3. Форма контакта на /about-us/ - Netlify Forms (data-netlify="true", honeypot bot-field,
   после отправки -> /thanks/). Заявки видны в панели Netlify -> Forms. Ничего настраивать не надо.
4. netlify.toml содержит плагин lighthouse - можно удалить блок [[plugins]], если не нужен.

Картинки (только на 6 основных страницах, пути прописаны, alt на языке страницы)
--------------------------------------------------------------------------------
static/img/logo.webp            180x56  (шапка; пока файла нет - текст NK101)
static/img/favicon.png          32x32
static/img/touch-icon.png       180x180

Hero 1200x560 (og:image для страницы):
  hero-home.webp, hero-signup.webp, hero-app.webp, hero-promotions.webp, hero-slots.webp, hero-sugar-rush-1000.webp

В тексте 900x506 (16:9):
  главная:          home-1.webp, home-2.webp, home-3.webp
  sign-up:          signup-1.webp, signup-2.webp
  app:              app-1.webp, app-2.webp
  promotions:       promo-1.webp, promo-2.webp
  slot-games:       slots-1.webp, slots-2.webp
  sugar-rush-1000:  sugar-1.webp, sugar-2.webp

Трастовые страницы картинок не используют (og:image у них = hero-home.webp).
