const fs = require('fs');
const src = fs.readFileSync('C:\\Users\\USHARANI\\Desktop\\flowtaris-ecosystem\\apps\\flowtaris-ai\\src\\app\\capabilities\\[slug]\\page.tsx', 'utf8');
const startIdx = src.indexOf('const CAPABILITY_CONTENT');
const endIdx = src.indexOf('const RELATED_PAGES =');
if (startIdx !== -1 && endIdx !== -1) {
  let content = src.substring(startIdx, endIdx);
  // Also need to get any imports if necessary, but it's just raw data
  // Write to defaultData.ts
  fs.writeFileSync('C:\\Users\\USHARANI\\Desktop\\Flowtaris-main.com\\src\\app\\admin\\ai\\capabilities-config\\[slug]\\defaultData.ts', 'export ' + content);
  console.log('Successfully extracted CAPABILITY_CONTENT');
} else {
  console.log('Failed to find indices', startIdx, endIdx);
}
