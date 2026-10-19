import urllib.request
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

branches = ['ME', 'EE', 'EC', 'ECE', 'CE', 'CS']
years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018]

for b in branches:
    found = []
    for y in years:
        for s in [1, 2]:
            url = f"https://pyqs.co.in/api/metadata?year={y}&set={s}&paper={b}"
            try:
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=4) as res:
                    data = json.loads(res.read())
                    if data and len(data) > 0:
                        found.append(f"{y}-s{s}({len(data)})")
            except Exception as e:
                pass
    print(f"Paper {b}: {found if found else 'NO DATA'}")
