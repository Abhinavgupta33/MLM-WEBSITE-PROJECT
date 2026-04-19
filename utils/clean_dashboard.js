const fs = require('fs');
const filePath = 'd:/Project/MLM project/views/dashboard.ejs';
let content = fs.readFileSync(filePath, 'utf8');

// Identify the vendor scripts block and custom JS block
const vendorStart = '<!-- Vendor JS Files -->';
const mainJs = '<script src="assets/js/main.js"></script>';

let lines = content.split('\n');
let newLines = [];
let skipping = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(vendorStart)) {
        skipping = true;
        // Keep the vendor start comment but skip the rest until main.js
        newLines.push(line);
        continue;
    }
    if (skipping && line.includes(mainJs)) {
        skipping = false;
        newLines.push(line);
        continue;
    }
    if (!skipping) {
        // Also skip the Custom Dashboard JS block
        if (line.includes('<!-- Custom Dashboard JS -->')) {
            break; // Stop completely or just skip this block?
            // "Restore back" usually means remove the new stuff.
        }
        newLines.push(line);
    }
}

// Ensure the file ends properly
newLines.push('</body>');
newLines.push('</html>');

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Cleaned up vendor scripts in dashboard.ejs');
