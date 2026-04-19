const fs = require('fs');
const filePath = 'd:/Project/MLM project/utils/header.ejs';
let content = fs.readFileSync(filePath, 'utf8');

// Strip everything before the first <header or <nav or the first style/script that is component-specific
// Actually, I'll just remove the known layout tags.

let newContent = content.replace(/<!DOCTYPE html>/gi, '');
newContent = newContent.replace(/<html[^>]*>/gi, '');
newContent = newContent.replace(/<\/html>/gi, '');
newContent = newContent.replace(/<head[^>]*>/gi, '');
newContent = newContent.replace(/<\/head>/gi, '');
newContent = newContent.replace(/<body[^>]*>/gi, '');
newContent = newContent.replace(/<\/body>/gi, '');

// The scripts and styles inside should remain as they are needed for the header component.

fs.writeFileSync(filePath, newContent);
console.log('Stripped layout tags from header.ejs');
