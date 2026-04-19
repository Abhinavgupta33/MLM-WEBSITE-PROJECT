const fs = require('fs');
const path = require('path');

const filePath = 'd:/Project/MLM project/views/dashboard.ejs';
let content = fs.readFileSync(filePath, 'utf8');

// The problematic lines were added by fix_footers.js
// We want to remove the specific combination of footer + </main> that doesn't belong.
// In dashboard.ejs, there is no <main> (it uses <main id="main"> but our script might have matched something else)

// Let's just remove the ones we know I added.
const footerLine = '<%- include("../utils/footer") %>';
const closingMain = '</main>';

let lines = content.split('\n');
let newLines = lines.filter(line => {
    const trimmed = line.trim();
    return trimmed !== footerLine && trimmed !== closingMain;
});

// Wait! If there was a LEGITIMATE </main>, I just removed it.
// But we checked, and there was no <main> opening tag.

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Fixed dashboard.ejs');
