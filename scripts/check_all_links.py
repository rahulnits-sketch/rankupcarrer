import urllib.request
import re

req = urllib.request.Request('https://gate2027.iitm.ac.in/download', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
links = re.findall(r'href=[\'"]([^\'"]+\.pdf)[\'"]', html)
me_links = [l for l in links if 'me' in l.lower() or 'mechanical' in l.lower()]
print("Found ME links count:", len(me_links))
for l in sorted(set(me_links)):
    print(l)
