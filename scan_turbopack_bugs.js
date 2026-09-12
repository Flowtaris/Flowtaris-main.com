const fs = require('fs');
const path = require('path');

function findFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(findFiles(file));
        } else { 
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = findFiles(path.resolve('src'));
let issues = [];

files.forEach(file => {
    try {
        const buffer = fs.readFileSync(file);
        // Check for null bytes
        if (buffer.indexOf(0) !== -1) {
            issues.push(`NULL BYTE found in: ${file}`);
        }
        
        const content = buffer.toString('utf8');
        
        // Check for non-ASCII
        if (/[^\x00-\x7F]/.test(content)) {
            issues.push(`NON-ASCII found in: ${file.replace(path.resolve('src'), '')}`);
        }

        // Check for extremely long lines
        const lines = content.split('\n');
        lines.forEach((line, i) => {
            if (line.length > 5000) {
                issues.push(`LONG LINE (${line.length} chars) at line ${i+1} in: ${file.replace(path.resolve('src'), '')}`);
            }
        });
    } catch (e) {
        issues.push(`READ ERROR for ${file}: ${e.message}`);
    }
});

console.log("Scan complete.");
if (issues.length > 0) {
    console.log(issues.join('\n'));
} else {
    console.log("No issues found!");
}
