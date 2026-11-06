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
            res.append({
                'title': p.get('title'),
                'url': info.get('url'),
                'width': info.get('width'),
                'height': info.get('height')
            })
        return res

print("--- CUSTOM CONTENDERS ---")
for x in search("rotator tow truck OR heavy wrecker truck OR crane truck commercial", 6):
    print(x['title'].encode('ascii', 'replace').decode(), x['width'], x['height'], x['url'])

print("\n--- REEFER CONTENDERS ---")
for x in search("refrigerated delivery truck OR refrigerated box truck", 6):
    print(x['title'].encode('ascii', 'replace').decode(), x['width'], x['height'], x['url'])
