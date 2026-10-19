import io, urllib.request, re, sys
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf-8')

HEADERS = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/Answer_keys2022/me-merged_2022.pdf', headers=HEADERS)
reader_k = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))
sessions = set()
for pno, p in enumerate(reader_k.pages):
    txt = p.extract_text()
    lines = [l.strip() for l in txt.splitlines() if l.strip()]
    for l in lines:
        m = re.match(r'^(\d+)\s+(\d+)\s+(MCQ|MSQ|NAT)', l)
        if m:
            sessions.add(int(m.group(2)))

print("Distinct sessions in 2022 keys:", sessions)

# Also check 2022 QP pages
req_qp = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2022/me_2022.pdf', headers=HEADERS)
reader_qp = PdfReader(io.BytesIO(urllib.request.urlopen(req_qp).read()))
print("Total pages in 2022 QP:", len(reader_qp.pages))
p1_text = reader_qp.pages[0].extract_text()
print("Page 1 header:", p1_text[:200])
# Find where session 2 starts in QP
for pno in range(40, len(reader_qp.pages)):
    txt = reader_qp.pages[pno].extract_text()
    if "Q.1 " in txt or "Q.1 –" in txt or "General Aptitude" in txt:
        print(f"Possible Set 2 start on Page {pno+1}:", txt[:120])
