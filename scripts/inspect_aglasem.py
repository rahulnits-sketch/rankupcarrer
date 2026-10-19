import urllib.request, re, sys
sys.stdout.reconfigure(encoding='utf-8')

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

req = urllib.request.Request('https://admission.aglasem.com/gate-2026-question-paper/', headers=headers)
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')

# Extract all anchor tags with their text
anchors = re.findall(r'<a\s+[^>]*href=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</a>', html, re.DOTALL)
print(f"Total links: {len(anchors)}")
for href, text in anchors:
    clean_text = re.sub(r'<[^>]+>', '', text).strip()
    if any(k in clean_text.lower() for k in ['mechanical', 'me', 'gate 2026', 'answer key']):
        print(f"[{clean_text}] -> {href}")
