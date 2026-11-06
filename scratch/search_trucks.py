import json
import urllib.request
import urllib.parse
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

def search_commons(query, limit=5):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit={limit}&prop=imageinfo&iiprop=url|size|mime|extmetadata"
    req = urllib.request.Request(url, headers={'User-Agent': 'TruckBodyBuilder/1.0 (test@truckbodybuilder.com)'})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        pages = data.get('query', {}).get('pages', {})
        results = []
        for page_id, page in pages.items():
            info = page.get('imageinfo', [{}])[0]
            title = page.get('title', '')
            results.append({
                'title': title,
                'url': info.get('url'),
                'width': info.get('width'),
                'height': info.get('height'),
                'size': info.get('size'),
                'mime': info.get('mime')
            })
        return results

queries = [
    ("open_truck", "dropside truck cargo"),
    ("container_truck", "container truck highway"),
    ("tipper_truck", "tipper dump truck mining"),
    ("semi_trailer", "semi-trailer truck flatbed"),
    ("tanker_truck", "fuel tanker truck road"),
    ("refrigerated_truck", "refrigerated truck"),
    ("flatbed_truck", "flatbed heavy truck"),
    ("custom_truck", "heavy tow truck wrecker OR fire engine commercial truck"),
    ("truck_factory", "truck assembly plant OR commercial vehicle manufacturing factory")
]

for tag, q in queries:
    print(f"\n=== {tag} ({q}) ===")
    res = search_commons(q, 4)
    for r in res:
        print(f"  {r['title']} ({r['width']}x{r['height']}) -> {r['url']}")
