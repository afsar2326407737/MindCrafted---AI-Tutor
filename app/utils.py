def chunk_text(text, max_length=800):
    paragraphs = text.split('\n\n')
    chunks = []
    for para in paragraphs:
        para = para.strip()
        if 100 < len(para) <= max_length:
            chunks.append(para)
        elif len(para) > max_length:
            chunks.extend([para[i:i+max_length] for i in range(0, len(para), max_length)])
    return chunks