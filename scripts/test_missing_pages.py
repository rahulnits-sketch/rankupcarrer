import io
import urllib.request
from pypdf import PdfReader

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025/ME2025.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

for pno in [10, 11, 12, 13, 14, 30, 31, 32, 33]:
    txt = reader.pages[pno - 1].extract_text()
    first_lines = txt.splitlines()[:6]
    print(f"--- Page {pno} ---")
    for fl in first_lines:
        print("  ", fl)
