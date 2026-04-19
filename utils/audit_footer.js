const fs = require('fs');
const path = require('path');

const viewsDir = 'd:/Project/MLM project/views';
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.ejs'));

files.forEach(file => {
    const content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
    const hasMain = content.includes('<main');
    const hasClosingMain = content.includes('</main>');
    const hasFooter = content.includes('include("../utils/footer")') || content.includes("include('../utils/footer')");
    
    if (hasMain && !hasClosingMain && hasFooter) {
        console.log(`ISSUE: ${file} has <main> and footer but is MISSING </main>`);
    } else if (hasMain && hasClosingMain && hasFooter) {
        // Check if footer is inside or outside main
        const mainIndex = content.indexOf('<main');
        const closingMainIndex = content.indexOf('</main>');
        const footerIndex = content.indexOf('footer');
        
        if (footerIndex > mainIndex && footerIndex < closingMainIndex) {
            console.log(`WARNING: ${file} has footer INSIDE <main>`);
        }
    }
});
