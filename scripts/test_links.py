import urllib.request
import re

req = urllib.request.Request('https://pyqs.co.in/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
links = re.findall(r'href=[\'"]([^\'"]+)[\'"]', html)
for l in sorted(set(links)):
    if 'gate' in l:
        print(l)
