import urllib.request, io, re, sys
sys.stdout.reconfigure(encoding='utf-8')
from pypdf import PdfReader

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
u = 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf'
req = urllib.request.Request(u, headers=headers)
content = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(content))

full_text = ""
for i, page in enumerate(reader.pages):
    full_text += f"\n--- PAGE {i+1} ---\n" + (page.extract_text() or "")

# Find question markers like Q.1, Q.2, Q.65
q_indices = []
for m in re.finditer(r'(?:^|\n)\s*Q\.?\s*(\d+)\s*(?:\.|\n|\s)', full_text):
    qno = int(m.group(1))
    q_indices.append((qno, m.start()))

print(f"Total Q markers found: {len(q_indices)}")
found_qnos = sorted(set(q[0] for q in q_indices))
print("Questions found:", found_qnos)
