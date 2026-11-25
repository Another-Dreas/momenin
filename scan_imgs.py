import os, re

found = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ['.git','node_modules']]
    for f in files:
        if f.endswith(('.html','.js','.css')):
            path = os.path.join(root, f)
            with open(path,'r',encoding='utf-8',errors='ignore') as fh:
                for i, line in enumerate(fh, 1):
                    if 'picsum' in line or 'unsplash' in line or ('image' in line.lower() and ('http' in line or '.jpg' in line.lower() or '.png' in line.lower())):
                        print(path + ':' + str(i) + '  ' + line.strip()[:130])
