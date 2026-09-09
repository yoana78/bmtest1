import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expoDir = path.join(__dirname, '../../public/assets/expo');
const files = fs.readdirSync(expoDir).filter(f => f.endsWith('.jpg')).sort();

// Keep top 8 photos
const keepFiles = files.slice(0, 8);
files.forEach(f => {
  if (!keepFiles.includes(f)) {
    fs.unlinkSync(path.join(expoDir, f));
  }
});

const remaining = fs.readdirSync(expoDir).filter(f => f.endsWith('.jpg')).sort();
console.log('Remaining files in public/assets/expo:', remaining);

const items = remaining.map((f, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `  {
    id: 'expo-2025-${num}',
    titleKo: '2025 태국 국제 펫 박람회 현장 #${i + 1}',
    titleEn: '2025 Thailand International Pet Expo #${i + 1}',
    category: 'Exhibition',
    year: '2025',
    locationKo: '방콕, 태국',
    locationEn: 'Bangkok, Thailand',
    image: '/assets/expo/${f}'
  }`;
});

const expoJsContent = `export const expoPhotos = [\n${items.join(',\n')}\n];\n`;
fs.writeFileSync(path.join(__dirname, '../data/expo.js'), expoJsContent, 'utf8');
console.log('Updated src/data/expo.js successfully!');
