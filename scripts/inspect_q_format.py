import pypdf
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('C:/Users/rkuma/.gemini/antigravity/scratch/ee.pdf')

# Let's inspect pages 13-15 where 1.1 and 1.2 are located
for p in range(12, 16):
    txt = reader.pages[p].extract_text() or ''
    print(f"\n=================== PAGE {p+1} ===================")
    print(txt[:1000])
