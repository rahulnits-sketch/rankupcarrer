# -*- coding: utf-8 -*-
import os, io, urllib.request
from pypdf import PdfReader
from PIL import Image

PUBLIC_IMG_DIR = "C:/vscode/TestMaker/gate-cse-test-series/public/question-images/gate/me/2022_1"
os.makedirs(PUBLIC_IMG_DIR, exist_ok=True)

HEADERS = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2022/me_2022.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

saved_images = {}
for p_idx, page in enumerate(reader.pages):
    pno = p_idx + 1
    saved_images[pno] = []
    for img_idx, img_file in enumerate(page.images):
        try:
            im = Image.open(io.BytesIO(img_file.data))
            w, h = im.size
            if (w == 1140 and h == 1600) or (w == 117 and h == 164) or w < 50 or h < 50:
                continue
            fname = f"me_2022_p{pno}_img{img_idx}.png"
            target = os.path.join(PUBLIC_IMG_DIR, fname)
            im.save(target)
            saved_images[pno].append({"name": fname, "w": w, "h": h, "url": f"/question-images/gate/me/2022_1/{fname}"})
        except Exception as e:
            pass

diag_pages = {p: imgs for p, imgs in saved_images.items() if imgs}
print(f"Total pages with diagrams: {len(diag_pages)}")
for p, imgs in diag_pages.items():
    print(f"Page {p}: {[i['name'] for i in imgs]}")
