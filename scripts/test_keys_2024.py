import io
import urllib.request
import re
from pypdf import PdfReader

HEADERS = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2024/MEFinalAnswerKey.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

full_text = ""
for p in reader.pages:
    full_text += p.extract_text() + "\n"

lines = [l.strip() for l in full_text.splitlines() if l.strip()]

keys = {}
for line in lines:
    # Pattern: QNo Session Type Section Key Marks
    m = re.match(r'^(\d+)\s+(\d+)\s+(MCQ|MSQ|NAT)\s+(GA|ME)\s+(.*?)\s+(\d+)$', line)
    if m:
        qno = int(m.group(1))
        session = int(m.group(2))
        qtype = m.group(3)
        section = m.group(4)
        raw_key = m.group(5).strip()
        marks = int(m.group(6))
        
        ans = []
        tol = None
        if qtype == "NAT":
            rm = re.search(r'(-?\d+(?:\.\d+)?)\s+to\s+(-?\d+(?:\.\d+)?)', raw_key)
            if rm:
                v1 = float(rm.group(1))
                v2 = float(rm.group(2))
                tol = {"min": min(v1, v2), "max": max(v1, v2)}
                mid = round((v1 + v2) / 2, 2)
                ans = [str(mid) if mid != int(mid) else str(int(mid))]
            else:
                ans = [raw_key]
        elif qtype in ("MCQ", "MSQ"):
            letters = [c for c in raw_key if c in "ABCD"]
            ans = letters if letters else [raw_key]

        neg_marks = 0.0
        if qtype == "MCQ":
            neg_marks = 0.33 if marks == 1 else 0.66
            
        keys[qno] = {
            "type": qtype,
            "section": section,
            "answer": ans,
            "tolerance": tol,
            "marks": marks,
            "negativeMarks": neg_marks,
            "rawKey": raw_key
        }

print(f"Parsed {len(keys)} keys for ME 2024.")
missing = [q for q in range(1, 66) if q not in keys]
print(f"Missing keys: {missing}")
