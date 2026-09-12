const fs = require('fs');
const path = require('path');

function findFiles(dir) {
    let results = [];
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

const basePath = path.resolve('src');
const files = findFiles(basePath);

let count = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Replace non-ASCII characters with empty string
    // This safely removes emojis, em-dashes, and curly quotes
    // without corrupting ASCII quotes that define string literals
    const cleaned = content.replace(/[^\x00-\x7F]/g, '');
    
    // Fix the AdminEditors import path which is wrong in the clean commit
    const finalContent = cleaned
        .replace(/from '\.\.\/\.\.\/components\/AdminEditors'/g, "from '@/app/admin/ai/components/AdminEditors'")
        .replace(/from "\.\.\/\.\.\/components\/AdminEditors"/g, 'from "@/app/admin/ai/components/AdminEditors"');

    if (content !== finalContent) {
        fs.writeFileSync(file, finalContent, 'utf8');
        console.log(`Cleaned: ${file}`);
        count++;
    }
});

console.log(`\nDone! Cleaned ${count} files.`);
