import urllib.request
import json
import ssl
import time
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

artDir = r'C:\Users\rajeshkumar.s\.gemini\antigravity\brain\41ffd321-0c5a-47cd-9b93-18e62af5caa5'

def search_and_download(query, out_name):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(query)}&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'})
    try:
        with urllib.request.urlopen(req, context=ctx) as r:
            data = json.loads(r.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {}).values()
            for p in pages:
                info = p.get('imageinfo', [{}])[0]
                u = info.get('url', '')
                mime = info.get('mime', '')
                w = info.get('width', 0)
                if mime == 'image/jpeg' and w >= 1200:
                    print(f"Found: {p.get('title')} ({w}x{info.get('height')})")
                    time.sleep(1)
                    # Download
                    down_req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                    with urllib.request.urlopen(down_req, context=ctx) as img_resp:
                        dest = os.path.join(artDir, out_name)
                        with open(dest, 'wb') as f:
                            f.write(img_resp.read())
                        print(f"Successfully saved {out_name} ({os.path.getsize(dest)} bytes)")
                        return True
    except Exception as e:
        print("Error:", e)
    return False

# Search for Hardox heavy mining tipper / dump truck
print("Searching for heavy tipper...")
search_and_download('filetype:bitmap "Volvo FMX" tipper OR "dump truck"', 'wiki-tipper-quarry.jpg')

# Search for truck chassis inspection / testing / homologation
print("\nSearching for truck chassis inspection...")
search_and_download('filetype:bitmap "truck chassis" OR "commercial vehicle" inspection', 'wiki-chassis-inspect.jpg')
