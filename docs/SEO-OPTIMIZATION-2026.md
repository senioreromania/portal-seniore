# Ghid SEO Complet — August 2026

## Sursa și context
Documentație bazată pe cercetare actualizată (August 2026) din:
- Google Search Central — ghid oficial "Optimizing for generative AI features on Google Search" (Mai 2026)
- Google May 2026 Core Update (completat 2 Iunie 2026)
- Google June 2026 Spam Update (completat 26 Iunie 2026)
- Leaked Google Content Warehouse API (Mai 2024) — 14.000+ atribute interne
- Next.js 16 App Router SEO best practices (2026)

---

## 1. Factori de ranking Google 2026

### Cele 5 categorii principale

| Categorie | Atribute Google interne | Ce înseamnă |
|---|---|---|
| **Domain Authority** | `siteAuthority`, `chromeInTotal` | Autoritatea site-ului bazată pe backlinks + date Chrome |
| **Topical Authority** | `siteFocusScore`, `siteRadius` | Concentrarea pe un subiect — paginile în afara "radiusului" topicale sunt penalizate |
| **Document Quality** | `titlematchScore`, `contentEffort`, `pandaDemotion` | Calitatea conținutului, efortul uman perceput, penalizări pentru conținut subțire/duplicat |
| **Freshness** | `lastSignificantUpdate` | Actualizări substantiale (~30% schimbare) la 3-6 luni pentru paginile prioritare |
| **Engagement** | `navBoost`, `clutterScore`, `violatesMobileInterstitialPolicy` | CTR, satisfacție post-click, densitatea de pop-ups/interstitials |

### Ce penalizează Google în 2026
- Conținut "commodity" (sumarizări ale altor surse, fără valoare adăugată)
- `pandaDemotion` — conținut subțire sau duplicat
- `clutterScore` ridicat — prea multe pop-ups, interstitials, reclame
- Violări ale politicii mobile interstitials
- Scaled content abuse (volume mari de pagini cu valoare mică)

---

## 2. Google AI Overviews & AI Mode

### Ghidul oficial Google (Mai 2026)

Google a publicat ghidul oficial "Optimizing for generative AI features on Google Search" la I/O 2026.

**Regula de bază:** AI Overviews folosesc același index și aceleași sisteme de ranking ca search-ul tradițional. Nu există "AI SEO" separat.

### Ce funcționează pentru AI Overviews
1. **SEO fundamental** — crawlability, site structure, mobile, page speed, internal linking
2. **Conținut "non-commodity"** — experiență reală, date originale, expertiză
3. **Semnale locale** — Google Business Profile, recenzii, consistența citărilor
4. **Schema markup complet** — paginile cu >76% schema completeness au 53.9% rată de citare vs 43.6% fără schema
5. **Ranking organic top 20** — paginile în top 20 organic sunt 34x mai probabile să fie citate

### Ce NU funcționează (Mythbusting Google)
- `llms.txt` — Google îl tratează ca orice fișier text, fără tratament special
- Content chunking — nu trebuie să spargi conținutul în bucăți mici
- AI-specific rewriting — Google înțelege sinonime, nu e nevoie de rewrites
- Schema/Mardown special pentru AI — nu e necesar
- Mențiuni inautentice de brand — tratate ca spam

### Structură optimă pentru AI citations
- Fiecare secțiune H2 începe cu un **answer capsule** de 40-60 cuvinte
- Secțiuni H2 între 134-167 cuvinte (unitatea optimă de extracție)
- Un claim per paragraf, 60-100 cuvinte
- Tabele de comparație pentru date structurate
- TL;DR block de 40-60 cuvinte lângă H1
- Pagina se termină cu: Related Guides, Key Takeaways (4-6 bullets), FAQ (3-5 Q&A)

---

## 3. Core Web Vitals 2026

| Metric | Ce măsoară | Target "Good" | Target "Poor" |
|---|---|---|---|
| **LCP** | Largest Contentful Paint — viteză încărcare | ≤ 2.5s | > 4.0s |
| **INP** | Interaction to Next Paint — interactivitate | ≤ 200ms | > 500ms |
| **CLS** | Cumulative Layout Shift — stabilitate vizuală | ≤ 0.1 | > 0.25 |

