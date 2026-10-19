import io
import urllib.request
import re
from pypdf import PdfReader

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025_Key/ME_Keys.pdf', headers=HEADERS)
data = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(data))

text = ""
for p in reader.pages:
    text += p.extract_text() + "\n"

lines = [l.strip() for l in text.splitlines() if l.strip()]

# Let's find entries: each entry starts with a Q No from 1 to 65
entries = {}
current_q = None
buffer = []

# Notice table has headers on each page:
# "Answer Key for Mechanical Engineering (ME)"
# "Q. No.", "Session", "Q. Type", "Section", "Key/Range", "Marks"

filtered_lines = []
skip_headers = {"Answer Key for Mechanical Engineering (ME)", "Q. No.", "Session", "Q. Type", "Section", "Key/Range", "Marks"}

for l in lines:
    if l in skip_headers:
        continue
    filtered_lines.append(l)

i = 0
keys = {}
while i < len(filtered_lines):
    val = filtered_lines[i]
    if val.isdigit() and int(val) in range(1, 66) and (len(keys) == 0 or int(val) == len(keys) + 1):
        qno = int(val)
        session = filtered_lines[i+1]
        qtype = filtered_lines[i+2]
        sec = filtered_lines[i+3]
        # Next comes key, then marks. Marks is either 1 or 2 at the end before next Q or EOF
        # Let's peek ahead to find marks (1 or 2)
        # Usually key is tokens between sec and marks
        j = i + 4
        key_tokens = []
        while j < len(filtered_lines):
            # check if j+1 is next qno or j is marks
            # marks is '1' or '2'
            if filtered_lines[j] in ('1', '2'):
                # check if filtered_lines[j+1] is qno+1
                if j + 1 >= len(filtered_lines) or filtered_lines[j+1] == str(qno + 1):
                    marks = int(filtered_lines[j])
                    break
            key_tokens.append(filtered_lines[j])
            j += 1
        raw_key = " ".join(key_tokens)
        keys[qno] = {
            "session": session,
            "type": qtype,
            "section": sec,
            "raw_key": raw_key,
            "marks": marks
        }
        i = j + 1
    else:
        i += 1

print(f"Parsed {len(keys)} questions keys.")
for q in [1, 2, 5, 10, 11, 20, 30, 40, 50, 60, 65]:
    if q in keys:
        print(f"Q{q}: {keys[q]}")
