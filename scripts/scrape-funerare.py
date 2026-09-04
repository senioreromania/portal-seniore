#!/usr/bin/env python3
"""
Scrape servicii funerare din România folosind Google Places API (Text Search).

Pentru fiecare județ, căutăm în orașele principale cu query-uri:
- "servicii funerare"
- "pompe funebre"
- "case funerare"
- "crematoriu"
- "cimitir"

Google Places Text Search returnează max 60 rezultate per query (3 pagini × 20).
Dedupează după placeId. Salvează în src/data/funerare-director.json.

Usage:
  python3 scripts/scrape-funerare.py [--dry-run] [--judet "Cluj"] [--max-pages 3]

Cost estimat: ~$0.017 per Text Search request. Cu ~500 orașe × 5 query-uri × 3 pagini = ~7500 request-uri = ~$127
"""

import json
import os
import sys
import time
import hashlib
import argparse
import urllib.request
import urllib.parse
from pathlib import Path

# ─── Config ───────────────────────────────────────────────────────────────────

OUTPUT_FILE = Path(__file__).parent.parent / "src" / "data" / "funerare-director.json"
PROGRESS_FILE = Path(__file__).parent.parent / "src" / "data" / "funerare-progress.json"

QUERIES = [
    "servicii funerare",
    "pompe funebre",
    "case funerare",
    "crematoriu",
    "cimitir",
]

# Orașe principale per județ (pentru acoperire maximă)
# Combinat cu reședința de județ + orașe mari
JUDET_ORASE = {
    "Alba": ["Alba Iulia", "Aiud", "Blaj", "Sebeș", "Cugir"],
    "Arad": ["Arad", "Lipova", "Ineu", "Curtici", "Pecica"],
    "Argeș": ["Pitești", "Câmpulung", "Curtea de Argeș", "Mioveni", "Topoloveni"],
    "Bacău": ["Bacău", "Onești", "Moinești", "Buhuși", "Comănești"],
    "Bihor": ["Oradea", "Salonta", "Marghita", "Beiuș", "Aleșd"],
    "Bistrița-Năsăud": ["Bistrița", "Năsăud", "Beclean", "Sângeorz-Băi"],
    "Botoșani": ["Botoșani", "Dorohoi", "Darabani", "Săveni", "Flămânzi"],
    "Brașov": ["Brașov", "Făgăraș", "Săcele", "Zărnești", "Râșnov"],
    "Brăila": ["Brăila", "Ianca", "Însurăței", "Făurei"],
    "București": ["București Sector 1", "București Sector 2", "București Sector 3",
                   "București Sector 4", "București Sector 5", "București Sector 6"],
    "Buzău": ["Buzău", "Râmnicu Sărat", "Ploiești", "Nehoiu", "Pătârlagele"],
    "Caraș-Severin": ["Reșița", "Caransebeș", "Bocșa", "Oravița", "Moldova Nouă"],
    "Călărași": ["Călărași", "Oltenița", "Budești", "Lehliu Gară"],
    "Cluj": ["Cluj-Napoca", "Turda", "Câmpia Turzii", "Dej", "Gherla", "Huedin"],
    "Constanța": ["Constanța", "Mangalia", "Năvodari", "Medgidia", "Cernavodă", "Eforie"],
    "Covasna": ["Sfântu Gheorghe", "Târgu Secuiesc", "Covasna", "Baraolt"],
    "Dâmbovița": ["Târgoviște", "Moreni", "Pucioasa", "Găești", "Răcari"],
    "Dolj": ["Craiova", "Calafat", "Băilești", "Filiași", "Bechet"],
    "Galați": ["Galați", "Tecuci", "Târgu Bujor", "Berești"],
    "Giurgiu": ["Giurgiu", "Bolintin-Vale", "Mihăilești"],
    "Gorj": ["Târgu Jiu", "Motru", "Rovinari", "Bumbești-Jiu", "Tismana"],
    "Harghita": ["Miercurea Ciuc", "Odorheiu Secuiesc", "Gheorgheni", "Toplița", "Cristuru Secuiesc"],
    "Hunedoara": ["Deva", "Hunedoara", "Lupeni", "Petroșani", "Brad", "Orăștie", "Simeria"],
    "Ialomița": ["Slobozia", "Urziceni", "Fetești", "Amzacea", "Căzănești"],
    "Iași": ["Iași", "Pașcani", "Târgu Frumos", "Hârlău", "Podu Iloaiei"],
    "Ilfov": ["Voluntari", "Pantelimon", "Buftea", "Chitila", "Măgurele", "Otopeni", "Brănești"],
    "Maramureș": ["Baia Mare", "Sighetu Marmației", "Borșa", "Vișeu de Sus", "Baia Sprie"],
    "Mehedinți": ["Drobeta-Turnu Severin", "Orșova", "Baia de Aramă", "Strehaia", "Vanju Mare"],
    "Mureș": ["Târgu Mureș", "Reghin", "Sighișoara", "Târnăveni", "Luduș"],
    "Neamț": ["Piatra Neamț", "Roman", "Târgu Neamț", "Bicaz", "Roznov"],
    "Olt": ["Slatina", "Caracal", "Balș", "Corabia", "Scornicești"],
    "Prahova": ["Ploiești", "Câmpina", "Râșnov", "Mizil", "Sinaia", "Vălenii de Munte"],
    "Sălaj": ["Zalău", "Cehu Silvaniei", "Jibou", "Șimleu Silvaniei"],
    "Satu Mare": ["Satu Mare", "Carei", "Negrești-Oaș", "Tășnad", "Ardud"],
    "Sibiu": ["Sibiu", "Mediaș", "Cisnădie", "Agnita", "Dumbrăveni", "Avrig"],
    "Suceava": ["Suceava", "Fălticeni", "Rădăuți", "Câmpulung Moldovenesc", "Vatra Dornei", "Gura Humorului"],
    "Teleorman": ["Alexandria", "Roșiorii de Vede", "Turnu Măgurele", "Zimnicea", "Videle"],
    "Timiș": ["Timișoara", "Lugoj", "Sânnicolau Mare", "Jimbolia", "Buziaș", "Făget"],
    "Tulcea": ["Tulcea", "Măcin", "Babadag", "Isaccea", "Sulina"],
    "Vâlcea": ["Râmnicu Vâlcea", "Drăgășani", "Călimănești", "Băile Olănești", "Horezu"],
    "Vaslui": ["Vaslui", "Bârlad", "Huși", "Murgeni", "Negrești"],
    "Vrancea": ["Focșani", "Adjud", "Galați", "Mărășești", "Odobești", "Panciu"],
}

