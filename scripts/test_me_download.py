import urllib.request

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

urls = [
    'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/ME.pdf',
    'https://gate2027.iitm.ac.in/static/doc/download/2026/Keys/ME_Keys.pdf',
    'https://gate2027.iitm.ac.in/static/doc/download/2025/ME2025.pdf',
    'https://gate2027.iitm.ac.in/static/doc/download/2024/ME24S2.pdf',
    'https://gate2027.iitm.ac.in/static/doc/download/2024/MEFinalAnswerKey.pdf',
]
for u in urls:
    name = u.split('/')[-1]
    try:
        req = urllib.request.Request(u, headers=headers)
        res = urllib.request.urlopen(req, timeout=10)
        data = res.read()
        print(f"{name}: status {res.status}, size {len(data)} bytes")
    except Exception as e:
        print(f"{name}: error {e}")
