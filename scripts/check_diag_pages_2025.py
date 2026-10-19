import io, urllib.request, re, sys
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025/ME2025.pdf', headers={'User-Agent': 'Mozilla/5.0'})
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

pages_to_check = [12, 13, 15, 19, 20, 21, 23, 30, 33, 34, 35, 37, 38, 39]
for pno in pages_to_check:
    txt = reader.pages[pno - 1].extract_text() or ""
    qs = re.findall(r'(?:^|\n)\s*Q\.?\s*(\d+)', txt)
    print(f"Page {pno}: Questions found -> {qs}")