# ─── Helpers ──────────────────────────────────────────────────────────────────

def _get_key_from_env():
    """Read API key from .env.local or environment"""
    env_key = os.environ.get("GOOGLE_MAPS_API_KEY")
    if env_key:
        return env_key
    env_path = Path(__file__).parent.parent / ".env.local"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith("GOOGLE_MAPS_API_KEY="):
                return line.split("=", 1)[1].strip()
    return None

API_KEY = _get_key_from_env()

def slugify(name):
    """Create URL-friendly slug from name"""
    import unicodedata
    s = unicodedata.normalize("NFKD", name)
    s = s.encode("ascii", "ignore").decode("ascii")
    s = s.lower().strip()
    s = s.replace("&", "si")
    s = "".join(c for c in s if c.isalnum() or c == " ")
    s = s.strip().replace(" ", "-")
    s = "-".join(w for w in s.split("-") if w)
    return s

def extract_judet_from_address(address, fallback_judet):
    """Try to extract judet from address, fallback to query judet"""
    if not address:
        return fallback_judet
    # Address format: "Strada X 12, 12345 Oraș, Județ"
    parts = [p.strip() for p in address.split(",")]
    for part in reversed(parts):
        # Check if part matches a judet name (with diacritics)
        for judet in JUDET_ORASE.keys():
            if judet.lower() in part.lower():
                return judet
    return fallback_judet

