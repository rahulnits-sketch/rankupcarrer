import urllib.request

base = 'https://gate2027.iitm.ac.in/'

test_keys = [
    'static/doc/download/Answer_keys2020/me_2020.pdf',
    'static/doc/download/Answer_keys2020/me_merged_2020.pdf',
    'static/doc/download/Answer_keys2020/ME_2020.pdf',
    'static/doc/download/Answer_keys2020/ME.pdf',
    'static/doc/download/2020_Key/ME_Keys.pdf',
    'static/doc/download/2020/ME_Keys.pdf',
    'static/doc/download/2020/me_key.pdf',
    'static/doc/download/Answer_keys2019/me_2019.pdf',
    'static/doc/download/Answer_keys2019/me_merged_2019.pdf',
    'static/doc/download/Answer_keys2019/ME_2019.pdf',
    'static/doc/download/2019_Key/ME_Keys.pdf',
    'static/doc/download/2019/ME_Keys.pdf',
    'static/doc/download/2019/me_keys.pdf',
]

for p in test_keys:
    url = base + p
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=3) as r:
            print(f"FOUND: {p} ({r.headers.get('Content-Length')} bytes)")
    except Exception as e:
        pass
