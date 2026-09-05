#!/usr/bin/env python3
"""
Scrape cămine de bătrâni din Google Places API — Text Search (New API).

STRATEGIE (vezi docs/scrape-camine-strategy.md):
1. Căutare per ORAȘ (nu per județ) — pentru a evita limita de 60 rezultate
2. 4 query-uri principale per oraș (specifice, nu generice)
3. Filtru pozitiv: păstrăm DOAR dacă numele conține cuvinte cheie cămin
4. Filtru negativ: excludem copii, câini, DGASPC, farmacii, etc.
5. Deduplicare după placeId + name normalizat
6. Intrări ambigue marcate pentru verificare manuală

Usage:
  python3 scripts/scrape-camine.py
  python3 scripts/scrape-camine.py --judet "Cluj"
  python3 scripts/scrape-camine.py --dry-run
"""

import json
import os
import sys
import time
import re
import argparse
import urllib.request
import urllib.parse
from pathlib import Path
from datetime import datetime

# ─── Config ───────────────────────────────────────────────────────────────────

REPO = Path(__file__).parent.parent
EXISTING_FILE = REPO / "src" / "data" / "camine-director.json"
OUTPUT_FILE = REPO / "src" / "data" / "camine-new-found.json"
PROGRESS_FILE = REPO / "src" / "data" / "camine-scrape-progress.json"
REVIEW_FILE = REPO / "src" / "data" / "camine-needs-review.json"

# Load API key from .env.local
API_KEY = ""
env_local = REPO / ".env.local"
if env_local.exists():
    for line in env_local.read_text().splitlines():
        if line.startswith("GOOGLE_MAPS_API_KEY="):
            API_KEY = line.split("=", 1)[1].strip()
            break

if not API_KEY:
    print("ERROR: No GOOGLE_MAPS_API_KEY in .env.local")
    sys.exit(1)

# Legacy Text Search endpoint (Places API (New) not enabled on this project)
TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"

# ─── Query patterns ───────────────────────────────────────────────────────────
# Doar 4 query-uri per oraș — specifice, cu "bătrâni" în query
QUERY_PATTERNS = [
    "cămin de bătrâni {city}",
    "azil de bătrâni {city}",
    "centru de îngrijire bătrâni {city}",
    "casă de bătrâni {city}",
]

