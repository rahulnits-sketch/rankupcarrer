import urllib.request, io, re, sys
sys.stdout.reconfigure(encoding='utf-8')
from pypdf import PdfReader

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
u = 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf'
req = urllib.request.Request(u, headers=headers)
content = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(content))

full_pages = [p.extract_text() or "" for p in reader.pages]

# Test extracting Q1 to Q10 (GA)
full_doc = "\n".join(full_pages)

# Normalize page footers/headers
cleaned = re.sub(r'Mechanical Engineering \(ME\)', '', full_doc)
cleaned = re.sub(r'Organizing Institute:\s*IIT\s+[A-Za-z]+', '', cleaned)
cleaned = re.sub(r'Page\s+\d+\s+of\s+\d+', '', cleaned)
cleaned = re.sub(r'General Aptitude\s*\(GA\)', '', cleaned)
cleaned = re.sub(r'Q\.\d+\s*–\s*Q\.\d+\s*Carry\s+[A-Za-z]+\s+mark\s+Each', '', cleaned)

# Find questions
q_splits = re.split(r'\n\s*Q\.(\d+)\s*\n', cleaned)
print(f"Total parts in q_splits: {len(q_splits)}")

# Print Q1 to Q5
for i in range(1, min(12, len(q_splits)), 2):
    qno = q_splits[i]
    qtext = q_splits[i+1].strip()
    print(f"\n================ Question {qno} ================")
    print(qtext[:400])
