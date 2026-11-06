import urllib.request
import json
import ssl
import time
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

artDir = r'C:\Users\rajeshkumar.s\.gemini\antigravity\brain\41ffd321-0c5a-47cd-9b93-18e62af5caa5'

searches = [
    ('filetype:bitmap "truck" "tilt test"', 'cand-tilttest.jpg'),
    ('filetype:bitmap "commercial vehicle" "brake test"', 'cand-braketest.jpg'),
    ('filetype:bitmap "truck chassis" factory', 'cand-chassisfactory.jpg'),
    ('filetype:bitmap "chassis" drawing truck OR lorry', 'cand-chassisdrawing.jpg'),
    ('filetype:bitmap "truck" wind tunnel', 'cand-windtunnel.jpg')
]

for q, out_name in searches:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(q)}&gsrlimit=3&prop=imageinfo&iiprop=url|size|mime&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    try:
        with urllib.request.urlopen(req, context=ctx) as r:
            data = json.loads(r.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {}).values()
            for p in pages:
                info = p.get('imageinfo', [{}])[0]
                u = info.get('url', '')
                if info.get('mime') == 'image/jpeg' and info.get('width', 0) >= 1000:
                    print(f"Downloading {p.get('title')} ({info.get('width')}x{info.get('height')})...")
                    time.sleep(1)
                    down_req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                    with urllib.request.urlopen(down_req, context=ctx) as img_resp:
                        dest = os.path.join(artDir, out_name)
                        with open(dest, 'wb') as f:
                            f.write(img_resp.read())
                        print(f"Saved {out_name}")
                        break
    except Exception as e:
        print("Error on", q, e)
    time.sleep(1)