# ─── Orașe per județ ──────────────────────────────────────────────────────────
# Reședința de județ + orașe principale (5-10 per județ)
JUDET_ORASE = {
    "Alba": ["Alba Iulia", "Aiud", "Blaj", "Sebeș", "Cugir", "Abrud"],
    "Arad": ["Arad", "Lipova", "Ineu", "Curtici", "Pecica", "Nădlac"],
    "Argeș": ["Pitești", "Câmpulung", "Curtea de Argeș", "Mioveni", "Topoloveni", "Costești"],
    "Bacău": ["Bacău", "Onești", "Moinești", "Comănești", "Buhuși", "Dărmănești"],
    "Bihor": ["Oradea", "Salonta", "Marghita", "Beiuș", "Aleșd", "Valea lui Mihai"],
    "Bistrița-Năsăud": ["Bistrița", "Năsăud", "Beclean", "Sângeorz-Băi"],
    "Botoșani": ["Botoșani", "Dorohoi", "Darabani", "Săveni", "Flămânzi"],
    "Brașov": ["Brașov", "Făgăraș", "Săcele", "Zărnești", "Râșnov", "Codlea"],
    "Brăila": ["Brăila", "Ianca", "Însurăței", "Făurei"],
    "București": ["București Sector 1", "București Sector 2", "București Sector 3",
                   "București Sector 4", "București Sector 5", "București Sector 6"],
    "Buzău": ["Buzău", "Râmnicu Sărat", "Nehoiu", "Pătârlagele"],
    "Caraș-Severin": ["Reșița", "Caransebeș", "Bocșa", "Oravița", "Moldova Nouă"],
    "Călărași": ["Călărași", "Oltenița", "Budești", "Lehliu Gară"],
    "Cluj": ["Cluj-Napoca", "Turda", "Câmpia Turzii", "Dej", "Gherla", "Huedin", "Florești"],
    "Constanța": ["Constanța", "Mangalia", "Năvodari", "Medgidia", "Cernavodă", "Eforie"],
    "Covasna": ["Sfântu Gheorghe", "Târgu Secuiesc", "Covasna", "Baraolt"],
    "Dâmbovița": ["Târgoviște", "Moreni", "Pucioasa", "Găești", "Răcari", "Titu"],
    "Dolj": ["Craiova", "Calafat", "Băilești", "Filiași", "Bechet"],
    "Galați": ["Galați", "Tecuci", "Târgu Bujor", "Berești"],
    "Giurgiu": ["Giurgiu", "Bolintin-Vale", "Mihăilești"],
    "Gorj": ["Târgu Jiu", "Motru", "Rovinari", "Bumbești-Jiu", "Tismana"],
    "Harghita": ["Miercurea Ciuc", "Odorheiu Secuiesc", "Gheorgheni", "Toplița", "Cristuru Secuiesc"],
    "Hunedoara": ["Deva", "Hunedoara", "Lupeni", "Petroșani", "Brad", "Orăștie", "Simeria"],
    "Ialomița": ["Slobozia", "Urziceni", "Fetești", "Tândărei", "Amzacea"],
    "Iași": ["Iași", "Pașcani", "Târgu Frumos", "Hârlău", "Podu Iloaiei"],
    "Ilfov": ["Voluntari", "Pantelimon", "Buftea", "Chitila", "Măgurele", "Otopeni",
              "Brănești", "Popești-Leordeni", "Clinceni", "Ciorogarla", "Afumați", "Bragadiru"],
    "Maramureș": ["Baia Mare", "Sighetu Marmației", "Borșa", "Vișeu de Sus", "Baia Sprie"],
    "Mehedinți": ["Drobeta-Turnu Severin", "Orșova", "Baia de Aramă", "Strehaia", "Vanju Mare"],
    "Mureș": ["Târgu Mureș", "Reghin", "Sighișoara", "Târnăveni", "Luduș", "Sovata"],
    "Neamț": ["Piatra Neamț", "Roman", "Târgu Neamț", "Bicaz", "Roznov", "Piatra Neamț"],
    "Olt": ["Slatina", "Caracal", "Balș", "Corabia", "Scornicești"],
    "Prahova": ["Ploiești", "Câmpina", "Mizil", "Sinaia", "Vălenii de Munte", "Boldești-Scăeni"],
    "Sălaj": ["Zalău", "Cehu Silvaniei", "Jibou", "Șimleu Silvaniei"],
    "Satu Mare": ["Satu Mare", "Carei", "Negrești-Oaș", "Tășnad"],
    "Sibiu": ["Sibiu", "Mediaș", "Agnita", "Cisnădie", "Dumbrăveni", "Avrig"],
    "Suceava": ["Suceava", "Fălticeni", "Rădăuți", "Câmpulung Moldovenesc", "Vatra Dornei", "Gura Humorului"],
    "Teleorman": ["Alexandria", "Roșiorii de Vede", "Turnu Măgurele", "Zimnicea", "Videle"],
    "Timiș": ["Timișoara", "Lugoj", "Sânnicolau Mare", "Buziaș", "Jimbolia", "Deta"],
    "Tulcea": ["Tulcea", "Măcin", "Babadag", "Isaccea", "Sulina"],
    "Vâlcea": ["Râmnicu Vâlcea", "Drăgășani", "Călimănești", "Băile Olănești", "Băile Govora"],
    "Vaslui": ["Vaslui", "Bârlad", "Huși", "Murgeni"],
    "Vrancea": ["Focșani", "Adjud", "Panciu", "Mărășești", "Odobesti"],
}

ALL_JUDETE = sorted(JUDET_ORASE.keys())

# ─── Filtre ───────────────────────────────────────────────────────────────────

# Cuvinte cheie PUTERNICE — dacă numele conține oricare, păstrăm automat
STRONG_POSITIVE = [
    "batrani", "bătrâni", "batrân", "bătrân", "batran",
    "varstnic", "vârstnic", "vârstin", "varstnici", "vârstnici",
    "azil", "azilul",
    "senior", "seniori", "seniorilor",
    "batraneti", "bătrâneți", "batrâneți",
    "alzheimer",
    "nursing home", "elderly",
    "casa bunici", "casa bunicilor",
    "persoane vârstn", "persoane varstn",
    "hospice", "paliativ", "palativ",
    "pensionar", "pensionari",
]

