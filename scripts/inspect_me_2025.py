import io
import urllib.request
import re
from pypdf import PdfReader

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print("--- Inspecting ME 2025 Keys ---")
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025_Key/ME_Keys.pdf', headers=HEADERS)
data = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(data))
print("Pages in Keys:", len(reader.pages))
text = ""
for p in reader.pages:
    text += p.extract_text() + "\n"

print("First 20 lines of keys:")
for line in text.splitlines()[:20]:
    print(line)

print("\n--- Inspecting ME 2025 QP ---")
req2 = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025/ME2025.pdf', headers=HEADERS)
data2 = urllib.request.urlopen(req2, timeout=15).read()
reader2 = PdfReader(io.BytesIO(data2))
print("Pages in QP:", len(reader2.pages))
p1_text = reader2.pages[0].extract_text()
print("Page 1 preview:")
print(p1_text[:400])
