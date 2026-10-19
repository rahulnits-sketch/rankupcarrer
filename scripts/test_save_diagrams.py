import urllib.request, io, os
from pypdf import PdfReader
from PIL import Image

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
u = 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf'
req = urllib.request.Request(u, headers=headers)
content = urllib.request.urlopen(req, timeout=10).read()
reader = PdfReader(io.BytesIO(content))

out_dir = "public/question-images/gate/me/2026_1"
os.makedirs(out_dir, exist_ok=True)

test_pages = [3, 8, 10, 40]
for pno in test_pages:
    page = reader.pages[pno-1]
    for img_idx, img_file in enumerate(page.images):
        # Skip small header logos (typically Im0.jpg is the logo, or width/height < 80)
        img_data = io.BytesIO(img_file.data)
        try:
            im = Image.open(img_data)
            w, h = im.size
            if w > 80 and h > 80 and 'logo' not in img_file.name.lower():
                saved_name = f"page_{pno}_img_{img_idx}.png"
                im.save(os.path.join(out_dir, saved_name))
                print(f"Page {pno}: Saved {saved_name} ({w}x{h})")
        except Exception as e:
            print(f"Page {pno} error: {e}")
