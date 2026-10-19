import urllib.request
import json

urls = [
    'http://localhost:3000/api/gate/test/gate-ce-2025-s1',
    'http://localhost:3000/api/gate/test/gate-ce-2025-s2',
    'http://localhost:3000/api/gate/test/gate-mock-civil-full-1',
    'http://localhost:3000/api/gate/test/gate-subject-civil-structures'
]

for u in urls:
    try:
        res = urllib.request.urlopen(u, timeout=5)
        d = json.loads(res.read())
        endpoint = u.split("/")[-1]
        print(f"{endpoint}: status={res.status}, title={d.get('title')}, questions={len(d.get('questions', []))}")
    except Exception as e:
        endpoint = u.split("/")[-1]
        print(f"{endpoint}: error={e}")
