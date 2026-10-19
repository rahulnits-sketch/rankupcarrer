import urllib.request, io
from pypdf import PdfReader

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
u = 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf'
req = urllib.request.Request(u, headers=headers)
content = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(content))
print(f"Total pages in ME.pdf: {len(reader.pages)}")

# Print pages 1 to 5
for i in range(min(5, len(reader.pages))):
    print(f"\n================ Page {i+1} ================")
    print(reader.pages[i].extract_text()[:600])
