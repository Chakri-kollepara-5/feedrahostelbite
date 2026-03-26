const fs = require('fs');
const path = require('path');
const dir = path.join('c:', 'FEEDRA-FULLSTACK', 'feedraanti', 'src');
const files = fs.readdirSync(dir);
let fixed = 0;
files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(dir, file);
    if (!fs.statSync(filePath).isFile()) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const newContent = content.replace(/(from\s+['"]|import\s+['"]|require\(['"])\.\.\//g, '$1./');
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Fixed:', file);
      fixed++;
    }
  }
});
console.log('Fixed ' + fixed + ' files.');
