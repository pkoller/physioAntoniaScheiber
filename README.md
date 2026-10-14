# PhysioAntonia

Website für die Physiotherapie-Praxis **PhysioAntonia** in Innsbruck.

**Live:** https://pkoller.github.io/physiotoni/ (künftig: physioantonia.at)

## Tech

Statische Website ohne Framework, Build-Tools oder Dependencies — öffnet direkt im Browser.

| Datei | Inhalt |
|-------|--------|
| `index.html` | Gesamte Seitenstruktur und Inhalte |
| `style.css` | Alle Styles (Design-Tokens als CSS-Variablen in `:root`) |
| `script.js` | Sprachumschaltung, mobiles Menü, Scroll-Animationen, aktive Navigation, Formular-Handler, Cookie-/Consent-Banner |
| `impressum.html` | Impressum (§ 5 ECG / § 25 MedienG), nur Deutsch |
| `datenschutz.html` | Datenschutzerklärung (DSGVO), nur Deutsch |
| `img/` | Optimierte Bilder (Hero, Hausbesuche, Porträt, TZA-Logo) |
| `fonts/` | Selbst gehostete Schriften Lora + Raleway (variable woff2, latin + latin-ext) |
| `.github/workflows/` | Deployment auf GitHub Pages + PR-Vorschauen |
| `.claude/skills/` | Design-Referenzen für Claude Code (nur Doku, nicht Teil der Website) |

## Schriften

Lora (Überschriften) und Raleway (Fließtext) liegen als woff2-Dateien in `fonts/` und werden per `@font-face` am Anfang von `style.css` eingebunden. Bewusst **kein** Google-Fonts-`<link>`: das würde die IP-Adressen der Besucher ohne Einwilligung an Google übertragen (vgl. die Google-Fonts-Abmahnwelle 2022 in AT/DE).

## Cookies & Consent

Die Website setzt selbst keine Cookies. Der Consent-Banner steuert nur die Google-Maps-Karte im Kontaktbereich: Das `<iframe>` trägt `data-src` und erhält sein `src` erst nach Zustimmung. Die Wahl wird im `localStorage` (`physioantonia-consent-maps`) gespeichert und lässt sich über „Cookie-Einstellungen" im Footer oder in der Datenschutzerklärung ändern. Neue externe Einbettungen müssen ebenfalls hinter diese Einwilligung.

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

Jeder Pull Request bekommt eine Live-Vorschau unter `https://pkoller.github.io/physiotoni/pr-preview/pr-<Nummer>/` (Workflow `pr-preview.yml`), die beim Schließen des PRs wieder entfernt wird.
