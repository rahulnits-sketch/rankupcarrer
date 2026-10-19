import urllib.request

base = 'https://gate2027.iitm.ac.in/'
candidates = [
    'static/doc/download/2025/ME2025.pdf',
    'static/doc/download/2025_Key/ME_Keys.pdf',
    'static/doc/download/2024/ME24S1.pdf',
    'static/doc/download/2024/ME24S2.pdf',
    'static/doc/download/2024/ME_2024.pdf',
    'static/doc/download/2024/MEFinalAnswerKey.pdf',
    'static/doc/download/2023/me_2023.pdf',
    'static/doc/download/Answer_keys2023/ME_ANS_GATE2023.pdf',
    'static/doc/download/2022/me_2022.pdf',
    'static/doc/download/Answer_keys2022/me-merged_2022.pdf',
    'static/doc/download/2021/me_2021.pdf',
    'static/doc/download/2021/me_2021_1.pdf',
    'static/doc/download/2021/me_2021_2.pdf',
    'static/doc/download/Answer_keys2021/me_merged_2021.pdf',
    'static/doc/download/2020/me_2020.pdf',
    'static/doc/download/2020/me_2020_1.pdf',
    'static/doc/download/2020/ME_2020.pdf',
    'static/doc/download/2019/me_2019.pdf',
    'static/doc/download/2018/me_2018.pdf',
    'static/doc/download/2017/me_2017.pdf',
    'static/doc/download/2016/me_2016.pdf',
    'static/doc/download/2015/me_2015.pdf',
]

for c in candidates:
    url = base + c
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            print(f'FOUND: {c} -> {resp.status} len={resp.headers.get("Content-Length")}')
    except Exception as e:
        # print(f'NOT FOUND: {c} ({e})')
        pass
