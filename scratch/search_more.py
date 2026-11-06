import json, urllib.request, urllib.parse, ssl
ssl._create_default_https_context = ssl._create_unverified_context

def search(q, limit=6):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit={limit}&prop=imageinfo&iiprop=url|size|mime"
    req = urllib.request.Request(url, headers={'User-Agent': 'TruckBodyBuilder/1.0 (contact@truckbodybuilder.com)'})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        pages = data.get('query', {}).get('pages', {})
        res = []
        for pid, p in pages.items():
            info = p.get('imageinfo', [{}])[0]
            mime = info.get('mime', '')
            if 'image/jpeg' in mime or 'image/png' in mime:
                res.append({
                    'title': p.get('title'),
                    'url': info.get('url'),
                    'width': info.get('width'),
                    'height': info.get('height')
                })
        return res

more_queries = {
    "facility_search": "truck assembly line OR vehicle assembly plant OR truck manufacturing",
    "flatbed_search": "flatbed truck cargo OR flatbed truck transport OR flatbed trailer truck",
    "custom_search": "heavy duty wrecker truck OR commercial crane truck OR heavy recovery vehicle"
}

for k, v in more_queries.items():
    print(f"\n--- {k.upper()} ---")
    for item in search(v, 6):
        print(f"  {item['title']} ({item['width']}x{item['height']}) -> {item['url']}")
