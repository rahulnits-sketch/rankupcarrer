import urllib.request
import re

req = urllib.request.Request('https://gate2027.iitm.ac.in/download', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
links = re.findall(r'href=[\'"]([^\'"]+\.pdf)[\'"]', html)

for yr in range(2015, 2027):
    yr_links = [l for l in links if str(yr) in l]
    ee = [l for l in yr_links if re.search(r'(^|/|_|-)(ee|electrical)(_|-|\.|\d|$)', l, re.I)]
    print(f'Year {yr}: {len(yr_links)} total links | EE: {ee}')
