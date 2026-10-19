import urllib.request
import re

req = urllib.request.Request('https://gate2027.iitm.ac.in/download', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
links = re.findall(r'href=[\'"]([^\'"]+\.pdf)[\'"]', html)

years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015']
for y in years:
    matching = [l for l in links if y in l and any(k in l.lower() for k in ['me', 'mechanical'])]
    print(f"Year {y}: {len(matching)} links -> {matching}")
