import json
import urllib.request
import urllib.parse
import ssl

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
            if 'image' in mime and 'tif' not in mime and 'svg' not in mime:
                res.append({
                    'title': p.get('title'),
                    'url': info.get('url'),
                    'width': info.get('width'),
                    'height': info.get('height')
                })
        return res

test_queries = {
    "open": "Isuzu Dropside Cargo Truck OR Mercedes dropside truck",
    "container": "container truck trailer highway OR DAF container truck",
    "tipper": "Mercedes-Benz Arocs dump truck OR Scania tipper truck",
    "trailer": "lowbed trailer semi-trailer OR skeletal trailer truck",
    "tanker": "Scania fuel tanker OR fuel tanker truck highway",
    "reefer": "refrigerated semi-trailer OR reefer trailer truck OR Thermo King refrigerated",
    "flatbed": "flatbed semi-trailer heavy haulage OR low loader heavy haulage truck",
    "custom": "heavy recovery wrecker truck OR commercial crane truck chassis",
    "facility": "commercial vehicle plant assembly line OR truck manufacturing plant"
}

for k, v in test_queries.items():
    print(f"\n--- {k.upper()} ({v}) ---")
    for item in search(v, 4):
        print(f"  {item['title']} ({item['width']}x{item['height']}) -> {item['url']}")
