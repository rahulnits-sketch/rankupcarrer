import io, urllib.request, re, sys
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2024/ME24S2.pdf', headers={'User-Agent': 'Mozilla/5.0'})
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

pages = [6, 11, 15, 17, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
for pno in pages:
    txt = reader.pages[pno - 1].extract_text() or ""
    qs = re.findall(r'(?:^|\n)\s*Q\.?\s*(\d+)', txt)
    print(f"Page {pno}: Questions found -> {qs}")
