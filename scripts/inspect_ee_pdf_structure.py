import pypdf
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('C:/Users/rkuma/.gemini/antigravity/scratch/ee.pdf')

# Search for a question header
header_pattern = re.compile(r'([^\n]+:\s*GATE\s+Electrical\s+(\d{4})\s*\|\s*Question:\s*(\d+))', re.IGNORECASE)

found = 0
for pno in range(12, 50):
    txt = reader.pages[pno].extract_text() or ''
    matches = list(header_pattern.finditer(txt))
    if matches:
        for m in matches:
            found += 1
            full_header = m.group(1)
            year = m.group(2)
            qno = m.group(3)
            print(f"\n==========================================")
            print(f"MATCH #{found}: Page {pno+1} | Year: {year} | QNo: {qno}")
            print(f"Header: {full_header}")
            
            # Print next 500 chars after header
            start = m.end()
            print("--- Content excerpt ---")
            print(txt[start:start+400])
            if found >= 3:
                break
    if found >= 3:
        break
