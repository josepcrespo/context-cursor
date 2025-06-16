const fs = require('fs');
const path = require('path');

const outFile = path.join(__dirname, 'dist', 'index.d.ts');
const content = `export { default } from './contextCursor/index';
export * from './contextCursor/index';
`;

fs.writeFileSync(outFile, content);
console.log('dist/index.d.ts generado correctamente.');
