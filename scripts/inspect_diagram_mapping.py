import os, io, re, sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
from pypdf import PdfReader
from PIL import Image

HEADERS = {'User-Agent': 'Mozilla/5.0'}
u = 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf'
req = urllib.request.Request(u, headers=HEADERS)
content = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(content))

for idx, p in enumerate(reader.pages):
    pno = idx + 1
    txt = p.extract_text() or ""
    # find questions on page
    qs = [int(x) for x in re.findall(r'Q\.?\s*(\d+)', txt) if int(x) <= 65 and int(x) not in [5, 10, 35, 65] or f"Q.{x}" in txt or f"Q. {x}" in txt]
    # find valid images on page
    valid_imgs = []
    for img_idx, img_file in enumerate(p.images):
        try:
            im = Image.open(io.BytesIO(img_file.data))
            w, h = im.size
            if (w == 1140 and h == 1600) or (w == 117 and h == 164) or w < 60 or h < 60:
                continue
            valid_imgs.append((img_idx, w, h))
        except:
            pass
    if valid_imgs:
        print(f"Page {pno}: Questions {qs} -> {len(valid_imgs)} images: {valid_imgs}")
