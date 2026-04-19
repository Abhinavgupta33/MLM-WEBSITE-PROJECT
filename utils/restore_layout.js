const fs = require('fs');
const filePath = 'd:/Project/MLM project/views/dashboard.ejs';
let content = fs.readFileSync(filePath, 'utf8');

const layoutStart = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>Dashboard - ChainCore</title>
`;

// Move the header include into the head
let newContent = content.replace('<%- include("../utils/header") %>', layoutStart + '    <%- include("../utils/header") %>\n</head>\n<body class="bg-light">');

fs.writeFileSync(filePath, newContent);
console.log('Restored layout tags in dashboard.ejs');
