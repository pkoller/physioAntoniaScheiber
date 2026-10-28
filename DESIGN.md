---
name: PhysioAntoniaScheiber.at
description: Tiroler Wegweiser. The homepage is one Tyrolean trail signpost, and the phone number is the destination.
colors:
  yellow: "#F5C400"
  yellow-hover: "#FFD21F"
  blaze: "#C8102E"
  blaze-text: "#A50D26"
  ink: "#17191B"
  ink-soft: "#3B4044"
  ink-hairline: "rgba(23, 25, 27, 0.28)"
  white: "#FFFFFF"
  white-hover: "#FAFAF8"
  ground: "#E4E5E0"
  ground-deep: "#D6D8D1"
  post: "#2A2D30"
  post-deep: "#1D1F21"
  post-rule: "#3A3E41"
  on-post: "#F1F2EE"
  on-post-soft: "#B8BDB9"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 6.4vw, 5.75rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.01em"
  call:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.9rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "0.01em"
    fontFeature: "\"tnum\""
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "0.005em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 1.85rem)"
    fontWeight: 700
    lineHeight: 1.15
  statement:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.55rem, 2.5vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.2
  lead:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.6vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
spacing:
  frame: "2px"
  tip: "0.62em"
  post-w: "10px"
  post-gap: "clamp(22px, 3.2vw, 44px)"
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(72px, 9vw, 128px)"
  header-h: "76px"
  container: "1240px"
components:
  plate:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.42em 1.32em 0.42em 0.6em"
  plate-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  plate-call:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.call}"
    rounded: "{rounded.none}"
    padding: "0.34em 1.32em 0.38em 0.6em"
  plate-heading:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    rounded: "{rounded.none}"
    padding: "0.32em 1.32em 0.32em 0.6em"
  plate-route:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    width: "30rem"
  blaze:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    width: "2.8rem"
    height: "2.6rem"
  nav-number:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    size: "1.5rem"
  zusatz:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.38em 0.75em"
  button-primary:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "52px"
    padding: "0.5rem 1.5rem"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "52px"
    padding: "0.5rem 1.5rem"
  button-outline-hover:
    backgroundColor: "{colors.ground}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "52px"
    padding: "0.7rem 0.85rem"
  header-phone:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "44px"
    padding: "0.3rem 0.8rem"
  nav-drawer-link:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  nav-drawer-link-active:
    backgroundColor: "{colors.white}"
  here-plate:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  call-bar:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    height: "64px"
  section-board:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
  section-dark:
    backgroundColor: "{colors.post-deep}"
    textColor: "{colors.on-post}"
---

# Design System: PhysioAntoniaScheiber.at

## Overview

**Creative North Star: "The Tiroler Wegweiser"**

The site is one Tyrolean trail signpost. An anthracite post runs down the left edge of every section, each section heading hangs off it as a yellow arrow plate carrying its route number in a red-white-red trail blaze, and the last plate on the post is the phone number. The signpost is the organising metaphor, not decoration: plates name destinations, white supplementary plates (Zusatztafeln) state short honest facts, and the visitor reads the page the way a hiker reads a junction sign, top to bottom, then goes.

The world is flat, framed and printed. Three inks (signal yellow, near-black ink, blaze red) plus white sit on a pale limestone ground; the contact section and footer switch to the anthracite of the post. Every plate, fact plate, button and field is outlined in a 2px ink frame with square corners. Lettering is condensed sign type in mixed case; running text is a hyperlegible sans at 19px because the readers are often older or in pain. Real photographs carry the people, square-cornered and uncropped by shape.

It rejects the category default it replaced: a teal-and-white clinic page with a stock hero, rounded cards and soft shadows. There are no cards, no drop shadows (one dialog excepted), no soft gradients and no pills.

