import urllib.request
import json
import os

def search_commons(query, limit=10):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(query)}&gsrlimit={limit}&prop=imageinfo&iiprop=url|size|mime&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'TruckBodyBuilder/2.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {}).values()
            results = []
            for p in pages:
                info = p.get('imageinfo', [{}])[0]
                url = info.get('url', '')
                if url.lower().endswith(('.jpg', '.jpeg', '.png')) and info.get('width', 0) >= 1000:
                    results.append({
                        'title': p.get('title'),
                        'url': url,
                        'w': info.get('width'),
                        'h': info.get('height')
                    })
            return results
    except Exception as e:
        print("Error:", e)
        return []

print("=== BLOG 1: Hardox Mining Tipper ===")
for r in search_commons("mining dump truck quarry", 6):
    print(r['title'], f"{r['w']}x{r['h']}", r['url'])

print("\n=== BLOG 1 ALT: Heavy Steel Plate Cutting / Plasma Cutting ===")
for r in search_commons("plasma cutting CNC steel", 6):
    print(r['title'], f"{r['w']}x{r['h']}", r['url'])

print("\n=== BLOG 2: Commercial Truck Chassis Inspection / Homologation ===")
for r in search_commons("truck chassis inspection testing", 6):
    print(r['title'], f"{r['w']}x{r['h']}", r['url'])

print("\n=== BLOG 2 ALT: Truck CAD / Blueprint ===")
for r in search_commons("chassis CAD automotive", 6):
    print(r['title'], f"{r['w']}x{r['h']}", r['url'])
