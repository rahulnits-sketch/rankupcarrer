# -*- coding: utf-8 -*-
import io
import urllib.request
import sys
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')
HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for yr, qp_url, key_url in [
    (2023, 'static/doc/download/2023/me_2023.pdf', 'static/doc/download/Answer_keys2023/ME_ANS_GATE2023.pdf'),
    (2022, 'static/doc/download/2022/me_2022.pdf', 'static/doc/download/Answer_keys2022/me-merged_2022.pdf'),
    (2021, 'static/doc/download/2021/me_2021.pdf', 'static/doc/download/Answer_keys2021/me_merged_2021.pdf')
]:
    print(f"=== Year {yr} ===")
    try:
        r_qp = PdfReader(io.BytesIO(urllib.request.urlopen(urllib.request.Request('https://gate2027.iitm.ac.in/' + qp_url, headers=HEADERS)).read()))
        print(f"QP pages: {len(r_qp.pages)}, P1 text: {r_qp.pages[0].extract_text()[:150]}")
    except Exception as e:
        print(f"QP error: {e}")
    try:
        r_key = PdfReader(io.BytesIO(urllib.request.urlopen(urllib.request.Request('https://gate2027.iitm.ac.in/' + key_url, headers=HEADERS)).read()))
        print(f"Key pages: {len(r_key.pages)}, P1 text: {r_key.pages[0].extract_text()[:150]}")
    except Exception as e:
        print(f"Key error: {e}")
