<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Portal Cămine de Bătrâni — Istoric modificări

## Sesiune 9 August 2026

### 1. Reordonare secțiuni Homepage (`src/app/home-client.tsx`)

- **Înainte**: Hero → Județe → Featured (licențiate) → CTA → Premium → Știri → SEO
- **După**: Hero → Județe → **Cămine de bătrâni PREMIUM** → **CTA** → **Cămine licențiate** → Știri → SEO
- Secțiunea CTA ("Ești furnizor de servicii sociale?") mutată între Premium și Licențiate
- CTA schimbat de la fundal navy (`bg-navy-deep`) la fundal paper (`bg-paper`) cu text navy-deep

### 2. Redenumire titluri secțiuni Homepage

- "Cămine premium de bătrâni" → **"Cămine de bătrâni PREMIUM"**
- "Cămine licențiate recomandate" → **"Cămine licențiate"**

### 3. Background secțiuni Homepage

- Ambele secțiuni (Premium + Licențiate) au acum fundal auriu (`bg-gold/20` cu gradient `from-gold/20 via-gold/10 to-[#b8964f]/10`) — identic cu header-ul de pe paginile de județ
- Textele schimbate de la `text-paper` (alb) la `text-navy-deep` (negru) pentru contrast pe fundal auriu
- Badge "Top recomandate" schimbat la `bg-navy-deep/10` cu text `text-navy-deep`

### 4. Optimizare SEO pagini județ și oraș (`src/lib/seo.ts`)

Conform regulilor Google 2025-2026 (documentat din surse externe):

- **Title tags**: 49-55 chars (sub 60), keyword principal în primele 30-40 chars
  - Judet: `Cămine de bătrâni {judet} — {count} centre de îngrijire`
  - Oras: `Cămine de bătrâni {oras}, {judet} — {count} centre`
  - Folosit `title: { absolute: title }` pentru a bypass template-ul global (`| Portal Cămine de Bătrâni`)
- **Meta descriptions**: 117-127 chars (sub 160), mesaj important în primele 120 chars
  - Judet: `Cămine de bătrâni în {judet}. Prețuri cămine de bătrâni {judet}, telefon, hartă și licență MMJS. Găsește cămin de bătrâni în {judet}.`
  - Oras: `Cămine de bătrâni în {oras}, {judet}. Prețuri cămine de bătrâni {oras}, telefon, hartă și licență MMJS. Găsește cămin de bătrâni în {oras}.`
- **Reguli aplicate**:
  - Toate textele încep cu **"Cămine de bătrâni"** — fără "azile" în description
  - Description nu duplică title (extinde cu info diferită)
  - Capitalizare consistentă între H1 și title (lowercase "bătrâni")
  - Unic per URL (nu boilerplate cu swap de oraș)

### 5. Optimizare SEO pagina filtru `/camine?judet=` (`src/app/camine/page.tsx`)

- Title și description aduse la același format ca paginile de județ
- Folosit `title: { absolute: title }` pentru bypass template

### Fișiere modificate

- `src/app/home-client.tsx` — reordonare secțiuni, redenumire titluri, background auriu, text navy-deep
- `src/lib/seo.ts` — `buildJudetMetadata()`, `buildOrasMetadata()` optimizate SEO 2026
- `src/app/camine/page.tsx` — `generateMetadata` pentru filtru judet optimizat
