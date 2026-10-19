# -*- coding: utf-8 -*-
import io
import urllib.request
import re
import sys
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')
HEADERS = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025/ME2025.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req, timeout=15).read()))

page_clean_text = []
for p in reader.pages:
    txt = p.extract_text() or ""
    txt = re.sub(r'Mechanical Engineering \(ME\)', '', txt)
    txt = re.sub(r'Organizing Institute:\s*IIT\s+[A-Za-z]+', '', txt)
    txt = re.sub(r'Page\s+\d+\s+of\s+\d+', '', txt)
    txt = re.sub(r'General Aptitude\s*\(GA\)?', '', txt)
    txt = re.sub(r'Q\.\s*\d+\s*[–-]\s*Q\.\s*\d+\s*Carry\s+[A-Za-z]+\s+mark\s+Each', '', txt)
    page_clean_text.append(txt)

full_text = "\n".join(page_clean_text)

# Split by Q.1 or Q. 1
matches = list(re.finditer(r'(?:^|\n)\s*Q\.?\s*(\d+)\s+', full_text))
print(f"Total question headers matched: {len(matches)}")

q_blocks = {}
for i in range(len(matches)):
    qno = int(matches[i].group(1))
    start_pos = matches[i].end()
    end_pos = matches[i+1].start() if i+1 < len(matches) else len(full_text)
    content = full_text[start_pos:end_pos].strip()
    q_blocks[qno] = content

print(f"Extracted questions count: {len(q_blocks)}")
for q in [1, 2, 5, 10, 11, 15, 16, 28, 35, 45, 55, 65]:
    if q in q_blocks:
        first_line = q_blocks[q].splitlines()[0]
        print(f"Q{q:02d}: {first_line[:80]}")
    else:
        print(f"MISSING: Q{q}")