def extract_localitate(address, judet):
    """Extract localitate from address"""
    if not address:
        return ""
    parts = [p.strip() for p in address.split(",")]
    # Usually: "Strada X 12, 12345 Oraș, Județ"
    # Localitate is in the part with postal code or before judet
    for part in parts:
        # Remove postal code
        clean = part.replace(part.split()[0] if part.split() and part.split()[0].isdigit() else "", "").strip()
        if clean and judet.lower() not in clean.lower() and "romania" not in clean.lower():
            return clean
    return ""

def classify_tip(name, query):
    """Classify the type of funeral service"""
    name_lower = name.lower()

    # Exclude false positives — these are NOT funeral services
    exclude_keywords = [
        "incinerare animale", "incineratoare animale", "crematoriu animale",
        "curățătorie", "curatatorie", "penitenciar", "spital",
        "restaurant", "florărie", "florarie",
    ]
    for kw in exclude_keywords:
        if kw in name_lower:
            return None  # Skip this entry

    # Crematoriu uman — must contain "cremator" but NOT "animale"
    if "cremator" in name_lower and "animale" not in name_lower:
        return "crematoriu"
    if "incinerare" in name_lower and "animale" not in name_lower:
        return "crematoriu"

    # Cimitir
    if "cimitir" in name_lower or "cemetery" in name_lower:
        return "cimitir"

    # Pompe funebre / case funerare / servicii funerare
    funerare_keywords = [
        "pompe funebre", "pompe funebr", "case funerare", "casa funerara",
        "servicii funerare", "funerare", "funerar", "parastas",
        "repatriere", "repatrieri", "transport decedat",
    ]
    for kw in funerare_keywords:
        if kw in name_lower:
            return "pompe_funebre"

    # Default based on query used
    if "cimitir" in query:
        return "cimitir"
    if "cremator" in query:
        return "crematoriu"
    return "pompe_funebre"

def is_in_judet(address, target_judet):
    """Check if the address is actually in the target judet"""
    if not address:
        return True  # Keep if no address to check
    address_lower = address.lower()
    judet_lower = target_judet.lower()

    # Direct match — judet name in address
    if judet_lower in address_lower:
        return True

    # București sectors
    if target_judet == "București":
        bucharest_patterns = ["bucurești", "bucuresti", "sector 1", "sector 2",
                              "sector 3", "sector 4", "sector 5", "sector 6"]
        return any(p in address_lower for p in bucharest_patterns)

    # Check if any city from this judet appears in the address
    orase = JUDET_ORASE.get(target_judet, [])
    for oras in orase:
        if oras.lower() in address_lower:
            return True

    # Ilfov — often shows as commune names
    if target_judet == "Ilfov":
        ilfov_orase = ["voluntari", "pantelimon", "buftea", "chitila",
                       "măgurele", "magurele", "otopeni", "brănești", "branești",
                       "ilfov", "1 decembrie", "studențești", "studentesti",
                       "dragomirești", "dragomiresti", "chiajna", "dobroești",
                       "dobroesti", "popești-leordeni", "popesti-leordeni",
                       "mogoșoaia", "mogosoaia", "peris", "periș", "ciorogârla",
                       "ciorogarla", "darasti", "dărăști", "dragomirești-vale",
                       "dragomiresti-vale", "jilava", "bragadiru", "chiajna"]
        return any(o in address_lower for o in ilfov_orase)

    return False

# ─── Google Places API ────────────────────────────────────────────────────────

def text_search(query, location=None, page_token=None):
    """Google Places Text Search API"""
    base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": query,
        "key": API_KEY,
        "language": "ro",
        "region": "ro",
    }
    if location:
        params["location"] = location
        params["radius"] = 50000  # 50km
    if page_token:
        params["pagetoken"] = page_token

    url = base_url + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read())
    return data

def get_place_details(place_id):
    """Google Places Details API — get phone, website"""
    base_url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        "key": API_KEY,
        "language": "ro",
        "fields": "formatted_phone_number,international_phone_number,website,formatted_address,geometry,name,rating,user_ratings_total,place_id,url",
    }
    url = base_url + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read())
    return data.get("result", {})

# ─── Progress tracking ────────────────────────────────────────────────────────

def load_progress():
    if PROGRESS_FILE.exists():
        return json.loads(PROGRESS_FILE.read_text())
    return {"completed": [], "results": []}