# Cuvinte cheie SLABE — păstrăm dar marcăm pentru verificare
WEAK_POSITIVE = [
    "residence", "resedinta", "reziden",
    "home care",
    "ingrijire la domiciliu", "îngrijire la domiciliu",
    "centru de ingrijire", "centru de îngrijire",
    "centrul de ingrijire", "centrul de îngrijire",
    "ingrijire batrani", "îngrijire bătrâni",
    "ingrijiri batrani", "îngrijiri bătrâni",
    "centru rezident", "centru reziden",
    "unitate medico-social", "unitate medico social",
    "centru medico-social", "centru medico social",
    "camin de batrani", "cămin de bătrâni",
    "caminul de batrani", "căminul de bătrâni",
    "azil de batrani", "azil de bătrâni",
    "gazduire", "găzduire",
    "asistenta sociala", "asistență socială",
    "recuperare",
    "ingrijire persoane", "îngrijire persoane",
]

# Cuvinte de EXCLUDERE — chiar dacă are cuvânt pozitiv, excludem
EXCLUDE_KEYWORDS = [
    # Copii
    "copil", "copii", "copilului", "maternal", "creșa", "creșă",
    "elev", "student", "stude", "școlar", "școala", "scoala",
    "plasament", "tineret",
    # Animale
    "câini", "canin", "veterinar", "animal", "adăpost de câini",
    # Boli specifice non-bătrâni
    "autist", "autism",
    # Instituții guvernamentale
    "pensii", "plăți", "platilor", "inspectie", "inspecție",
    "directia", "direcția", "agentia", "agenția",
    "primaria", "primăria", "consiliul", "prefectura", "dgaspc",
    # Non-cazare
    "steriliz", "frizerie", "coafor", "barber", "braids",
    "restaurant", "ceaun", "bancu", "băncu",
    "imobiliare", "construct", "construc",
    "leroy", "kaufland", "lidl", "profi", "carrefour", "dedeman",
    "fitness", "gym", "sport", "basin", "pool",
    "librarie", "florarie", "magazin",
    "transport", "taxi",
    "farmacie", "catena", "sensiblu",
    "biserica", "biserică", "catedrala", "manastira", "mănăstirea",
    "clubul", "asociatia de proprietari", "asociația de proprietari",
    "formare", "evaluare",
    "dans", "art",
]

# Cuvinte care exclud DOAR dacă nu sunt însoțite de cuvânt pozitiv puternic
CONDITIONAL_EXCLUDE = [
    "spital", "policlinica", "dispensar", "laborator",
    "ambulant", "ambulanță",
    "cantina", "cantină",
]


def normalize_name(name):
    """Normalize name for dedup: lowercase, remove diacritics, remove SRL/SC/quotes."""
    n = name.lower().strip()
    # Remove diacritics
    replacements = {
        "ă": "a", "â": "a", "î": "i", "ș": "s", "ț": "t",
        "Ă": "a", "Â": "a", "Î": "i", "Ș": "s", "Ț": "t",
    }
    for k, v in replacements.items():
        n = n.replace(k, v)
    # Remove SRL, SC, quotes, extra spaces
    n = re.sub(r"\b(srl|sc|sa)\b", "", n)
    n = n.replace('"', "").replace("'", "").replace("„", "").replace("”", "")
    n = re.sub(r"\s+", " ", n).strip()
    return n


def has_strong_positive(name):
    nl = name.lower()
    return any(kw in nl for kw in STRONG_POSITIVE)


def has_weak_positive(name):
    nl = name.lower()
    return any(kw in nl for kw in WEAK_POSITIVE)


def has_exclude(name):
    nl = name.lower()
    return any(kw in nl for kw in EXCLUDE_KEYWORDS)


def has_conditional_exclude(name):
    nl = name.lower()
    return any(kw in nl for kw in CONDITIONAL_EXCLUDE)


def classify_entry(name):
    """
    Classify an entry as:
    - 'keep'      : strong positive, no exclude → keep automatically
    - 'review'    : weak positive only, or has conditional exclude → needs manual review
    - 'reject'    : no positive or has hard exclude → skip
    """
    if has_exclude(name):
        return "reject"

    if has_strong_positive(name):
        # Strong positive but check conditional excludes
        if has_conditional_exclude(name):
            # e.g. "spital de bătrâni" — could be relevant, mark for review
            return "review"
        return "keep"

    if has_weak_positive(name):
        return "review"

    return "reject"


# ─── Google Places API ────────────────────────────────────────────────────────

