import faiss
import numpy as np
import os
import pickle

DIM = 384

class VectorStore:
    def __init__(self, index_path="data/faiss_index"):
        self.index_path = index_path
        self.index_file = os.path.join(index_path, "index.faiss")
        self.meta_file = os.path.join(index_path, "meta.pkl")

        if os.path.exists(self.index_file):
            self.index = faiss.read_index(self.index_file)
            with open(self.meta_file, "rb") as f:
                self.meta = pickle.load(f)
        else:
            self.index = faiss.IndexFlatL2(DIM)
            self.meta = []

    def add(self, text_chunks, embeddings):
        self.index.add(np.array(embeddings).astype("float32"))
        self.meta.extend(text_chunks)
        self._save()

    def _save(self):
        os.makedirs(self.index_path, exist_ok=True)
        faiss.write_index(self.index, self.index_file)
        with open(self.meta_file, "wb") as f:
            pickle.dump(self.meta, f)

    def search(self, query_embedding, top_k=3):
        D, I = self.index.search(np.array([query_embedding]).astype("float32"), top_k)
        return [self.meta[i] for i in I[0]]