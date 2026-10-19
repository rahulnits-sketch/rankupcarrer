import io, urllib.request, re
from pypdf import PdfReader

HEADERS = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/Answer_keys2022/me-merged_2022.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

full_text = "\n".join(p.extract_text() for p in reader.pages)
lines = [l.strip() for l in full_text.splitlines() if l.strip()]

keys_by_session = {7: {}, 8: {}}
for line in lines:
    m = re.match(r'^(\d+)\s+([78])\s+(MCQ|MSQ|NAT)\s+(GA|ME)\s+(.*?)\s+(\d+)$', line)
    if m:
        qno = int(m.group(1))
        sess = int(m.group(2))
        qtype = m.group(3)
        sec = m.group(4)
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

        keys_by_session[sess][qno] = {
            "type": qtype,
            "section": sec,
            "answer": ans,
            "tolerance": tol,
            "marks": marks,
            "negativeMarks": neg_marks,
            "rawKey": raw_key
        }

print(f"Session 7 (Set 1): {len(keys_by_session[7])} keys. Missing: {[q for q in range(1, 66) if q not in keys_by_session[7]]}")
print(f"Session 8 (Set 2): {len(keys_by_session[8])} keys. Missing: {[q for q in range(1, 66) if q not in keys_by_session[8]]}")
