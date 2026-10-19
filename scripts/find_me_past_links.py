import urllib.request
import re

req = urllib.request.Request('https://gate2027.iitm.ac.in/download', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=8).read().decode('utf-8')
links = re.findall(r'href=[\'"]([^\'"]+\.pdf)[\'"]', html)
for l in links:
    if any(y in l for y in ['2025', '2024', '2023', '2022', '2021']) and 'me' in l.lower():
        print(l)
