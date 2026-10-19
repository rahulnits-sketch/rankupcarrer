import pypdf
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "C:/Users/rkuma/.gemini/antigravity/scratch/gateme_full.pdf"
reader = pypdf.PdfReader(pdf_path)

tags = []
for pno, p in enumerate(reader.pages):
    txt = p.extract_text() or ""
    # find all gate tags like gateme-2018-set2 or GATE Mechanical 2018
    m1 = re.findall(r'gateme-\d{4}(?:-[a-z0-9]+)?', txt, re.I)
    m2 = re.findall(r'GATE Mechanical \d{4}[^\n|]*\|\s*Question:\s*\d+', txt, re.I)
    tags.extend(m1)
    tags.extend(m2)

print(f"Total GATE tags/questions found in gateme_full.pdf: {len(tags)}")
print(f"Sample tags: {tags[:20]}")
