import urllib.request, io, os, re, sys, json
sys.stdout.reconfigure(encoding='utf-8')
from pypdf import PdfReader
from PIL import Image

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
ROOT_DIR = "C:/vscode/TestMaker/gate-cse-test-series"
IMG_DIR = os.path.join(ROOT_DIR, "public/question-images/gate/me/2026_1")
os.makedirs(IMG_DIR, exist_ok=True)

# 1. Download and parse ME_Keys.pdf
print("1. Fetching & parsing ME_Keys.pdf...")
req_k = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2026/Keys/ME_Keys.pdf', headers=HEADERS)
keys_pdf = urllib.request.urlopen(req_k, timeout=10).read()
reader_k = PdfReader(io.BytesIO(keys_pdf))

keys_text = ""
for p in reader_k.pages:
    keys_text += p.extract_text() + "\n"

keys_map = {}
for line in keys_text.splitlines():
    m = re.match(r'^(\d+)\s+(\d+)\s+(MCQ|MSQ|NAT|MTA)\s+(GA|ME)\s+(.*?)\s+(\d+)$', line.strip())
    if m:
        qno = int(m.group(1))
        qtype = m.group(3)
        sec = m.group(4)
        raw_key = m.group(5).strip()
        marks = int(m.group(6))
        
        # parse answer & tolerance
        ans = []
        tol = None
        if qtype == "NAT":
            # parse range like "18.5 to 19.5" or "-0.61 to -0.57 OR 0.57 to 0.61"
            range_match = re.search(r'(-?\d+(?:\.\d+)?)\s+to\s+(-?\d+(?:\.\d+)?)', raw_key)
            if range_match:
                min_v = float(range_match.group(1))
                max_v = float(range_match.group(2))
                tol = {"min": min(min_v, max_v), "max": max(min_v, max_v)}
                mid = round((min_v + max_v) / 2, 2)
                ans = [str(mid) if mid != int(mid) else str(int(mid))]
            else:
                ans = [raw_key]
        elif qtype in ("MCQ", "MSQ"):
            # can be single letter or multiple letters e.g. "A; B" or "A, B"
            letters = re.findall(r'[A-D]', raw_key)
            ans = letters if letters else [raw_key]

        neg_marks = 0.0
        if qtype == "MCQ":
            neg_marks = 0.33 if marks == 1 else 0.66

        keys_map[qno] = {
            "type": qtype,
            "section": sec,
            "answer": ans,
            "tolerance": tol,
            "marks": marks,
            "negativeMarks": neg_marks,
            "rawKey": raw_key
        }

print(f"   Successfully parsed keys for {len(keys_map)} questions.")

# 2. Download and process ME.pdf
print("\n2. Downloading ME.pdf...")
req_qp = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf', headers=HEADERS)
qp_pdf = urllib.request.urlopen(req_qp, timeout=15).read()
reader = PdfReader(io.BytesIO(qp_pdf))
print(f"   Total pages in ME.pdf: {len(reader.pages)}")

# Extract images from all pages
page_images_saved = {}
for p_idx, page in enumerate(reader.pages):
    pno = p_idx + 1
    page_images_saved[pno] = []
    for img_idx, img_file in enumerate(page.images):
        try:
            im = Image.open(io.BytesIO(img_file.data))
            w, h = im.size
            # skip full page border (1140x1600) and header logo (117x164)
            if (w == 1140 and h == 1600) or (w == 117 and h == 164) or w < 70 or h < 70:
                continue
            fname = f"me_2026_p{pno}_img{img_idx}.png"
            im.save(os.path.join(IMG_DIR, fname))
            page_images_saved[pno].append({
                "filename": fname,
                "url": f"/question-images/gate/me/2026_1/{fname}",
                "width": w,
                "height": h
            })
        except Exception as e:
            pass

print(f"   Saved diagram images across pages.")

# Map questions to pages and text
# Let's inspect page question map
page_text = []
for p in reader.pages:
    txt = p.extract_text() or ""
    # strip header/footers
    txt = re.sub(r'Mechanical Engineering \(ME\)', '', txt)
    txt = re.sub(r'Organizing Institute:\s*IIT\s+[A-Za-z]+', '', txt)
    txt = re.sub(r'Page\s+\d+\s+of\s+\d+', '', txt)
    txt = re.sub(r'General Aptitude\s*\(GA\)', '', txt)
    txt = re.sub(r'Q\.\d+\s*–\s*Q\.\d+\s*Carry\s+[A-Za-z]+\s+mark\s+Each', '', txt)
    page_text.append(txt)

full_cleaned_doc = "\n".join(page_text)

# Match questions Q.1 to Q.65
q_blocks = {}
matches = list(re.finditer(r'(?:^|\n)\s*Q\.?\s*(\d+)\s*\n?', full_cleaned_doc))
for i in range(len(matches)):
    qno = int(matches[i].group(1))
    start_pos = matches[i].end()
    end_pos = matches[i+1].start() if i+1 < len(matches) else len(full_cleaned_doc)
    q_content = full_cleaned_doc[start_pos:end_pos].strip()
    q_blocks[qno] = q_content

print(f"\n3. Extracted {len(q_blocks)} question text blocks.")
for qn in [1, 2, 11, 48, 49, 65]:
    if qn in q_blocks:
        print(f"\n--- Q{qn} ---")
        print(q_blocks[qn][:180] + "...")
