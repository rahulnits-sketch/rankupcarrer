import urllib.request, io, re, sys
sys.stdout.reconfigure(encoding='utf-8')
from pypdf import PdfReader

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
u = 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf'
req = urllib.request.Request(u, headers=headers)
content = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(content))

pages_to_check = [1, 2, 11, 12, 40]
for pno in pages_to_check:
    print(f"\n=================== Page {pno} ===================")
    print(reader.pages[pno-1].extract_text())
