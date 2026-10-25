import pypdf
import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

print("Reading ee.pdf...")
reader = pypdf.PdfReader('C:/Users/rkuma/.gemini/antigravity/scratch/ee.pdf')
print(f"Total pages: {len(reader.pages)}")

# Match headers like:
# Analog and Digital Electronics: GATE Electrical 2022 | Question: 26
# or Electric Circuits: GATE Electrical 2015 Set 1 | Question: 12
header_re = re.compile(
    r'([A-Za-z\s&,\-\(\)]+):\s*GATE\s+Electrical\s+(\d{4})(?:\s+Set\s*(\d+))?\s*\|\s*Question:\s*(\d+)',
    re.IGNORECASE
)

questions_by_year = {}

for pno, page in enumerate(reader.pages):
    txt = page.extract_text() or ''
    matches = list(header_re.finditer(txt))
    if not matches:
        continue
    
    for idx, m in enumerate(matches):
        subject = m.group(1).strip()
        year = int(m.group(2))
        set_num = int(m.group(3)) if m.group(3) else 1
        qno = int(m.group(4))
        
        start = m.end()
        end = matches[idx+1].start() if idx+1 < len(matches) else len(txt)
        content = txt[start:end].strip()
        
        key = f"{year}-s{set_num}"
        if key not in questions_by_year:
            questions_by_year[key] = {}
        
        # Keep best content for this qno
        if qno not in questions_by_year[key] or len(content) > len(questions_by_year[key][qno]['content']):
            questions_by_year[key][qno] = {
                'subject': subject,
                'year': year,
                'set': set_num,
                'qno': qno,
                'content': content,
                'page': pno + 1
            }

print(f"\nUnique papers found:")
for key in sorted(questions_by_year.keys()):
    q_dict = questions_by_year[key]
    print(f"  {key}: {len(q_dict)} questions (Q numbers: min={min(q_dict.keys())}, max={max(q_dict.keys())})")