### Optimizare LCP
- Folosește `next/image` cu `priority` pentru imaginea LCP
- `font-display: swap` (deja configurat în Next.js)
- TTFB < 600ms
- Preload key fonts

### Optimizare INP (cea mai grea de trecut — 43% rate de eșec)
- Minimizează main-thread blocking
- Code-splitting, defer JS non-critic
- React 18+ concurrent rendering
- Debounce input handlers

### Optimizare CLS
- Rezervă spațiu pentru imagini/ads (width/height)
- Evită DOM injectat târziu
- `next/image` rezolvă automat aspect ratio

---

## 4. Next.js 16 SEO — Best Practices

### Metadata API
- **`metadataBase`** OBLIGATORIU în `app/layout.tsx` — fără el, canonical și OG URLs sunt relative
- Title: 50-60 caractere, format `Primary Keyword — Brand Name`
- `title.template` pentru a evita duplicarea brand-ului
- Fiecare pagină indexabilă trebuie să aibă title + description UNICE
- Canonical pe TOATE paginile

### Server Components vs Client Components
- **Regula de aur:** Conținutul SEO (headings, body copy, JSON-LD) trăiește în Server Components
- `"use client"` doar pentru interactivitate (forms, motion, maps)
- `"use client"` la nivel de layout promovează TOT ce e sub el la client — evită

### File Conventions (Next.js 16)
- `opengraph-image.tsx` — generează OG image dinamică per pagină
- `twitter-image.tsx` — Twitter card image
- `sitemap.ts` — sitemap dinamic
- `robots.ts` — robots.txt dinamic
- `manifest.ts` — PWA manifest
- `favicon.ico`, `icon.png`, `apple-icon.png` — auto-detectate

### Dynamic OG Images (opengraph-image.tsx)
- Folosește `next/og` (Satori + Resvg) — zero dependențe externe
- Inline styles ONLY (nu Tailwind, nu CSS-in-JS)
- Flexbox layout only (nu CSS Grid)
- Fonturi locale ca ArrayBuffer
- 1200x630px dimensiune standard
- Auto-injectează `og:image`, `og:image:width`, `og:image:height`, `twitter:image`

### Sitemap
- Max 50,000 URL-uri per sitemap
- Folosește `lastModified` REAL (nu `new Date()`)
- NU include pagini `noindex`
- NU include redirect URLs
- Submit în Google Search Console + Bing Webmaster Tools
- `export const revalidate = 3600` pentru cache

### Caching (Next.js 16)
- `"use cache"` directives și explicit cache profiles
- Atenție: conținut stale poate fi servit către Googlebot
- Pagina care render-ează fresh în dev poate servi HTML vechi în producție

---

## 5. Structured Data (JSON-LD) 2026

### Schema obligatorii

| Schema Type | Unde | Prioritate |
|---|---|---|
| **Organization** + sameAs | Homepage | Critic |
| **BreadcrumbList** | Toate paginile non-home | Critic |
| **Article / NewsArticle** + Person (author) | Blog/știri | High |
| **FAQPage** | Ghiduri, Q&A | High (drive AI citations) |
| **LocalBusiness** | Pagini locale | High |
| **NursingHome** | Pagini cămine | High |
| **ItemList** | Listări | Medium |
| **CollectionPage** | Pagini de categorie | Medium |

### Validare
- Google Rich Results Test
- Schema.org validator
- Structured data trebuie să fie în HTML inițial (Server Component), nu după hidratare

### FAQPage — ATENȚIE
Google a eliminat FAQ rich results pentru majoritatea site-urilor în August 2023. În 2026, FAQ expandable snippets sunt limitate la surse guvernamentale și de sănătate autoritate. Dar FAQPage schema este încă valoroasă pentru AI Overviews citations.

---

## 6. Robots.txt & AI Crawlers 2026

### Crawleri AI — decizii separate

