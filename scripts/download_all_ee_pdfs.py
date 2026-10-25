import os
import urllib.request
import ssl

ctx = ssl._create_unverified_context()
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

TARGET_DIR = r"C:\Users\rkuma\.gemini\antigravity\scratch\ee_pdfs"
os.makedirs(TARGET_DIR, exist_ok=True)

DOWNLOADS = {
    "EE_2026_QP.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/EE.pdf",
    "EE_2026_KEY.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2026/Keys/EE_Keys.pdf",
    "EE_2025_QP.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2025/EE2025.pdf",
    "EE_2025_KEY.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2025_Key/EE_Keys.pdf",
    "EE_2024_QP.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2024/EE24S8.pdf",
    "EE_2024_KEY.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2024/EEFinalAnswerKey.pdf",
    "EE_2023_QP.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2023/ee_2023.pdf",
    "EE_2023_KEY.pdf": "https://gate2027.iitm.ac.in/static/doc/download/Answer_keys2023/EE_ANS_GATE2023.pdf",
    "EE_2022_QP.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2022/ee_2022.pdf",
    "EE_2022_KEY.pdf": "https://gate2027.iitm.ac.in/static/doc/download/Answer_keys2022/ee_2022.pdf",
    "EE_2021_QP.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2021/ee_2021.pdf",
    "EE_2021_KEY.pdf": "https://gate2027.iitm.ac.in/static/doc/download/Answer_keys2021/ee_2021.pdf",
    "EE_2020_QP.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2020/ee_2020.pdf",
    "EE_2019_QP.pdf": "https://gate2027.iitm.ac.in/static/doc/download/2019/ee_2019.pdf"
}

for fname, url in DOWNLOADS.items():
    fpath = os.path.join(TARGET_DIR, fname)
    if not os.path.exists(fpath) or os.path.getsize(fpath) < 1000:
        print(f"Downloading {fname} from {url}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            data = urllib.request.urlopen(req, timeout=25, context=ctx).read()
            with open(fpath, "wb") as f:
                f.write(data)
            print(f"  Saved {fname} ({len(data)} bytes)")
        except Exception as e:
            print(f"  Error downloading {fname}: {e}")
    else:
        print(f"Already exists: {fname} ({os.path.getsize(fpath)} bytes)")

print("Download step complete.")
