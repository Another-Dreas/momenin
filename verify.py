checks = []

with open('js/store.js','r',encoding='utf-8') as f:
    c = f.read()
checks.append(('store.js key v3', 'momenin_data_v3' in c))
checks.append(('store.js no v2', 'momenin_data_v2' not in c))

with open('css/style.css','r',encoding='utf-8') as f:
    c = f.read()
checks.append(('header position fixed', 'position: fixed' in c))
checks.append(('header transition 320ms', '320ms' in c))
checks.append(('body padding-top', 'padding-top: var(--header-h)' in c))
checks.append(('scrolled class css', '.header.scrolled' in c))

with open('js/layout.js','r',encoding='utf-8') as f:
    c = f.read()
checks.append(('no mobile-only restriction', 'innerWidth < 900' not in c))
checks.append(('scrolled class added', 'scrolled' in c))
checks.append(('SCROLL_THRESHOLD', 'SCROLL_THRESHOLD' in c))

with open('js/data.js','r',encoding='utf-8') as f:
    c = f.read()
checks.append(('no picsum', 'picsum' not in c))
checks.append(('unsplash in data', 'unsplash' in c))
checks.append(('graduation photo', '1523050854058' in c))
checks.append(('wedding hero url', '1519741497674' in c))

for label, result in checks:
    print(('OK   ' if result else 'FAIL ') + label)
