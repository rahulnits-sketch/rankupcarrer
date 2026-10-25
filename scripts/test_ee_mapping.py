import pypdf
import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('C:/Users/rkuma/.gemini/antigravity/scratch/ee.pdf')

# 1. First extract all answer keys: q_code -> key
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
                        if not re.match(r'^\d+(?:\.\d+)+$', val) and len(val) < 50:
                            all_keys[q_num] = val
                            i += 2
                            continue
                i += 1

print(f"Total keys: {len(all_keys)}")

# Let's inspect how question headers and codes match
# On page 13, let's see how question numbers (like 1.1.1, 1.2.1) are positioned relative to the question header
for pno in range(12, 17):
    txt = reader.pages[pno].extract_text() or ''
    lines = [l.strip() for l in txt.splitlines() if l.strip()]
    print(f"\n--- Page {pno+1} Lines ---")
    for l in lines[:25]:
        print(l)
