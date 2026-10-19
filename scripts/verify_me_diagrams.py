import glob
import json
import os

files = sorted(glob.glob('data/gate/branches/mechanical/pyq/*.json'))
missing_imgs = []
found_imgs = 0

for f in files:
    if 'manifest' in f:
        continue
    with open(f, 'r', encoding='utf-8') as fp:
        data = json.load(fp)
    for q in data.get('questions', []):
        # check in question html
        html = q.get('question', '')
        parts = html.split('src="')
        for p in parts[1:]:
            url = p.split('"')[0]
            if url.startswith('/question-images'):
                local_path = os.path.join('public', url.lstrip('/'))
                if not os.path.exists(local_path):
                    missing_imgs.append(local_path)
                else:
                    found_imgs += 1
        # check in structuredOptions html
        for opt in q.get('structuredOptions', []):
            opt_html = opt.get('html', '')
            parts2 = opt_html.split('src="')
            for p2 in parts2[1:]:
                url2 = p2.split('"')[0]
                if url2.startswith('/question-images'):
                    local_path2 = os.path.join('public', url2.lstrip('/'))
                    if not os.path.exists(local_path2):
                        missing_imgs.append(local_path2)
                    else:
                        found_imgs += 1

print(f"Diagram verification: {found_imgs} images found on disk, {len(missing_imgs)} missing.")
if missing_imgs:
    print("Sample missing:", missing_imgs[:5])
