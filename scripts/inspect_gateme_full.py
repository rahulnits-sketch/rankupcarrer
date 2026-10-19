import pypdf
import sys
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "C:/Users/rkuma/.gemini/antigravity/scratch/gateme_full.pdf"
reader = pypdf.PdfReader(pdf_path)
print(f"Total pages in gateme_full.pdf: {len(reader.pages)}")

# Print preview of first 5 pages
for i in range(min(5, len(reader.pages))):
    print(f"=== Page {i+1} ===")
    print(reader.pages[i].extract_text()[:300])
