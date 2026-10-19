import io
import urllib.request
import re
import sys
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')
HEADERS = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2024/ME24S2.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req, timeout=15).read()))

page_clean_text = []
for p in reader.pages:
    txt = p.extract_text() or ""
    txt = re.sub(r'Mechanical Engineering \(ME\)', '', txt)
    txt = re.sub(r'Organizing Institute:\s*IISc\s+Bengaluru', '', txt)
    txt = re.sub(r'Page\s+\d+\s+of\s+\d+', '', txt)
    txt = re.sub(r'General Aptitude\s*\(GA\)?', '', txt)
    txt = re.sub(r'Q\.\s*\d+\s*[–-]\s*Q\.\s*\d+\s*Carry\s+[A-Za-z]+\s+mark\s+Each', '', txt)
    page_clean_text.append(txt)

full_text = "\n".join(page_clean_text)

matches = list(re.finditer(r'(?:^|\n)\s*Q\.?\s*(\d+)\s+', full_text))
print(f"Total headers matched: {len(matches)}")

q_blocks = {}
for i in range(len(matches)):
    qno = int(matches[i].group(1))
    start_pos = matches[i].end()
    end_pos = matches[i+1].start() if i+1 < len(matches) else len(full_text)
    content = full_text[start_pos:end_pos].strip()
    q_blocks[qno] = content

print(f"Extracted questions count: {len(q_blocks)}")
missing = [q for q in range(1, 66) if q not in q_blocks]
print(f"Missing questions: {missing}")
