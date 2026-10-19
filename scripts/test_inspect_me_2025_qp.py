import io
import urllib.request
import re
from pypdf import PdfReader

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025/ME2025.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

print(f"Total pages: {len(reader.pages)}")

# Let's inspect where Q.1, Q.2, ... appear
page_for_q = {}
for pno, page in enumerate(reader.pages, start=1):
    txt = page.extract_text()
    matches = re.findall(r'Q\.(\d+)\s+', txt)
    if matches:
        for m in matches:
            qnum = int(m)
            if qnum not in page_for_q:
                page_for_q[qnum] = pno

print(f"Discovered questions across pages: {len(page_for_q)}")
missing = [q for q in range(1, 66) if q not in page_for_q]
print(f"Missing questions in discovery: {missing}")

# Check diagrams count per page
diag_pages = []
for pno, page in enumerate(reader.pages, start=1):
    if len(page.images) > 2: # more than border and logo
        diag_pages.append((pno, len(page.images)))

print(f"Pages with diagrams ({len(diag_pages)} pages):", diag_pages[:15])