def text_search(query, next_page_token=None):
    """Legacy Text Search — returns list of places + next_page_token."""
    params = {
        "query": query,
        "key": API_KEY,
        "language": "ro",
        "region": "ro",
    }
    if next_page_token:
        params["pagetoken"] = next_page_token

    url = TEXT_SEARCH_URL + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, method="GET")

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            if result.get("status") not in ("OK", "ZERO_RESULTS"):
                print(f"  API status: {result.get('status')} — {result.get('error_message', '')}")
                return [], None
            places = result.get("results", [])
            next_token = result.get("next_page_token")
            return places, next_token
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        print(f"  HTTP {e.code}: {body[:200]}")
        return [], None
    except Exception as e:
        print(f"  Error: {e}")
        return [], None


def get_place_details(place_id):
    """Legacy Place Details — get phone, website, etc."""
    params = {
        "place_id": place_id,
        "key": API_KEY,
        "language": "ro",
        "fields": "name,formatted_address,formatted_phone_number,international_phone_number,website,geometry,rating,user_ratings_total,place_id,url",
    }
    url = PLACE_DETAILS_URL + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, method="GET")

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            if result.get("status") == "OK":
                return result.get("result", {})
            return None
    except:
        return None


# ─── Main ─────────────────────────────────────────────────────────────────────

