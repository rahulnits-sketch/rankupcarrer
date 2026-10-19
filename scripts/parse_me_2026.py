import urllib.request, io, re, json
from pypdf import PdfReader

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

# 1. Download ME_Keys.pdf
print("Fetching ME_Keys.pdf...")
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2026/Keys/ME_Keys.pdf', headers=headers)
keys_pdf = urllib.request.urlopen(req, timeout=10).read()
reader_k = PdfReader(io.BytesIO(keys_pdf))

keys_text = ""
for p in reader_k.pages:
    keys_text += p.extract_text() + "\n"

# Parse answer keys
# Line format: Q. No. Session Question Type Section Key/Range Marks
# e.g.: 1 6 MCQ GA C 1
# e.g.: 48 6 NAT ME 18.5 to 19.5 2
# e.g.: 52 6 NAT ME -0.61 to -0.57 OR 0.57 to 0.61 2
answer_keys = {}
for line in keys_text.splitlines():
    m = re.match(r'^(\d+)\s+(\d+)\s+(MCQ|MSQ|NAT|MTA)\s+(GA|ME)\s+(.*?)\s+(\d+)$', line.strip())
    if m:
        qno = int(m.group(1))
        qtype = m.group(3)
        section = m.group(4)
        key_val = m.group(5).strip()
        marks = int(m.group(6))
        answer_keys[qno] = {
            "type": qtype,
            "section": section,
            "key": key_val,
            "marks": marks
        }

print(f"Parsed {len(answer_keys)} keys from ME_Keys.pdf:")
for qn in sorted(answer_keys.keys())[:15]:
    print(f"  Q{qn}: {answer_keys[qn]}")
for qn in sorted(answer_keys.keys())[47:55]:
    print(f"  Q{qn}: {answer_keys[qn]}")
