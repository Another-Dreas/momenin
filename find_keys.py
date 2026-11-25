import re
for fname in ['js/store.js', 'js/auth.js']:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    # Find all quoted strings
    matches = re.findall(r'["\']([^"\']{5,40})["\']', content)
    keys = [m for m in matches if 'momenin' in m.lower() or 'demo' in m.lower() or 'session' in m.lower() or 'storage' in m.lower()]
    print(fname, ':', keys[:20])
