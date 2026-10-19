import urllib.request, io, os
from pypdf import PdfReader

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
u = 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf'
req = urllib.request.Request(u, headers=headers)
content = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(content))

img_count = 0
for i, page in enumerate(reader.pages):
    imgs = page.images
    if len(imgs) > 0:
        img_count += len(imgs)
        print(f"Page {i+1} has {len(imgs)} image(s): {[img.name for img in imgs]}")

print(f"\nTotal images found in ME.pdf: {img_count}")
