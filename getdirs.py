import json
import os

dirs = os.listdir('functions')
print(f"value={json.dumps(dirs)}")