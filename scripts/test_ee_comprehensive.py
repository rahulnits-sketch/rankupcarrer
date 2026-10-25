import pypdf
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('C:/Users/rkuma/.gemini/antigravity/scratch/ee.pdf')

# Comprehensive regex to match BOTH Core and GA questions
header_re = re.compile(
    r'([A-Za-z\s&,\-\(\)\.\/\'\"]+?):\s*GATE\s+Electrical\s+(\d{4})(?:\s+Set\s*(\d+))?(?:\s*\|\s*GA)?\s*\|\s*Question:\s*(\d+)',
    re.IGNORECASE
)

papers = {}

for pno, page in enumerate(reader.pages):
    txt = page.extract_text() or ''
    matches = list(header_re.finditer(txt))
    for m in matches:
        subject = m.group(1).strip()
        year = int(m.group(2))
        set_num = int(m.group(3)) if m.group(3) else 1
        is_ga = "GA" in m.group(0)
        qno = int(m.group(4))
        
        key = f"{year}-s{set_num}"
        if key not in papers:
            papers[key] = {"GA": set(), "EE": set()}
        
        if is_ga or qno <= 10 and "Aptitude" in subject:
            papers[key]["GA"].add(qno)
        else:
            papers[key]["EE"].add(qno)

print("Comprehensive GATE EE Extraction from ee.pdf:")
for key in sorted(papers.keys()):
    ga_cnt = len(papers[key]["GA"])
    ee_cnt = len(papers[key]["EE"])
    total = ga_cnt + ee_cnt
    print(f"  {key}: GA={ga_cnt}/10, EE={ee_cnt}/55, Total={total}/65")
