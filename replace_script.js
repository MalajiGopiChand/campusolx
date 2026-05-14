const fs = require('fs');
const path = require('path');

const directories = ['src', 'public'];
const fileExtensions = ['.js', '.jsx', '.html'];

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            if (fileExtensions.some(ext => filePath.endsWith(ext))) {
                callback(filePath);
            }
        } else if (stat.isDirectory() && name !== 'olx-main') {
            walkSync(filePath, callback);
        }
    });
}

const replacements = [
    { pattern: />OLX</g, replacement: ">Campus OLX<" },
    { pattern: />Olx</g, replacement: ">Campus Olx<" },
    { pattern: />olx</g, replacement: ">campus olx<" },
    { pattern: /alt="OLX"/g, replacement: 'alt="Campus OLX"' },
    { pattern: /alt="OLX Banner"/g, replacement: 'alt="Campus OLX Banner"' },
    { pattern: /About OLX Group/g, replacement: "About Campus OLX Group" },
    { pattern: /OLX People/g, replacement: "Campus OLX People" },
    { pattern: /OLXPeople/g, replacement: "Campus OLX People" },
    { pattern: /My OLX/g, replacement: "My Campus OLX" },
    { pattern: /Careers at OLX/g, replacement: "Careers at Campus OLX" },
    { pattern: /Why Join OLX/g, replacement: "Why Join Campus OLX" },
    { pattern: /ad on OLX/g, replacement: "ad on Campus OLX" },
    { pattern: /\${safeName} - OLX/g, replacement: "${safeName} - Campus OLX" },
    { pattern: /OLX\./g, replacement: "Campus OLX." },
    { pattern: /OLX Group/g, replacement: "Campus OLX Group" },
    { pattern: /OLX India/g, replacement: "Campus OLX India" },
    { pattern: /OLX app/g, replacement: "Campus OLX app" },
    { pattern: />OLX</g, replacement: ">Campus OLX<" },
    { pattern: /© 2006-2021 OLX/g, replacement: "© 2006-2021 Campus OLX" },
    { pattern: /Create React App OLX/g, replacement: "Create React App Campus OLX" },
    { pattern: /My OLX \/ Dashboard/g, replacement: "My Campus OLX / Dashboard" },
    { pattern: /pages on OLX/g, replacement: "pages on Campus OLX" },
    { pattern: /Policy for OLX/g, replacement: "Policy for Campus OLX" },
    { pattern: /using OLX/g, replacement: "using Campus OLX" },
    { pattern: /OLX provides/g, replacement: "Campus OLX provides" },
    { pattern: /OLX may/g, replacement: "Campus OLX may" },
    { pattern: /OLX is a/g, replacement: "Campus OLX is a" },
    { pattern: /The OLX name/g, replacement: "The Campus OLX name" },
    { pattern: /growing OLX/g, replacement: "growing Campus OLX" },
    { pattern: /behind OLX/g, replacement: "behind Campus OLX" }
];

directories.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) return;
    
    walkSync(dirPath, (filePath) => {
        let content = fs.readFileSync(filePath, 'utf-8');
        let originalContent = content;
        
        replacements.forEach(({ pattern, replacement }) => {
            content = content.replace(pattern, replacement);
        });

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log('Updated:', filePath);
        }
    });
});
