# -*- coding: utf-8 -*-
import pypdf
import re
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = "C:/vscode/TestMaker/gate-cse-test-series"
PDF_PATH = "C:/Users/rkuma/.gemini/antigravity/scratch/gateme_full.pdf"
POOL_FILE = os.path.join(ROOT_DIR, "data/gate/branches/mechanical/pdf_extracted_pool.json")

with open(POOL_FILE, "r", encoding="utf-8") as f:
    extracted_pool = json.load(f)

seen_texts = set(q["html"] for q in extracted_pool)
print(f"Loaded existing pool: {len(extracted_pool)} questions", flush=True)

reader = pypdf.PdfReader(PDF_PATH)
header_re = re.compile(r'([A-Za-z0-9\s,\-\(\)\.\/\'\"]+:\s*GATE\s+Mechanical[^\n]+)', re.IGNORECASE)

def clean_html(text):
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return text.strip()

for pno in range(260, 360):
    if pno % 25 == 0:
        print(f"Scanning page {pno}/360... (Total pool: {len(extracted_pool)})", flush=True)
    txt = reader.pages[pno].extract_text() or ""
    matches = list(header_re.finditer(txt))
    if not matches:
        continue
    
    for idx, m in enumerate(matches):
        raw_title = m.group(1).strip()
        start = m.end()
        end = matches[idx+1].start() if idx+1 < len(matches) else len(txt)
        raw_body = txt[start:end].strip()
        
        options = []
        structured_options = []
        opt_matches = re.findall(r'(?:^|\n)\s*([A-D])\s*\.\s*([^\n]+(?:\n(?![A-D]\s*\.)[^\n]+)*)', raw_body)
        if opt_matches and len(opt_matches) >= 2:
            q_type = "MCQ"
            for lbl, opt_text in opt_matches:
                clean_opt = opt_text.strip()
                options.append(clean_opt)
                structured_options.append({
                    "label": lbl,
                    "text": clean_opt,
                    "html": clean_opt
                })
        else:
            q_type = "NAT"

        clean_body = re.sub(r'(?:^|\n)\s*[A-D]\s*\..*', '', raw_body, flags=re.DOTALL)
        clean_body = re.sub(r'gateme-[a-z0-9\-]+.*', '', clean_body, flags=re.DOTALL)
        clean_body = clean_body.strip()
        
        if not clean_body or len(clean_body) < 25:
            continue
            
        q_html = f"<p>{clean_html(clean_body)}</p>"
        if q_html in seen_texts:
            continue
            
        seen_texts.add(q_html)
        
        text_lower = (raw_title + " " + clean_body).lower()
        if any(k in text_lower for k in ["heat", "thermodynamic", "entropy", "carnot", "cycle", "refrigerat", "brayton", "rankine", "conduction", "convection", "radiation"]):
            subj = ("Thermodynamics & Heat Transfer", "thermodynamics", "Applied Thermodynamics & Heat Transfer")
        elif any(k in text_lower for k in ["fluid", "bernoulli", "viscosity", "reynolds", "boundary layer", "mach", "pipe flow", "pump", "turbine"]):
            subj = ("Fluid Mechanics & Turbomachinery", "fluid-mechanics", "Fluid Dynamics & Turbomachinery")
        elif any(k in text_lower for k in ["stress", "strain", "beam", "shear", "bending", "torsion", "deflection", "cylinder", "mohr", "yield"]):
            subj = ("Strength of Materials (SOM)", "som", "Stress, Strain & Deflection of Beams")
        elif any(k in text_lower for k in ["gear", "mechanism", "vibration", "governor", "flywheel", "natural frequency", "damping", "kinematic", "dof"]):
            subj = ("Theory of Machines & Vibrations", "tom", "Kinematics & Mechanical Vibrations")
        elif any(k in text_lower for k in ["casting", "welding", "machining", "chip", "taylor", "tool life", "milling", "lathe", "forming", "metrology"]):
            subj = ("Manufacturing & Materials", "manufacturing", "Machining, Tool Life & Forming")
        elif any(k in text_lower for k in ["project", "pert", "cpm", "inventory", "eoq", "queuing", "simplex", "forecasting", "linear programming"]):
            subj = ("Industrial Engineering", "industrial", "Operations Research & Project Management")
        else:
            subj = ("Strength of Materials (SOM)", "som", "General Mechanical Engineering")

        extracted_pool.append({
            "title": raw_title,
            "body": clean_body,
            "html": q_html,
            "type": q_type,
            "options": options,
            "structuredOptions": structured_options,
            "subject": subj[0],
            "subjectSlug": subj[1],
            "topic": subj[2]
        })

print(f"Final authentic pool size: {len(extracted_pool)}", flush=True)
with open(POOL_FILE, "w", encoding="utf-8") as f:
    json.dump(extracted_pool, f, indent=2, ensure_ascii=False)
print(f"Saved {len(extracted_pool)} questions to {POOL_FILE}", flush=True)
