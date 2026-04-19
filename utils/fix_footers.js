const fs = require('fs');
const path = require('path');

const viewsDir = 'd:/Project/MLM project/views';
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.ejs'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
    
    // Check if it has main and footer
    const hasMain = content.includes('<main');
    const hasFooter = content.includes('include("../utils/footer")') || 
                      content.includes("include('../utils/footer')") ||
                      content.includes('include("../utils/footer");') ||
                      content.includes("include('../utils/footer');");
    
    if (hasMain && hasFooter) {
        console.log(`Processing ${file}...`);
        
        // 1. Remove all existing footer inclusions
        const footerRegex = /<%-?\s*include\(["']\.\.\/utils\/footer["']\);?\s*%>/g;
        content = content.replace(footerRegex, '');
        
        // 2. Insert inside </main>
        const closingMain = '</main>';
        if (content.includes(closingMain)) {
            // Find the last </main> just in case
            const lastIndex = content.lastIndexOf(closingMain);
            content = content.slice(0, lastIndex) + '\n<%- include("../utils/footer") %>\n' + content.slice(lastIndex);
            
            fs.writeFileSync(path.join(viewsDir, file), content);
            console.log(`  Fixed ${file}`);
        } else {
            console.log(`  ERROR: ${file} has footer but missing closing </main> despite having <main`);
        }
    }
});
