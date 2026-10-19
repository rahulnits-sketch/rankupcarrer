import io, urllib.request, re, sys
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf-8')

HEADERS = {'User-Agent': 'Mozilla/5.0'}
print("--- 2022 Keys ---")
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/Answer_keys2022/me-merged_2022.pdf', headers=HEADERS)
reader_k = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))
print("2022 Key pages:", len(reader_k.pages))
for pno in range(min(2, len(reader_k.pages))):
    print(f"P{pno+1}:", reader_k.pages[pno].extract_text()[:250])

print("\n--- 2021 Keys ---")
req2 = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/Answer_keys2021/me_merged_2021.pdf', headers=HEADERS)
reader_k2 = PdfReader(io.BytesIO(urllib.request.urlopen(req2).read()))
print("2021 Key pages:", len(reader_k2.pages))
for pno in range(min(2, len(reader_k2.pages))):
    print(f"P{pno+1}:", reader_k2.pages[pno].extract_text()[:250])