| User-Agent | Operator | Scop | Permite? |
|---|---|---|---|
| `GPTBot` | OpenAI | Training | Opțional |
| `OAI-SearchBot` | OpenAI | Search/citation | **DA** |
| `ChatGPT-User` | OpenAI | On-demand fetch | **DA** |
| `ClaudeBot` | Anthropic | Training | Opțional |
| `Claude-SearchBot` | Anthropic | Search/citation | **DA** |
| `PerplexityBot` | Perplexity | Search/citation | **DA** |
| `Perplexity-User` | Perplexity | On-demand fetch | **DA** |
| `Google-Extended` | Google | Gemini training | Opțional |
| `CCBot` | Common Crawl | Dataset | Opțional |
| `meta-externalagent` | Meta | Training | Opțional |

### Regulă: Permite retrieval crawlers, decide separat pentru training crawlers
- Blocarea `OAI-SearchBot` / `PerplexityBot` / `Claude-SearchBot` = invizibil în AI search
- Blocarea `GPTBot` / `ClaudeBot` = nu mai ești în corpus de training, dar rămâi citabil

### Implementare recomandată pentru Seniore.ro
```
# Permite AI search crawlers (pentru citări în AI Overviews, ChatGPT, Perplexity)
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# Permite training crawlers (pentru maximă distribuție)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: meta-externalagent
Allow: /
```

---

## 7. Checklist implementare Seniore.ro

### ✅ Deja implementat
- [x] Metadata API cu title, description, OG, Twitter cards
- [x] Canonical URLs pe toate paginile
- [x] `metadataBase` configurat
- [x] Structured data: WebSite, NursingHome, BreadcrumbList, ItemList, CollectionPage, FAQPage, NewsArticle
- [x] Sitemap dinamic cu toate URL-urile
- [x] Robots.txt cu disallow pentru /cont, /admin, /login, /api
- [x] `noindex` pe paginile admin/cont
- [x] Lang `ro` pe `<html>`
- [x] Fonturi cu `display: swap` (Inter, Playfair Display)
- [x] OG image 1200x630
- [x] GA cu consent cookie (GDPR)

### ❌ De implementat

#### Prioritate HIGH
1. **`<img>` → `next/image`** pe cardurile premium din homepage
2. **Robots.txt — adaugă AI crawlers** (OAI-SearchBot, Claude-SearchBot, PerplexityBot, etc.)
3. **Sitemap `lastModified` real** — folosește `licenseDate` pentru cămine, data articolului pentru știri
4. **Breadcrumbs vizibile** pe pagini (nu doar JSON-LD)
5. **`noindex` pe `/camine/[...oldslug]`** (redirect page)
6. **Dynamic OG images** — `opengraph-image.tsx` per pagină de cămin

#### Prioritate MEDIUM
7. **Manifest.json** pentru PWA/mobile
8. **Favicon optimizat** — multi-size (16x16, 32x32, 180x180)
9. **`hreflang` pe paginile principale** (nu doar homepage)
10. **TL;DR block** pe paginile de știri (40-60 cuvinte lângă H1)
11. **Answer capsules** la începutul fiecărei secțiuni H2 pe paginile de conținut

#### Prioritate LOW
12. **Google Search Console** — submit sitemap + monitorizare
13. **Bing Webmaster Tools** — submit sitemap
14. **PageSpeed Insights** — audit pe top 10 pagini
15. **Content freshness** — actualizări la 3-6 luni pentru paginile prioritare

---

## 8. Măsurare și monitorizare

### Tool-uri
- **Google Search Console** — indexare, Core Web Vitals, clicks, impressions
- **Bing Webmaster Tools** — indexare Bing (feed Copilot)
- **PageSpeed Insights** — LCP, INP, CLS pe pagini individuale
- **Google Rich Results Test** — validare structured data
- **Schema.org validator** — validare JSON-LD

### Metrici de urmărit
- Impressions și clicks în GSC
- Poziții medii pentru keywords prioritare
- Core Web Vitals (LCP, INP, CLS) — field data, nu lab data
- Număr de URL-uri indexate vs totale
- AI Overview citations (monitorizare manuală pentru queries relevante)

---

*Document actualizat: August 2026*
*Surse: Google Search Central, Search Engine Land, Semrush, WordStream, Varnox, Crawlix, DebugBear, HubSpot, Shadow.inc*
