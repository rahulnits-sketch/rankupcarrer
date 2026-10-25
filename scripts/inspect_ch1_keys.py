import pypdf
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('C:/Users/rkuma/.gemini/antigravity/scratch/ee.pdf')

# Let's inspect pages 48 to 52 (which had Answer Keys for Chapter 1)
print("=== Chapter 1 Answer Keys (pages 48-50) ===")
for p in range(47, 51):
    txt = reader.pages[p].extract_text() or ''
    print(f"--- Page {p+1} ---")
    lines = [l.strip() for l in txt.splitlines() if l.strip()]
    for l in lines[:30]:
        print(l)
