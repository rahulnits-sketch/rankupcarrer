import urllib.request, io, re, sys
sys.stdout.reconfigure(encoding='utf-8')
from pypdf import PdfReader

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
u = 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf'
req = urllib.request.Request(u, headers=headers)
content = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(content))

for idx, p in enumerate(reader.pages):
    txt = p.extract_text() or ""
    # find all occurrences of Q.<number>
    qs = re.findall(r'Q\.?\s*(\d+)', txt)
    if qs:
        print(f"Page {idx+1}: {qs}")
