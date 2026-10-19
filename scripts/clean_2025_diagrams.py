import glob
import os
from PIL import Image

diag_files = []
for f in sorted(glob.glob('public/question-images/gate/me/2025_1/*.png')):
    with Image.open(f) as im:
        sz = im.size
    if sz in [(1252, 1253), (166, 183)]:
        os.remove(f)
    else:
        diag_files.append((f, sz))

print(f"Kept {len(diag_files)} authentic question diagrams:")
for f, sz in diag_files:
    print(f"  {os.path.basename(f)}: {sz}")
