import io
import urllib.request
import re
from pypdf import PdfReader

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025_Key/ME_Keys.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req).read()))

full_text = ""
for p in reader.pages:
    full_text += p.extract_text() + "\n"

# Remove footer / header noise
cleaned_lines = []
for l in full_text.splitlines():
    l_str = l.strip()
    if not l_str:
        continue
    if "Answer Key for Mechanical Engineering" in l_str or "Page " in l_str:
        continue
    if l_str in ("Q. No.", "Session", "Q. Type", "Section", "Key/Range", "Marks"):
        continue
    cleaned_lines.append(l_str)

i = 0
parsed_keys = {}
while i < len(cleaned_lines):
    token = cleaned_lines[i]
    if token.isdigit() and int(token) == len(parsed_keys) + 1:
        qno = int(token)
        session = cleaned_lines[i+1]
        qtype = cleaned_lines[i+2]
        sec = cleaned_lines[i+3]
        # Next is key, then marks
        # marks is always either '1' or '2'
        # and next token after marks is either str(qno + 1) or end of list
        j = i + 4
        key_parts = []
        while j < len(cleaned_lines):
            if cleaned_lines[j] in ('1', '2') and (j + 1 == len(cleaned_lines) or cleaned_lines[j+1] == str(qno + 1)):
                marks = int(cleaned_lines[j])
                break
            key_parts.append(cleaned_lines[j])
            j += 1
        raw_key = " ".join(key_parts)
        parsed_keys[qno] = {
            "qno": qno,
            "session": session,
            "type": qtype,
            "section": sec,
            "key": raw_key,
            "marks": marks
        }
        i = j + 1
    else:
        i += 1

print(f"Total keys parsed: {len(parsed_keys)}")
for q in range(1, 66):
    if q not in parsed_keys:
        print(f"MISSING: Q{q}")
    else:
        k = parsed_keys[q]
        print(f"Q{q:02d}: {k['type']:<4} {k['section']} Marks={k['marks']} Key={k['key']}")
