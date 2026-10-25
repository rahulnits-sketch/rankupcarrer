import os
import re
import sys
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = "C:/vscode/TestMaker/gate-cse-test-series"
IMG_BASE = os.path.join(ROOT_DIR, "public/question-images/gate/ee")

# Let's inspect 2026 first
# We already extracted images to public/question-images/gate/ee/2026
images_2026 = os.listdir(os.path.join(IMG_BASE, "2026"))
print(f"2026 total images: {len(images_2026)}")

# Group images by page
page_img_map_2026 = {}
for img in images_2026:
    m = re.match(r'ee_2026_p(\d+)_img(\d+)\.png', img)
    if m:
        pno = int(m.group(1))
        page_img_map_2026.setdefault(pno, []).append(img)

print("Pages with images in 2026:", sorted(page_img_map_2026.keys()))

# Now let's see which questions appear on those pages in 2026 QP PDF
# Download or read 2026 QP from online or memory
import urllib.request, ssl, io
ctx = ssl._create_unverified_context()
req = urllib.request.Request("https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/EE.pdf", headers={'User-Agent': 'Mozilla/5.0'})
raw_qp = urllib.request.urlopen(req, timeout=15, context=ctx).read()
reader = pypdf.PdfReader(io.BytesIO(raw_qp))

for pno in sorted(page_img_map_2026.keys()):
    if pno <= len(reader.pages):
        txt = reader.pages[pno - 1].extract_text() or ""
        q_nums = re.findall(r'Q\.?\s*(\d+)', txt)
        imgs = page_img_map_2026[pno]
        print(f"Page {pno}: Questions {q_nums} | Images: {imgs}")
