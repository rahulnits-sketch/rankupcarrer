import pypdf
import sys
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "C:/Users/rkuma/.gemini/antigravity/scratch/gateme_full.pdf"
reader = pypdf.PdfReader(pdf_path)

for pno in range(10, 20):
    txt = reader.pages[pno].extract_text()
    lines = [l.strip() for l in txt.splitlines() if l.strip()]
    print(f"=== Page {pno+1} ({len(lines)} lines) ===")
    for l in lines[:8]:
        print("  ", l)
