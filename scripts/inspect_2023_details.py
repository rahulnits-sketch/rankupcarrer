import io, urllib.request, re, sys
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf-8')

HEADERS = {'User-Agent': 'Mozilla/5.0'}
print("--- 2023 Keys ---")
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/Answer_keys2023/ME_ANS_GATE2023.pdf', headers=HEADERS)
reader_k = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))
text_k = "\n".join(p.extract_text() for p in reader_k.pages)
lines_k = [l.strip() for l in text_k.splitlines() if l.strip()]
print("Keys first 20 lines:")
for l in lines_k[:20]:
    print(" ", l)

print("\n--- 2023 QP ---")
req_qp = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2023/me_2023.pdf', headers=HEADERS)
reader_qp = PdfReader(io.BytesIO(urllib.request.urlopen(req_qp).read()))
print("QP pages:", len(reader_qp.pages))
text_qp = reader_qp.pages[0].extract_text()
print("P1 preview:")
print(text_qp[:300])
