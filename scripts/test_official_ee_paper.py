import urllib.request
import ssl
import io
import re
import sys
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

ctx = ssl._create_unverified_context()
headers = {'User-Agent': 'Mozilla/5.0'}

# Test 2026 Question Paper & Keys
print("Fetching 2026 QP & Keys...")
qp_url = "https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/EE.pdf"
key_url = "https://gate2027.iitm.ac.in/static/doc/download/2026/Keys/EE_Keys.pdf"

req_k = urllib.request.Request(key_url, headers=headers)
raw_k = urllib.request.urlopen(req_k, timeout=15, context=ctx).read()
reader_k = pypdf.PdfReader(io.BytesIO(raw_k))

keys_text = "\n".join([p.extract_text() or "" for p in reader_k.pages])
print(f"Keys extracted, length: {len(keys_text)}")

# Parse keys lines
keys = {}
for line in keys_text.splitlines():
    line = line.strip()
    m = re.match(r'^(\d+)\s+(\d+)\s+(MCQ|MSQ|NAT)\s+(GA|EE)\s+(.*?)\s+(\d+)$', line)
    if m:
        qno = int(m.group(1))
        qtype = m.group(3)
        sec = m.group(4)
        raw_key = m.group(5).strip()
        marks = int(m.group(6))
        keys[qno] = {
            "type": qtype,
            "section": sec,
            "raw_key": raw_key,
            "marks": marks
        }

print(f"Parsed {len(keys)} answer keys for 2026.")
sample_k = list(keys.items())[:5]
for qno, kdata in sample_k:
    print(f"  Q{qno}: {kdata}")

# Now fetch QP
req_qp = urllib.request.Request(qp_url, headers=headers)
raw_qp = urllib.request.urlopen(req_qp, timeout=20, context=ctx).read()
reader_qp = pypdf.PdfReader(io.BytesIO(raw_qp))
print(f"QP extracted: {len(reader_qp.pages)} pages")

qp_text = "\n".join([p.extract_text() or "" for p in reader_qp.pages])
# Find question delimiters
matches = list(re.finditer(r'(?:^|\n)\s*Q\.?\s*(\d+)\s+', qp_text))
print(f"Found {len(matches)} question markers in QP text.")
