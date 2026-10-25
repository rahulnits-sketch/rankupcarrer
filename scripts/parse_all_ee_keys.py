import pypdf
import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('C:/Users/rkuma/.gemini/antigravity/scratch/ee.pdf')
print(f"Total pages: {len(reader.pages)}")

# 1. Parse all Answer Keys across all pages
# An Answer Key section starts with 'Answer Keys'
# lines following are:
# 1.1.1
# 0.74 : 0.76
# 1.2.1
# D
# etc.

all_keys = {}
for pno, page in enumerate(reader.pages):
    txt = page.extract_text() or ''
    if "Answer Keys" in txt:
        parts = txt.split("Answer Keys")
        for part in parts[1:]:
            lines = [l.strip() for l in part.splitlines() if l.strip()]
            i = 0
            while i < len(lines):
                m = re.match(r'^(\d+(?:\.\d+)+)$', lines[i])
                if m:
                    q_num = m.group(1)
                    if i + 1 < len(lines):
                        val = lines[i+1]
                        # check if val is an answer or another q_num or chapter header
                        if not re.match(r'^\d+(?:\.\d+)+$', val) and len(val) < 40:
                            all_keys[q_num] = val
                            i += 2
                            continue
                i += 1

print(f"Total Answer Keys extracted: {len(all_keys)}")
sample_items = list(all_keys.items())[:15]
for k, v in sample_items:
    print(f"  {k} -> {v}")
