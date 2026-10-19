import urllib.request

base = 'https://gate2027.iitm.ac.in/'

patterns = [
    # 2024
    'static/doc/download/2024/ME24S1.pdf',
    'static/doc/download/2024/ME24S2.pdf',
    'static/doc/download/2024/ME1.pdf',
    'static/doc/download/2024/ME2.pdf',
    'static/doc/download/2024/ME.pdf',
    # 2020
    'static/doc/download/2020/me_2020.pdf',
    'static/doc/download/2020/me_2020_s1.pdf',
    'static/doc/download/2020/me_2020_s2.pdf',
    'static/doc/download/2020/ME_2020.pdf',
    'static/doc/download/Answer_keys2020/me_merged_2020.pdf',
    'static/doc/download/Answer_keys2020/me_2020.pdf',
    'static/doc/download/2020_Key/ME_Keys.pdf',
    # 2019
    'static/doc/download/2019/me_2019.pdf',
    'static/doc/download/2019/ME_2019.pdf',
    'static/doc/download/Answer_keys2019/me_merged_2019.pdf',
    'static/doc/download/Answer_keys2019/me_2019.pdf',
    # 2018
    'static/doc/download/2018/me_2018.pdf',
    'static/doc/download/2018/ME_2018.pdf',
    'static/doc/download/Answer_keys2018/me_2018.pdf',
    # 2017
    'static/doc/download/2017/me_2017.pdf',
    'static/doc/download/Answer_keys2017/me_2017.pdf',
    # 2016
    'static/doc/download/2016/me_2016.pdf',
    # 2015
    'static/doc/download/2015/me_2015.pdf'
]

for p in patterns:
    url = base + p
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=3) as r:
            print(f"EXISTS: {p} ({r.headers.get('Content-Length')} bytes)")
    except Exception as e:
        pass