def save_progress(progress):
    PROGRESS_FILE.write_text(json.dumps(progress, ensure_ascii=False, indent=2))

def load_existing():
    if OUTPUT_FILE.exists():
        return json.loads(OUTPUT_FILE.read_text())
    return []

def save_output(results):
    OUTPUT_FILE.write_text(json.dumps(results, ensure_ascii=False, indent=2))

# ─── Main scraping logic ──────────────────────────────────────────────────────

def scrape():
    parser = argparse.ArgumentParser(description="Scrape servicii funerare din România")
    parser.add_argument("--dry-run", action="store_true", help="Nu apela API, doar arată ce ar căuta")
    parser.add_argument("--judet", type=str, help="Scrape doar un județ")
    parser.add_argument("--max-pages", type=int, default=3, help="Max pagini per query (default 3 = 60 rezultate)")
    parser.add_argument("--skip-details", action="store_true", help="Sări peste Place Details (mai rapid, mai ieftin)")
    parser.add_argument("--details-only", action="store_true", help="Completează doar telefon/website pentru firmele existente")
    args = parser.parse_args()

    if not API_KEY and not args.dry_run:
        print("EROARE: GOOGLE_MAPS_API_KEY nu e setat în .env.local")
        sys.exit(1)

    # ─── Details-only mode: complete phone/website for existing entries ──────
    if args.details_only:
        existing = load_existing()
        if not existing:
            print("EROARE: Nu există date în funerare-director.json")
            sys.exit(1)

        todo = [e for e in existing if not e.get("phone") and e.get("placeId")]
        print(f"Total firme: {len(existing)}")
        print(f"Firme fără telefon (de completat): {len(todo)}")
        print(f"Cost estimat: ${len(todo) * 0.017:.2f}")
        print()

        if not todo:
            print("Toate firmele au deja telefon. Nimic de făcut.")
            return

        completed = 0
        for i, entry in enumerate(todo):
            place_id = entry["placeId"]
            print(f"[{i+1}/{len(todo)}] {entry['name'][:40]} ...", end=" ", flush=True)

            try:
                details = get_place_details(place_id)
                phone = details.get("formatted_phone_number", "")
                international_phone = details.get("international_phone_number", "")
                website = details.get("website", "")

                # Update entry in the full list
                for e in existing:
                    if e["placeId"] == place_id:
                        e["phone"] = phone
                        e["internationalPhone"] = international_phone
                        e["website"] = website
                        break

                completed += 1
                print(f"tel: {phone[:20] or '—'}")

                # Save every 10 entries (crash safety)
                if completed % 10 == 0:
                    save_output(existing)

                time.sleep(0.15)  # Rate limit (~6 req/sec)

            except Exception as e:
                print(f"EROARE: {e}")
                time.sleep(1)

        save_output(existing)
        print()
        print(f"=== GATA ===")
        print(f"Completat: {completed}/{len(todo)}")
        print(f"Cu telefon: {sum(1 for e in existing if e.get('phone'))}")
        print(f"Cu website: {sum(1 for e in existing if e.get('website'))}")
        return

    judete = [args.judet] if args.judet else list(JUDET_ORASE.keys())

    # Calculate total queries
    total_queries = sum(len(JUDET_ORASE[j]) * len(QUERIES) for j in judete)
    total_text_searches = total_queries * args.max_pages
    print(f"Județe: {len(judete)}")
    print(f"Orașe totale: {sum(len(JUDET_ORASE[j]) for j in judete)}")
    print(f"Query-uri: {len(QUERIES)} × {sum(len(JUDET_ORASE[j]) for j in judete)} orașe = {total_queries}")
    print(f"Text Search requests (max): {total_text_searches}")
    if not args.skip_details:
        print(f"Place Details requests: ~{total_text_searches * 20} (estimare)")
    print(f"Cost estimat: ${total_text_searches * 0.017:.2f}" + ("" if args.skip_details else f" + details"))
    print()

    if args.dry_run:
        print("=== DRY RUN — nu se apelează API ===")
        for j in judete:
            for oras in JUDET_ORASE[j]:
                for q in QUERIES:
                    print(f"  {j} / {oras} / '{q}'")
        return

    # Load progress
    progress = load_progress()
    existing = load_existing()
    seen_place_ids = {e["placeId"] for e in existing if e.get("placeId")}
    all_results = list(existing)

    total_new = 0
    total_api_calls = 0

    for judet in judete:
        for oras in JUDET_ORASE[judet]:
            for query in QUERIES:
                search_key = f"{judet}|{oras}|{query}"
                if search_key in progress["completed"]:
                    continue

                full_query = f"{query} {oras} România"
                print(f"[{judet}] {oras} → '{query}' ...", end=" ", flush=True)

                page_token = None
                query_results = 0

                for page in range(args.max_pages):
                    try:
                        data = text_search(full_query, page_token=page_token)
                        total_api_calls += 1
                    except Exception as e:
                        print(f"EROARE: {e}")
                        break

                    if data.get("status") != "OK" and data.get("status") != "ZERO_RESULTS":
                        print(f"status={data.get('status')}", end=" ")
                        break

                    results = data.get("results", [])
                    if not results:
                        break

                    for r in results:
                        place_id = r.get("place_id", "")
                        if not place_id or place_id in seen_place_ids:
                            continue

                        name = r.get("name", "")
                        if not name:
                            continue

                        address = r.get("formatted_address", "")

                        # Filter: must be in the target judet
                        if not is_in_judet(address, judet):
                            continue

                        # Classify type — skip if None (false positive)
                        tip = classify_tip(name, query)
                        if tip is None:
                            continue

                        # Get details (phone, website) unless skipped
                        phone = ""
                        international_phone = ""
                        website = ""
                        if not args.skip_details:
                            try:
                                details = get_place_details(place_id)
                                total_api_calls += 1
                                phone = details.get("formatted_phone_number", "")
                                international_phone = details.get("international_phone_number", "")
                                website = details.get("website", "")
                                time.sleep(0.1)  # Rate limit
                            except Exception:
                                pass

                        lat = r.get("geometry", {}).get("location", {}).get("lat", "")
                        lng = r.get("geometry", {}).get("location", {}).get("lng", "")
                        rating = r.get("rating", "")
                        reviews = r.get("user_ratings_total", "")

                        entry = {
                            "slug": slugify(name),
                            "name": name,
                            "source": "google",
                            "phone": phone,
                            "internationalPhone": international_phone,
                            "website": website,
                            "address": address,
                            "lat": lat,
                            "lng": lng,
                            "judet": judet,
                            "rating": rating,
                            "reviews": reviews,
                            "placeId": place_id,
                            "googleUrl": r.get("url", ""),
                            "tip": tip,
                            "localitate": extract_localitate(address, judet),
                        }

                        all_results.append(entry)
                        seen_place_ids.add(place_id)
                        query_results += 1
                        total_new += 1

                    # Next page
                    page_token = data.get("next_page_token")
                    if not page_token:
                        break
                    # Google requires delay before using next_page_token
                    time.sleep(2)

                print(f"+{query_results} rezultate")

                # Mark as completed
                progress["completed"].append(search_key)
                progress["results"] = all_results
                save_progress(progress)
                save_output(all_results)

                # Rate limit between queries
                time.sleep(0.3)

    # Final save
    save_output(all_results)
    save_progress(progress)

    print()
    print(f"=== REZULTAT FINAL ===")
    print(f"Total firme colectate: {len(all_results)}")
    print(f"Firme noi în această rulare: {total_new}")
    print(f"API calls totale: {total_api_calls}")
    print(f"Fișier: {OUTPUT_FILE}")

    # Stats per judet
    from collections import Counter
    judet_counts = Counter(e["judet"] for e in all_results)
    print()
    print("Distribuție per județ:")
    for j, c in sorted(judet_counts.items(), key=lambda x: -x[1]):
        print(f"  {j}: {c}")

    # Stats per tip
    tip_counts = Counter(e["tip"] for e in all_results)
    print()
    print("Distribuție per tip:")
    for t, c in sorted(tip_counts.items(), key=lambda x: -x[1]):
        print(f"  {t}: {c}")

if __name__ == "__main__":
    scrape()
