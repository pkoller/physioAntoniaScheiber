# PhysioAntoniaScheiber.at

Website für die Physiotherapie-Praxis **PhysioAntoniaScheiber.at** in Innsbruck.

**Live:** https://physioantoniascheiber.at/

## Tech

Statische Website ohne Framework, Build-Tools oder Dependencies — öffnet direkt im Browser.

| Datei | Inhalt |
|-------|--------|
| `index.html` | Gesamte Seitenstruktur und Inhalte |
| `style.css` | Alle Styles (Design-Tokens als CSS-Variablen in `:root`) |
| `script.js` | Sprachumschaltung, mobiles Menü, aktive Navigation, Cookie-Banner für Google Maps, Formular-Handler, mobile Anrufleiste |
| `impressum.html` | Impressum (§ 5 ECG / § 25 MedienG), nur Deutsch |
| `datenschutz.html` | Datenschutzerklärung (DSGVO), nur Deutsch |
| `img/` | Optimierte Bilder (Hero, Hausbesuche, Porträt, TZA-Logo) |
| `fonts/` | Selbst gehostete Schriften Schibsted Grotesk + Source Sans 3 (variable woff2, latin + latin-ext) |
| `PRODUCT.md` / `DESIGN.md` | Produktkontext und Gestaltungssystem („Porträt“) |
| `.github/workflows/` | Deployment auf GitHub Pages + PR-Vorschauen |
| `.claude/skills/` | Design-Referenzen für Claude Code (nur Doku, nicht Teil der Website) |

## Schriften

Schibsted Grotesk (Name, Überschriften, Zahlen) und Source Sans 3 (Fließtext) liegen als woff2-Dateien in `fonts/` und werden per `@font-face` am Anfang von `style.css` eingebunden. Bewusst **kein** Google-Fonts-`<link>`: das würde die IP-Adressen der Besucher ohne Einwilligung an Google übertragen (vgl. die Google-Fonts-Abmahnwelle 2022 in AT/DE).

## Cookies & Google Maps

Die Website setzt selbst keine Cookies. Einziger Drittinhalt ist die Google-Maps-Karte im Kontaktbereich; sie wird über einen Cookie-Banner (Akzeptieren / Ablehnen, gleichwertig gestaltet) freigegeben. Das `<iframe>` trägt `data-src` und erhält sein `src` erst nach Zustimmung. Die Wahl wird in `localStorage` gespeichert (`physioantonia-consent-maps`) und lässt sich über „Cookie-Einstellungen" im Footer bzw. auf der Datenschutzseite ändern. Ohne Zustimmung zeigt der Kartenbereich einen Hinweis auf die Cookie-Einstellungen. Neue externe Einbettungen müssen ebenfalls über diese Einwilligung laufen.

## Zweisprachigkeit (DE/EN)

Jeder sichtbare Text auf `index.html` trägt beide Sprachen als Attribute:

```html
<h2 data-de="Über mich" data-en="About me">Über mich</h2>
```

`script.js` schaltet beim Klick auf den DE|EN-Button alle `[data-de]`-Elemente um. Standardsprache ist Deutsch. Neue Texte immer mit beiden Attributen anlegen.

## Lokale Vorschau

Direkt `index.html` im Browser öffnen, oder mit lokalem Server:

```bash
py -m http.server 8123
```

## Deployment

GitHub Pages deployt automatisch bei jedem Merge in `master` (Workflow `pages-deploy.yml`, veröffentlicht in den Branch `gh-pages`). Der Branch `master` ist geschützt — Änderungen laufen über Pull Requests.

Jeder Pull Request bekommt eine Live-Vorschau unter `https://pkoller.github.io/physioAntoniaScheiber/pr-preview/pr-<Nummer>/` (Workflow `pr-preview.yml`), die beim Schließen des PRs wieder entfernt wird.
