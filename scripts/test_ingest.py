import urllib.request
import json
import re

HEADERS = {'User-Agent': 'Mozilla/5.0'}

url = 'https://pyqs.co.in/api/fetch-content?year=2025&set=1&paper=CE&section=GA&qno=5'
req = urllib.request.Request(url, headers=HEADERS)
with urllib.request.urlopen(req) as res:
    d = json.loads(res.read())

print("Q5 Type:", d.get('type'))
print("Q5 Content:", d.get('content'))
print("Q5 Options:", json.loads(d.get('options')))
print("Q5 Answer:", json.loads(d.get('answer')))