**Key Characteristics:**
- One continuous post down the page; every section joins it.
- Arrow plates for destinations, rectangles for facts and form controls.
- Three inks plus white on limestone and anthracite grounds.
- 2px ink frames, square corners everywhere.
- Barlow Condensed sign lettering over Atkinson Hyperlegible Next body.
- One authored motion moment (plates mounting onto the post on load); otherwise only press and hover nudges.

## Colors

A signage palette: one loud sign yellow, one marker red, one ink, on quiet mineral greys.

### Primary
- **Signal Yellow** (yellow): the face of a sign. Arrow plates, the call plate, the header phone, the mobile call bar, primary buttons, text selection, and the whole Kosten section, which becomes a yellow information board. It always carries ink lettering (10.7:1); the only place yellow is itself the text colour is a link hover on the anthracite ground (10:1), where it is also the focus-ring colour.

### Secondary
- **Blaze Red** (blaze): the red bands of the red-white-red trail blaze (route-number blazes, list bullets), the focus ring inside the white form panel and on buttons, and the border of invalid inputs and the form error box.
- **Blaze Red Text** (blaze-text): the darker red used only when red must be read: field error messages and form-error copy on white (7.8:1).

### Neutral
- **Sign Ink** (ink): all lettering on light grounds, plate frames, rules, the nav-number squares, the default focus ring.
- **Weathered Ink** (ink-soft): secondary text: hero sub, plate "via" lines, logo address, form note, consent copy (6.4:1 on yellow, 8.3:1 on ground).
- **Ink Hairline** (ink-hairline): the 1px separators between list rows, career stages and the form note. Not a custom property in code; always ink at 28%.
- **Plate White** (white): Zusatztafeln, white arrow plates, the Standort logo plate, the "Sie sind hier" plate, the form panel, inputs, the white band of the blaze.
- **Limestone** (ground): page ground, sticky header, mobile nav drawer.
- **Deep Limestone** (ground-deep): alternate section ground (Hausbesuche).
- **Post Anthracite** (post): the signpost itself, scrollbar thumb, map placeholder.
- **Deep Anthracite** (post-deep): the contact section and footer, where the post comes to rest.
- **Snow** (on-post): text and links on the anthracite grounds (14.7:1).
- **Fog** (on-post-soft): secondary text and field labels on anthracite (8.7:1), the map frame.

### Named Rules
**The Three Inks Rule.** Yellow, ink and blaze red, plus white, on limestone or anthracite. No other hue enters the system; new surfaces pick one of the two grounds.

**The Blaze Is a Marker Rule.** Blaze red marks (stripes, bullets, focus, error borders); it is never body text. When red must be read, use blaze-text on white.

**The Not By Colour Alone Rule.** Every state that colour signals is also signalled by form: the active nav link is bold with a thick underline and `aria-current`, an invalid input gets a 3px border and a written message.

## Typography

**Display Font:** Barlow Condensed 600/700 (with Arial Narrow, sans-serif)
**Body Font:** Atkinson Hyperlegible Next, variable 200–800 (with system-ui, sans-serif)

**Character:** Barlow Condensed is the lettering of the sign: narrow, bold, upright, set in mixed case so it reads as a place name rather than a shout. Atkinson Hyperlegible Next, designed for low-vision readers, carries everything a person has to read through. Both are self-hosted.

### Hierarchy
- **Display** (700, clamp(3rem, 6.4vw, 5.75rem), 0.94): the hero H1 only, set straight on the limestone beside the post. The legal pages use a smaller H1 (clamp(2.4rem, 5vw, 3.6rem), line-height 1).
- **Call** (700, clamp(2rem, 3.4vw, 2.9rem), 1.12, tabular numerals): the phone number on the call plates; the largest sign on the page after the H1.
- **Headline** (700, clamp(1.75rem, 3.4vw, 2.75rem), 1.12): section headings, always inside a heading plate.
- **Title** (700, clamp(1.5rem, 2.2vw, 1.85rem), 1.15): sub-headings within a section, form title, legal-page H2 (1.6rem).
- **Statement** (600, clamp(1.55rem, 2.5vw, 2.1rem), 1.3): one closing positioning sentence per section at most, max 34ch.
- **Lead** (400, clamp(1.2rem, 1.6vw, 1.4rem), 1.55): the opening paragraph of a section, max 54ch.
- **Body** (400, 19px desktop / 18px below 768px, 1.6): all running text; paragraphs held to 42–54ch.
- **Label** (600, 1.2rem, 1.2): Zusatztafel text; the key or year inside it is 700 with tabular numerals. The contact-detail field labels on anthracite are the one uppercase style (600, 1rem, 0.06em tracking).

