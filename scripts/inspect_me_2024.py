# -*- coding: utf-8 -*-
import io
import urllib.request
import sys
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')
HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print("--- Inspecting ME 2024 Keys ---")
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2024/MEFinalAnswerKey.pdf', headers=HEADERS)
data = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(data))
print("Pages in Keys:", len(reader.pages))
for pno, p in enumerate(reader.pages):
    print(f"Page {pno+1}: {p.extract_text()[:300]}")

print("\n--- Inspecting ME 2024 QP ---")
req2 = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2024/ME24S2.pdf', headers=HEADERS)
data2 = urllib.request.urlopen(req2, timeout=15).read()
reader2 = PdfReader(io.BytesIO(data2))
print("Pages in QP:", len(reader2.pages))
print(f"Page 1: {reader2.pages[0].extract_text()[:300]}")
