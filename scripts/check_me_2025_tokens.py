import io
import urllib.request
import re
from pypdf import PdfReader

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request('https://gate2027.iitm.ac.in/static/doc/download/2025_Key/ME_Keys.pdf', headers=HEADERS)
data = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(data))

text = ""
for p in reader.pages:
    text += p.extract_text() + "\n"

# In 2025 keys, items are separated by newlines:
# Q. No. Session Q. Type Section Key/Range Marks
lines = [l.strip() for l in text.splitlines() if l.strip()]
print("Total lines in keys:", len(lines))
# Let's inspect rows
tokens = []
start = False
for l in lines:
    if l == "Marks":
        start = True
        continue
    if start:
        tokens.append(l)

print("First 30 tokens after header:")
print(tokens[:30])
