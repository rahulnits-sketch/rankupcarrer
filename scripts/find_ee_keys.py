import pypdf
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('C:/Users/rkuma/.gemini/antigravity/scratch/ee.pdf')

for pno, page in enumerate(reader.pages):
    txt = page.extract_text() or ''
    if "Answer Keys" in txt or "Answer Key" in txt:
        print(f"Page {pno+1}: contains 'Answer Keys'")
        lines = [l.strip() for l in txt.splitlines() if l.strip()]
        for l in lines[:10]:
            print("   ", l)
