import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=filetype:bitmap+%22dump+truck%22+quarry&gsrlimit=6&prop=imageinfo&iiprop=url|size|mime&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req, context=ctx) as r:
        data = json.loads(r.read().decode('utf-8'))
        pages = data.get('query', {}).get('pages', {}).values()
        for p in pages:
            info = p.get('imageinfo', [{}])[0]
            print(p.get('title'), info.get('width'), info.get('url'))
except Exception as e:
    print('Error:', e)
