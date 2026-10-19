import json
import glob
import os

with open('data/gate/branches/civil/pyq/2025-s1.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print(f"Paper: {d['title']} - Total questions: {len(d['questions'])}")
for q in d['questions'][10:20]:
    q_text = q['question'].replace('\n', ' ')
    print(f"Q{q['orderIndex']} ({q['type']}) [{q['subjectSlug']}]: {q_text[:75]}")

print("\n--- Checking for duplicates in 2025-s1 ---")
seen = {}
for q in d['questions']:
    key = q['question'].strip()
    if key in seen:
        print(f"DUPLICATE DETECTED! Q{seen[key]} and Q{q['orderIndex']}")
    else:
        seen[key] = q['orderIndex']
if len(seen) == len(d['questions']):
    print("All 65 questions are 100% UNIQUE! No duplicates.")

# Check all papers
print("\n--- Checking all Civil PYQ papers ---")
papers = sorted(glob.glob('data/gate/branches/civil/pyq/20*.json'))
for p in papers:
    with open(p, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"{os.path.basename(p)}: {len(data['questions'])} questions")

# Check images downloaded
imgs = glob.glob('public/question-images/gate/ce/*/*')
print(f"\nTotal local images downloaded: {len(imgs)}")