### Named Rules
**The Sign Lettering Rule.** Anything that is a sign (headings, plates, nav, buttons, labels, the logo) is Barlow Condensed in mixed case; anything a person reads through is Atkinson. Headings are never all caps.

**The Legibility Floor Rule.** Running text never drops below 18px. Only small print goes below it: the footer at 16px, the form note and consent copy at 0.98rem, and the logo's address line at 0.78rem as the floor of the whole page. Headings balance (`text-wrap: balance`), paragraphs avoid orphans (`text-wrap: pretty`).

## Layout

A centred container (max 1240px, side gutter clamp(16px, 4vw, 56px)) holds every section. Inside it, the content sits to the right of the post: the post is 10px wide (8px below 768px) at the container's left edge, followed by a fluid gap of clamp(22px, 3.2vw, 44px). The post extends through each section's own vertical padding (clamp(72px, 9vw, 128px)), so consecutive sections join into one unbroken post. In the contact section the post stops just below the heading plate: the route ends at the destination.

Plates mounted on the post start 8px left of it, overlapping it the way a real plate is bolted on. Sections alternate grounds in a fixed order: limestone, deep limestone, limestone, the yellow board (Kosten), deep anthracite (Kontakt and footer).

**Hero.** One column on mobile (H1, sub, call plate, request plate, ÖSV Zusatztafel, then the photo, then the route sign). From 1000px it becomes a 7/5 grid: left the lead and the route sign of five equal-length plates; right the photo, 4:5, sticky under the header and bleeding to the right window edge.

**Header.** Sticky, 76px (66px below 768px), limestone with a 2px ink bottom rule: white Standort logo plate, inline nav with numbered links, yellow phone, DE/EN toggle. Below 1280px the nav becomes a full-screen drawer of yellow arrow plates on its own post, and a white "Sie sind hier" plate hangs under the header naming the current section. Below 768px a yellow call bar is fixed to the bottom of the screen once the hero call plate has scrolled away.

**Breakpoints:** 420 / 768 / 900 / 1000 / 1280, plus a 360px tweak that shrinks the call plates. At 900 lists and the Kosten board go to two and three columns; at 1000 the hero, About and Contact grids split; at 1280 the nav goes inline.

Anchor targets are the section headings; `scroll-padding-top` (header height + 24px, + 64px while the "Sie sind hier" plate shows) keeps them clear of the header.

## Elevation & Depth

The system is flat. Depth comes from the 2px ink frame, from a plate overlapping the post, and from the change of ground between sections, never from shadow or blur. Photos sit flush with no frame.

### Shadow Vocabulary
- **Dialog lift** (`box-shadow: 0 12px 32px rgba(23, 25, 27, 0.22)`): the consent dialog only, because it floats over content at the bottom of the viewport and must read as separate from the page.

### Named Rules
**The Flat Sign Rule.** Signs are printed metal, not floating cards. No drop shadows anywhere except the consent dialog; no blur, no glass, no elevation on hover. A hover moves a plate along its arrow instead.

## Shapes

Square corners throughout (0px radius), including photos, inputs and buttons. The form language has two silhouettes:

