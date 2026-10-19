import pypdf
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "C:/Users/rkuma/.gemini/antigravity/scratch/gateme_full.pdf"
reader = pypdf.PdfReader(pdf_path)

extracted_questions = []
# Let's inspect pages 1 to 200
for pno in range(10, 150):
    txt = reader.pages[pno].extract_text() or ""
    # Find question chunks. In GATE Overflow books, questions start with a question heading
    # e.g., "Engines: GATE Mechanical 2022 Set 1 | Question: 52"
    # or "Heading: GATE Mechanical 2018 | Question: 10"
    matches = list(re.finditer(r'([A-Za-z0-9\s,\-\(\)\.\/\'\"]+:\s*GATE\s+Mechanical[^\n]+)', txt, re.IGNORECASE))
    for m in matches:
        title = m.group(1).strip()
        extracted_questions.append((pno+1, title))

print(f"Scanned pages 10-150: Found {len(extracted_questions)} questions!")
for p, t in extracted_questions[:15]:
    print(f"  P{p}: {t}")
