# easyJet holidays — brand notes for the demo

Source: live render of https://www.easyjet.com/en/holidays in Chrome on 12 Nov 2026 (WebFetch returned 403, so values come from computed styles on the rendered page, not guesses).

## Palette

| Role | Hex | Where it is used |
|---|---|---|
| Header orange | `#FF7D00` (gradient to `#FF6600`) | Full-width header bar |
| Primary / CTA orange | `#FF6600` | Search, Get exploring, View holiday, Log in buttons; outline buttons; icons; links |
| Hero dark | `#2A140A` → `#1A0D06` | Diagonal split behind the search card in the Black Friday hero |
| Text | `#333333` | Body copy and headings |
| Muted text | `#7C7C7C` | Input borders, secondary lines |
| Section tint | `#EEF3F2` | Pale grey-green band behind "Holidays that you might like" |
| Background | `#FFFFFF` | Page body, cards, search card |
| Tripadvisor green | `#00AA6C` | Review bubbles next to hotel names |

Primary CTAs are solid `#FF6600` with white text. Secondary CTAs ("Find out more", "View deals") are 1px `#FF6600` outline on transparent with orange text.

## Type

- Real fonts: `easyjet_rounded_book`, `easyjet_rounded_demi`, `easyjet_rounded_light` (body, UI) and `easyjet_generation_headline` (tall condensed uppercase display, e.g. "OUR BLACK FRIDAY SALE IS HERE!"). Both are licensed.
- Demo substitutes (Google Fonts): **Nunito** for the rounded body face (400/600/700/800), **Bebas Neue** for the condensed headline face.
- Fallback stack: `"Nunito", Arial, Helvetica, sans-serif` (the live site falls back to Arial, Helvetica).
- Sizes: body 16px, inputs 14px, H1 32px bold, card titles 16px demi.

## Logo

White rounded rectangle with orange "easyJet" wordmark in it, followed by "holidays" in white light weight. Sits top-left in the orange header, nav centred, account / shortlist (heart) / help / language icons as white outline circles top-right. Recreated in CSS; no logo files copied.

## Buttons

- Radius 4px (some promo buttons 2px). Inputs also 4px with a 1px `#7C7C7C` border and floating label on the border ("From", "To", "When", "Who").
- Padding ~15px 24px on primary, 12px 16px on card buttons.
- Fill for primary, outline for secondary. Hover: slightly darker orange (`#E65C00`).

## Navigation

Header: logo · Deals ▾ · Holidays ▾ · Destinations ▾ · Flights · Extras ▾ · Info ▾ · icon buttons. Not sticky; the search card becomes a sticky bar under the header once you scroll. No sticky CTA, but a "Log in to your account — save holidays and enjoy a faster checkout" toast slides in bottom-left.

## Density

Medium. Generous whitespace around section headings, but cards are compact and information-dense (stars, Tripadvisor bubbles, review count, "What's included", "from £762 pp", "No taxes & charges due", button). Content width ~980px centred. The demo follows this: a narrow centred column, compact cards.

## Tone

Friendly, upbeat, short. Phrases from the site reused in the demo register:

- "Explore more for less"
- "Book your holiday with a deposit of just £60 per person"
- "We'll beat the price if you find the same holiday cheaper elsewhere"
- "Choose your board basis, luggage, transfers and extras to create the perfect trip"
- Also: "from £576 pp", "Prices shown include taxes and charges", "Add this holiday to my shortlist", "ATOL protected".

## Decisions and inferences

- Fonts substituted (licensed). Hotel imagery replaced with colour blocks (the brief forbids copying real photos; the live site itself showed "Awaiting image" placeholders in grey).
- Exact hover colour inferred, not measured.
- Checkout progress bar (Holiday · Extras · Guests · Payment) taken from the brief's walkthrough of the booking flow rather than re-walked here.