- **The arrow plate:** a rectangle whose right end is a point. The tip depth is 0.62em, so it scales with the plate's type size. The plate's own background is the 2px ink frame; a second layer, inset by the frame and clipped to the same polygon, paints the yellow or white face. The result is a crisp outline that follows the point without a CSS border.
- **The rectangle:** Zusatztafeln, buttons, inputs, the form panel, the header phone and toggle; each with a 2px ink border. A Zusatztafel with a key splits it from the value with a 2px vertical ink rule.

The trail blaze is three horizontal bands: red 28%, white 44%, red 28% at plate size, so the route digit sits on real white; as a list bullet (1.6rem by 1rem) the bands are equal thirds. Both carry a 1px inset ink hairline at 35% so the white band holds on white grounds.

**The Arrow vs Rectangle Rule.** Arrows name destinations: section headings, route links, the call, the drawer nav. Rectangles hold facts or work a form. A new element picks its silhouette by that test, not by looks.

## Components

### Arrow plates
Bolted to the post, pointing at where you are going.
- **Shape:** arrow polygon, 0.62em tip, 2px ink frame, square corners.
- **Yellow (default):** ink lettering, Barlow 700, padding 0.42em / 1.32em right (tip + 0.7em) / 0.6em left.
- **White:** the same plate with a white face, for secondary destinations ("Termin anfragen") and the Kosten heading, which would vanish yellow-on-yellow.
- **Call plate:** phone icon, a short action line above the number ("Jetzt anrufen" / "Am schnellsten per Telefon", at 0.42em of the plate size), then the number in the Call style. Appears twice: hero (first CTA) and contact section (the destination).
- **Route plates:** the hero route sign; five plates of equal length (min(30rem, available width)), each a blaze with the route number, the destination name and a one-line "via" in Atkinson 500 / ink-soft.
- **Heading plates:** every section H2, blaze plus title, Headline style.
- **States:** links nudge 6px along the arrow on hover and press to 3px + scale(0.98), 220ms ease-out; hover is disabled on touch. Focus draws a 3px ink underline inside the face instead of an outline that the clip-path would cut off.

### Route numbers
- **Blaze** (2.8 x 2.6rem, digit 0.875rem 700): only at plate size, where the white band holds the digit.
- **Number square** (ink square, white digit, 1.5rem; 2.1rem in the drawer): the inline nav and the "Sie sind hier" plate. Small blazes next to DE/EN read as flags, so the nav never uses them.

### Zusatztafel (supplementary plate)
- **Style:** white rectangle, 2px ink border, Label type, padding 0.38em 0.75em; optional bold key or year divided by a 2px rule.
- **Use:** short verifiable facts: the ÖSV credential in the hero, the house-visit radius and referral note, the further-training list (stacked), and the Kosten labels (Verordnung / Wahltherapeutin / Bewilligung), which head those points instead of numerals.

### Lists and the career route
- **Trail list:** rows separated by ink hairlines, each with a blaze bullet; two columns from 900px.
- **Career route:** a timeline of stages with a 2px ink top rule and hairlines between stages; years in Barlow 700 tabular. The ÖSV stage is the peak: a framed yellow block with bold text. A parallel activity is set as an aside with its year column empty and softer.

### Kosten board
The section ground turns yellow and the heading plate turns white. Three points, each under a 3px ink top rule, headed by a Zusatztafel label; three columns from 900px.

### Buttons
Used where a plate would be wrong: the form, the consent dialog, the legal pages.
- **Shape:** rectangle, 2px ink border, square corners, min height 52px (46px small).
- **Primary:** yellow, ink lettering, Barlow 700 1.3rem, padding 0.5rem 1.5rem.
- **Outline:** white face; hover goes to limestone. The consent dialog's "Ablehnen" and "Akzeptieren" are both outline buttons, identical on purpose.
- **States:** press scale(0.97), 180ms ease-out; focus is a 3px blaze-red outline, offset 3px; sending/disabled at 65% opacity.

