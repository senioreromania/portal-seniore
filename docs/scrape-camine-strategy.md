# Strategie scraping cămine de bătrâni din Google Places API

## Problema

Google Places API **NU** are un place type specific pentru "nursing home" sau "elderly care".
Tipurile disponibile din Table A cele mai apropiate sunt: `hospital`, `doctor`, `health`,
`medical_clinic`, `general_hospital` — dar niciunul nu filtrează cămine de bătrâni.

Singura metodă este **Text Search** — care caută după cuvinte în numele/descrierea locației.
Text Search returnează maxim **60 rezultate per query** (3 pagini × 20).

## Limitări Text Search

1. **Max 60 rezultate per query** (3 pagini × 20 results)
2. **Fără filtru de tip** pentru cămine de bătrâni
3. **Zgomot mare**: "cămin de bătrâni București" returnează și DGASPC, agenții, direcții,
   protecția copilului, adăposturi de câini, farmacii, etc.
4. **Duplicări**: aceeași locație apare în query-uri diferite
5. **Rezultate irelevante**: Google returnează ce consideră el relevant, nu exact ce ceri

## Strategia corectă

### 1. Query-uri specifice (nu generice)

NU folosi query-uri generice precum "ingrijire batrani {judet}" — returnează prea mult zgomot.
Folosește query-uri care conțin EXACT cuvintele pe care le-ar avea un cămin în nume:

**Query-uri principale (maxim 60 rezultate each, cel mai probabil relevante):**
- `cămin de bătrâni {oraș}`
- `azil de bătrâni {oraș}`
- `centru de îngrijire bătrâni {oraș}`
- `casă de bătrâni {oraș}`

**Query-uri secundare (mai zgomotoase, necesită filtrare):**
- `pensiune pentru bătrâni {oraș}`
- `centru rezidențial persoane vârstnice {oraș}`
- `home care bătrâni {oraș}`

### 2. Căutare per ORAȘ, nu per JUDEȚ

Căutarea per județ returnează doar 60 rezultate pentru tot județul — dacă un județ are
200+ cămine (ca București/Ilfov), pierdem majoritatea.

Soluția: căutăm per **oraș** din fiecare județ. Pentru București, căutăm per sector.
Pentru Ilfov, căutăm în fiecare oraș: Voluntari, Pantelimon, Bragadiru, etc.

### 3. Filtru pozitiv (obligatoriu)

După ce primim rezultatele, păstrăm DOAR intrări care conțin cel puțin un cuvânt cheie
în nume:

**Cuvinte cheie puternice (păstrăm automat):**
- batrani, bătrâni, batrân, bătrân
- varstnic, vârstnic, varstnici, vârstnici
- azil, azilul
- senior, seniori, seniorilor
- batraneti, bătrâneți
- alzheimer
- nursing home, elderly
- pensiune pentru batrani / bătrâni
- casa bunici, casa bunicilor
- camin de batrani, cămin de bătrâni
- centru de ingrijire, centru de îngrijire
- ingrijire batrani, îngrijire bătrâni
- centru rezident, centru reziden
- persoane vârstn, persoane varstn
- unitate medico-social, unitate medico social
- centru medico-social, centru medico social
- hospice, paliativ, palativ
- pensionar, pensionari

**Cuvinte cheie slabe (păstrăm dar marcăm pentru verificare):**
- residence, resedinta, reziden
- home care
- ingrijire la domiciliu, îngrijire la domiciliu
- asistenta sociala, asistență socială (dacă + vârstnic)
- recuperare (dacă + vârstnic/bătrâni)

### 4. Filtru negativ (excludere automată)

Chiar dacă numele conține un cuvânt pozitiv, excludem dacă conține și:

- copil, copii, copilului, copii, maternal, creșa, creșă
- handicap, dezabilitat, dizabilitat (dacă NU conține și vârstnic/bătrâni)
- câini, canin, veterinar, animal, adăpost de câini
- elev, student, stude, școlar, școala, scoală
- autist, autism
- pensii (casa de pensii ≠ cămin)
- plăți, platilor, inspectie, inspecție
- directia, direcția, agentia, agenția
- primaria, primăria, consiliul, prefectura
- steriliz, frizerie, coafor, barber, braids
- restaurant, ceaun, bancu, băncu
- imobiliare, construct, construc
- leroy, kaufland, lidl, profi, carrefour, dedeman
- fitness, gym, sport, basin, pool
- librarie, florarie, magazin
- transport, taxi, ambulant (dacă NU conține și vârstnic/bătrâni)
- spital, policlinica, dispensar, laborator (dacă NU conține și vârstnic/bătrâni)
- farmacie, catena, sensiblu
- biserica, biserică, catedrala, manastirea, mănăstirea
- clubul, asociatia de proprietari
- cantina, cantină (dacă NU conține și vârstnic/bătrâni)
- formare, evaluare
- plasament (centru de plasament = copii)

### 5. Verificare manuală pentru intrări ambigue

Intrările cu cuvinte cheie "slabe" sau cu scor 0 recenzii și 0 telefon sunt marcate
pentru verificare manuală înainte de a fi adăugate.

### 6. Deduplicare

- După `placeId` (Google ID unic)
- După `name` normalizat (lowercase, fără diacritice, fără "SRL", "SC", ghilimele)
- După `phone` (dacă există)

## Date existente

- **1473 cămine** în `src/data/camine-director.json`
  - 903 din Google (cu placeId)
  - 473 din PDF (lista MMJS, fără placeId)
  - 97 merged (apăreau în ambele surse)
- **930 placeId-uri unice** deja în baza noastră

## Plan execuție

1. Pentru fiecare județ (42 total), identifică orașele principale (5-10 per județ)
2. Pentru fiecare oraș, rulează 4 query-uri principale
3. Aplică filtru pozitiv + negativ
4. Deduplică față de datele existente (placeId + name)
5. Pentru intrările rămase, ia Place Details (telefon, website, coordonate)
6. Marchează intrările ambigue pentru verificare manuală
7. Salvează în `src/data/camine-new-found.json`
8. După verificare manuală, merge în `camine-director.json`

## Cost estimat

- Text Search: $0.032 per request (New API)
- Place Details: $0.040 per request
- ~42 județe × 7 orașe × 4 query-uri = ~1176 Text Search = ~$37
- ~200 intrări noi × Place Details = ~$8
- **Total estimat: ~$45**