def log(msg):
    ts = datetime.now().strftime("%H:%M:%S")
    print(f"[{ts}] {msg}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--judet", help="Scrape only this judet")
    parser.add_argument("--dry-run", action="store_true", help="Don't save, just print")
    parser.add_argument("--no-details", action="store_true", help="Skip Place Details (faster)")
    args = parser.parse_args()

    # Load existing data
    with open(EXISTING_FILE) as f:
        existing = json.load(f)

    existing_place_ids = set(c.get("placeId", "") for c in existing if c.get("placeId"))
    existing_names_norm = set(normalize_name(c["name"]) for c in existing)

    log(f"Existing: {len(existing)} entries, {len(existing_place_ids)} placeIds")

    # Load progress + previous results
    progress = {}
    if PROGRESS_FILE.exists():
        progress = json.loads(PROGRESS_FILE.read_text())

    kept = []
    review = []
    if OUTPUT_FILE.exists():
        kept = json.loads(OUTPUT_FILE.read_text())
    if REVIEW_FILE.exists():
        review = json.loads(REVIEW_FILE.read_text())

    existing_new_ids = set(c.get("placeId", "") for c in kept)
    existing_new_ids.update(c.get("placeId", "") for c in review)

    # Select judete
    judete = [args.judet] if args.judet else ALL_JUDETE

    total_queries = 0
    total_kept = 0
    total_review = 0
    total_rejected = 0
    total_skipped_dup = 0

    for judet in judete:
        if judet in progress:
            log(f"⏭️  {judet} — already done")
            continue

        cities = JUDET_ORASE.get(judet, [])
        if not cities:
            log(f"⚠️  {judet} — no cities defined, skipping")
            continue

        judet_kept = 0
        judet_review = 0
        judet_rejected = 0
        judet_skipped = 0
        judet_queries = 0

        for city in cities:
            for pattern in QUERY_PATTERNS:
                query = pattern.format(city=city)
                judet_queries += 1
                total_queries += 1

                places, next_token = text_search(query)

                for p in places:
                    place_id = p.get("place_id", "")
                    name = p.get("name", "")

                    if not name or not place_id:
                        continue

                    # Skip duplicates (existing data)
                    if place_id in existing_place_ids:
                        judet_skipped += 1
                        total_skipped_dup += 1
                        continue
                    if normalize_name(name) in existing_names_norm:
                        judet_skipped += 1
                        total_skipped_dup += 1
                        continue
                    # Skip duplicates (already found in this run)
                    if place_id in existing_new_ids:
                        judet_skipped += 1
                        total_skipped_dup += 1
                        continue

                    # Classify
                    category = classify_entry(name)

                    if category == "reject":
                        judet_rejected += 1
                        total_rejected += 1
                        continue

                    # Get details
                    details = None
                    if not args.no_details:
                        time.sleep(0.3)
                        details = get_place_details(place_id)

                    if not details:
                        details = p

                    entry = {
                        "slug": "",
                        "name": details.get("name", name),
                        "source": "google",
                        "phone": details.get("formatted_phone_number", ""),
                        "internationalPhone": details.get("international_phone_number", ""),
                        "website": details.get("website", ""),
                        "address": details.get("formatted_address", p.get("formatted_address", "")),
                        "lat": details.get("geometry", {}).get("location", {}).get("lat", 0),
                        "lng": details.get("geometry", {}).get("location", {}).get("lng", 0),
                        "judet": judet,
                        "rating": details.get("rating", 0),
                        "reviews": details.get("user_ratings_total", 0),
                        "placeId": place_id,
                        "googleUrl": details.get("url", ""),
                        "licensed": False,
                        "capacity": "",
                        "licenseNumber": "",
                        "licenseDate": "",
                        "cui": "",
                        "serviceType": "",
                        "localitate": city,
                        "tip": "Privat",
                    }

                    if category == "keep":
                        kept.append(entry)
                        existing_new_ids.add(place_id)
                        judet_kept += 1
                        total_kept += 1
                        log(f"  ✅ {entry['name']} ({judet} / {city})")
                    else:  # review
                        entry["reviewReason"] = "weak_positive" if has_weak_positive(name) else "conditional_exclude"
                        review.append(entry)
                        existing_new_ids.add(place_id)
                        judet_review += 1
                        total_review += 1
                        log(f"  🔍 REVIEW: {entry['name']} ({judet} / {city})")

                # Pagination
                while next_token:
                    time.sleep(2)  # Google requires delay for page token
                    places, next_token = text_search(query, next_token)
                    for p in places:
                        place_id = p.get("place_id", "")
                        name = p.get("name", "")
                        if not name or not place_id:
                            continue
                        if place_id in existing_place_ids or place_id in existing_new_ids:
                            judet_skipped += 1
                            total_skipped_dup += 1
                            continue
                        if normalize_name(name) in existing_names_norm:
                            judet_skipped += 1
                            total_skipped_dup += 1
                            continue
                        category = classify_entry(name)
                        if category == "reject":
                            judet_rejected += 1
                            total_rejected += 1
                            continue
                        if not args.no_details:
                            time.sleep(0.3)
                            details = get_place_details(place_id)
                        if not details:
                            details = p
                        entry = {
                            "slug": "",
                            "name": details.get("name", name),
                            "source": "google",
                            "phone": details.get("formatted_phone_number", ""),
                            "internationalPhone": details.get("international_phone_number", ""),
                            "website": details.get("website", ""),
                            "address": details.get("formatted_address", p.get("formatted_address", "")),
                            "lat": details.get("geometry", {}).get("location", {}).get("lat", 0),
                            "lng": details.get("geometry", {}).get("location", {}).get("lng", 0),
                            "judet": judet,
                            "rating": details.get("rating", 0),
                            "reviews": details.get("user_ratings_total", 0),
                            "placeId": place_id,
                            "googleUrl": details.get("url", ""),
                            "licensed": False,
                            "capacity": "",
                            "licenseNumber": "",
                            "licenseDate": "",
                            "cui": "",
                            "serviceType": "",
                            "localitate": city,
                            "tip": "Privat",
                        }
                        if category == "keep":
                            kept.append(entry)
                            existing_new_ids.add(place_id)
                            judet_kept += 1
                            total_kept += 1
                            log(f"  ✅ {entry['name']} ({judet} / {city})")
                        else:
                            entry["reviewReason"] = "weak_positive" if has_weak_positive(name) else "conditional_exclude"
                            review.append(entry)
                            existing_new_ids.add(place_id)
                            judet_review += 1
                            total_review += 1
                            log(f"  🔍 REVIEW: {entry['name']} ({judet} / {city})")

                time.sleep(0.5)

        progress[judet] = {
            "queries": judet_queries,
            "kept": judet_kept,
            "review": judet_review,
            "rejected": judet_rejected,
            "skipped_dup": judet_skipped,
        }

        # Save after each judet
        if not args.dry_run:
            OUTPUT_FILE.write_text(json.dumps(kept, ensure_ascii=False, indent=2))
            REVIEW_FILE.write_text(json.dumps(review, ensure_ascii=False, indent=2))
            PROGRESS_FILE.write_text(json.dumps(progress, ensure_ascii=False, indent=2))

        log(f"📊 {judet}: ✅{judet_kept} 🔍{judet_review} ❌{judet_rejected} ⏭️{judet_skipped} | {judet_queries} queries")
        log(f"   TOTAL: ✅{total_kept} 🔍{total_review} ❌{total_rejected} ⏭️{total_skipped_dup} | {total_queries} queries")

    log(f"\n{'='*60}")
    log(f"FINAL: ✅{total_kept} kept | 🔍{total_review} review | ❌{total_rejected} rejected | ⏭️{total_skipped_dup} dup")
    log(f"Queries: {total_queries}")
    if not args.dry_run:
        log(f"Kept: {OUTPUT_FILE}")
        log(f"Review: {REVIEW_FILE}")


if __name__ == "__main__":
    main()
