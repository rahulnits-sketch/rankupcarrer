# -*- coding: utf-8 -*-
import io
import sys
import urllib.request
import re
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')
HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025/ME2025.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

page_for_q = {}
for pno, page in enumerate(reader.pages, start=1):
    txt = page.extract_text()
    matches = re.findall(r'Q\.\s*(\d+)', txt)
    if matches:
        for m in matches:
            qnum = int(m)
            if 1 <= qnum <= 65 and qnum not in page_for_q:
                page_for_q[qnum] = pno

print(f"Discovered questions: {len(page_for_q)} of 65")
missing = [q for q in range(1, 66) if q not in page_for_q]
print(f"Missing questions: {missing}")
for q in range(1, 66):
    if q in page_for_q:
        print(f"Q{q:02d} -> Page {page_for_q[q]}")
