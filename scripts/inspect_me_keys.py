import urllib.request, io
from pypdf import PdfReader

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
u = 'https://gate2027.iitm.ac.in/static/doc/download/2026/Keys/ME_Keys.pdf'
req = urllib.request.Request(u, headers=headers)
content = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(content))
print(f"Total pages in ME_Keys.pdf: {len(reader.pages)}")
for i, page in enumerate(reader.pages):
    print(f"\n--- Page {i+1} ---")
    print(page.extract_text()[:600])
