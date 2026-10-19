import io, urllib.request, re, sys
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf-8')

HEADERS = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/Answer_keys2021/me_merged_2021.pdf', headers=HEADERS)
reader_k = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))
sessions = set()
for pno, p in enumerate(reader_k.pages):
    txt = p.extract_text()
    lines = [l.strip() for l in txt.splitlines() if l.strip()]
    for l in lines:
        m = re.match(r'^(\d+)\s+(\d+)\s+(MCQ|MSQ|NAT)', l)
        if m:
            sessions.add(int(m.group(2)))

print("Distinct sessions in 2021 keys:", sessions)
print("Key pages count:", len(reader_k.pages))