### Inputs / Fields
- **Style:** white, 2px ink border, square, min height 52px, padding 0.7rem 0.85rem, 18.4px text; labels above in Barlow 700.
- **Focus:** 3px blaze-red outline, offset 2px.
- **Error:** border turns blaze red and thickens to 3px, with a blaze-text message below; the submit error is a blaze-bordered box with an icon and fallback phone and email links.

### Navigation
- **Header (from 1280px):** Barlow 600 1.15rem links with number squares; hover shows a 35% ink underline, the active section (tracked per `<section>`) goes bold with a 3px ink underline and `aria-current`.
- **Drawer (below 1280px):** full-screen limestone sheet with its own post; links become yellow arrow plates at 1.7rem; the active one turns white. Opens with opacity and a 12px drop, 240ms ease-out.
- **"Sie sind hier" plate:** white strip under the header with a number square and the current section name; fades and slides in (220ms) once a section is active, clears in the hero.
- **Logo:** the white Standort plate: name in Barlow 700, address in small Atkinson ink-soft.

### Call bar (mobile)
Full-width yellow bar fixed to the bottom below 768px, 2px ink top rule, 64px plus the safe-area inset, "Anrufen" and the number in Barlow 700 1.45rem. Hidden while the hero call plate is on screen; slides away with translateY, 280ms.

### Contact section
The one dark ground: Snow text, Fog field labels, white logo plate for the practice logo, the white form panel (2px ink frame, 2.25rem padding, 1.4rem on mobile), and the consent-gated map in a Fog-framed anthracite box whose placeholder links to the consent banner.

### Photographs
Real photographs only, square-cornered, no overlays or tints: the hero (4:5, 4:4.2 on mobile), house visits and portrait (both 20:9 landscape). Provenance: `img/hero1.jpg`, `img/hausbesuche.jpg`, `img/antonia.jpg` and `img/og-preview.jpg` are existing photographs by Tom Kieslich (tomkieslichmedia.com), credited in the Impressum; `img/tza-logo.png` is the Therapiezentrum Anichstraße logo; `img/favicon/*` are the site's existing favicons. All were left unmodified by the redesign; no generated rasters ship.

### Motion
One authored moment: on load the hero's plates and Zusatztafel slide onto the post (from -18px and transparent, 620ms ease-out, 70ms stagger after 120ms, fill-mode backwards so hover still works). There are no scroll reveals. Everything else is feedback: plate nudge, button press, drawer, "Sie sind hier" plate, call bar. Easing: ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for entrances and presses, ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement. Only transform and opacity animate; reduced motion gets the end state.

## Do's and Don'ts

### Do:
- **Do** put every new section's content in a container with the post, so the post stays continuous, and head it with a heading plate carrying its route number in a blaze.
- **Do** give every plate, Zusatztafel, button and field the 2px ink frame and square corners.
- **Do** use a Zusatztafel for a short verifiable fact (key | value) and an arrow plate only for a destination.
- **Do** keep the phone call the largest and most repeated action: call plate in the hero and contact section, yellow phone in the header, call bar on mobile.
- **Do** check every new text colour for WCAG AA (4.5:1, 3:1 for large text) on its ground; use ink-soft for secondary text and blaze-text for red text.
- **Do** keep running text in Atkinson at 18px or more, and plates, headings and labels in Barlow Condensed mixed case.

### Don't:
- **Don't** introduce a hue outside yellow, ink, blaze red and white, or a ground other than limestone or anthracite.
- **Don't** add cards, drop shadows (the consent dialog is the one exception), soft gradients (the blaze's hard stripes are the one gradient), rounded corners or pill shapes.
- **Don't** add eyebrows or kickers above section headings; the heading plate carries its own weight.
- **Don't** set blaze red as body text, or use small blazes as nav markers; the nav uses ink number squares.
- **Don't** add scroll-reveal or per-section entrance animations; the hero mount is the only authored motion.
- **Don't** set headings in all caps or put opacity on lettering to make it secondary; use ink-soft.
