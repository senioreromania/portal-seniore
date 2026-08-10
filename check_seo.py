import sys, re, json, urllib.request

url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3001/judet/ilfov"
html = urllib.request.urlopen(url).read().decode()

title = re.search(r'<title>(.*?)</title>', html)
t = title.group(1) if title else ""
print(f"TITLE ({len(t)} chars): {t}")
if len(t) > 60:
    print(f"  WARNING: Google truncates at ~60 chars -> shows: '{t[:60]}...'")
else:
    print("  OK length")
print()

desc = re.search(r'<meta name="description" content="(.*?)"', html)
d = desc.group(1) if desc else ""
print(f"DESCRIPTION ({len(d)} chars): {d}")
if len(d) > 160:
    print("  WARNING: Google truncates at ~160 chars -> TRUNCATED")
else:
    print("  OK length")
print()

kw = re.search(r'<meta name="keywords" content="(.*?)"', html)
print(f"KEYWORDS: {kw.group(1) if kw else 'MISSING'}")
print()

canon = re.search(r'<link rel="canonical" href="(.*?)"', html)
print(f"CANONICAL: {canon.group(1) if canon else 'MISSING'}")
print()

og_title = re.search(r'<meta property="og:title" content="(.*?)"', html)
og_desc = re.search(r'<meta property="og:description" content="(.*?)"', html)
og_url = re.search(r'<meta property="og:url" content="(.*?)"', html)
og_img = re.search(r'<meta property="og:image" content="(.*?)"', html)
print(f"OG:TITLE: {og_title.group(1) if og_title else 'MISSING'}")
print(f"OG:DESCRIPTION: {og_desc.group(1) if og_desc else 'MISSING'}")
print(f"OG:URL: {og_url.group(1) if og_url else 'MISSING'}")
print(f"OG:IMAGE: {og_img.group(1) if og_img else 'MISSING'}")
print()

tw_card = re.search(r'<meta name="twitter:card" content="(.*?)"', html)
print(f"TWITTER:CARD: {tw_card.group(1) if tw_card else 'MISSING'}")
print()

h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
h1_text = re.sub(r'<[^>]+>', '', h1.group(1)).strip() if h1 else "NOT FOUND"
print(f"H1: {h1_text}")
print()

robots = re.search(r'<meta name="robots" content="(.*?)"', html)
print(f"ROBOTS: {robots.group(1) if robots else 'MISSING (default index,follow)'}")
print()

blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
print(f"JSON-LD blocks: {len(blocks)}")
for i, b in enumerate(blocks):
    data = json.loads(b)
    t = data.get("@type", "unknown")
    print(f"  #{i+1}: {t}")
    if t == "FAQPage":
        for q in data.get("mainEntity", []):
            print(f"    Q: {q['name'][:90]}")
    elif t == "CollectionPage":
        print(f"    name: {data.get('name','')}")
        print(f"    description: {data.get('description','')[:120]}")
    elif t == "BreadcrumbList":
        items = data.get("itemListElement", [])
        names = [it.get("item",{}).get("name","") if isinstance(it.get("item"),dict) else it.get("name","") for it in items]
        print(f"    items: {names}")
