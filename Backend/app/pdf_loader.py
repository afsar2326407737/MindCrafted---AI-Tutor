import re
from pdfminer.high_level import extract_text

def clean_text(text):
    lines = text.split('\n')
    clean_lines = []
    seen_lines = set()
    for line in lines:
        line = line.strip()
        if not line or re.match(r'^\d+\s*$', line):
            continue
        if line in seen_lines:
            continue  # skip repeated headers/footers
        seen_lines.add(line)
        clean_lines.append(line)
    return '\n'.join(clean_lines)

def extract_pdf_text(path):
    raw_text = extract_text(path)
    return clean_text(raw_text)