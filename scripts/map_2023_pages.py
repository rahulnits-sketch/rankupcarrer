import io, urllib.request, re, sys
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2023/me_2023.pdf', headers={'User-Agent': 'Mozilla/5.0'})
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

page_q_map = {}
for pno, p in enumerate(reader.pages, start=1):
    txt = p.extract_text() or ""
    qs = re.findall(r'(?:^|\n)\s*Q\.?\s*(\d+)', txt)
    if qs:
        page_q_map[pno] = qs

for pno, qs in sorted(page_q_map.items()):
    print(f"Page {pno}: Q {qs}")
