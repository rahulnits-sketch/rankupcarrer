import io, urllib.request, re, sys
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf-8')

HEADERS = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2022/me_2022.pdf', headers=HEADERS)
reader = PdfReader(io.BytesIO(urllib.request.urlopen(req, timeout=20).read()))

# Set 1: pages 0 to 49
txt1_pages = []
for p in reader.pages[:50]:
    txt = p.extract_text() or ""
    txt = re.sub(r'Mechanical Engineering \(ME\)', '', txt)
    txt = re.sub(r'General Aptitude\s*\(GA\)?', '', txt)
    txt = re.sub(r'Q\.\s*\d+\s*[–-]\s*Q\.\s*\d+\s*Carry\s+[A-Za-z]+\s+mark\s+Each', '', txt)
    txt1_pages.append(txt)

full1 = "\n".join(txt1_pages)
m1 = list(re.finditer(r'(?:^|\n)\s*Q\.?\s*(\d+)\s+', full1))
blocks1 = {}
for i in range(len(m1)):
    qno = int(m1[i].group(1))
    start_pos = m1[i].end()
    end_pos = m1[i+1].start() if i+1 < len(m1) else len(full1)
    blocks1[qno] = full1[start_pos:end_pos].strip()

# Set 2: pages 50 to end
txt2_pages = []
for p in reader.pages[50:]:
    txt = p.extract_text() or ""
    txt = re.sub(r'Mechanical Engineering \(ME\)', '', txt)
    txt = re.sub(r'General Aptitude\s*\(GA\)?', '', txt)
    txt = re.sub(r'Q\.\s*\d+\s*[–-]\s*Q\.\s*\d+\s*Carry\s+[A-Za-z]+\s+mark\s+Each', '', txt)
    txt2_pages.append(txt)

full2 = "\n".join(txt2_pages)
m2 = list(re.finditer(r'(?:^|\n)\s*Q\.?\s*(\d+)\s+', full2))
blocks2 = {}
for i in range(len(m2)):
    qno = int(m2[i].group(1))
    start_pos = m2[i].end()
    end_pos = m2[i+1].start() if i+1 < len(m2) else len(full2)
    blocks2[qno] = full2[start_pos:end_pos].strip()

print(f"Set 1 extracted: {len(blocks1)} questions. Missing: {[q for q in range(1, 66) if q not in blocks1]}")
print(f"Set 2 extracted: {len(blocks2)} questions. Missing: {[q for q in range(1, 66) if q not in blocks2]}")
