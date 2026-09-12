import os, glob

base = os.path.join('src', 'app', 'admin', 'ai')
count = 0

for pattern in ['**/*.tsx', '**/*.ts']:
    for filepath in glob.glob(os.path.join(base, pattern), recursive=True):
        with open(filepath, 'rb') as f:
            data = f.read()
        
        # Replace any byte > 127 with a dash (0x2D)
        cleaned = bytes(b if b <= 127 else 0x2D for b in data)
        
        if cleaned != data:
            with open(filepath, 'wb') as f:
                f.write(cleaned)
            count += 1
            print(f"Fixed: {filepath}")

print(f"\nDone. Fixed {count} files.")

# Verify
remaining = 0
for pattern in ['**/*.tsx', '**/*.ts']:
    for filepath in glob.glob(os.path.join(base, pattern), recursive=True):
        with open(filepath, 'rb') as f:
            data = f.read()
        if any(b > 127 for b in data):
            print(f"STILL DIRTY: {filepath}")
            remaining += 1

if remaining == 0:
    print("All files are clean ASCII!")
