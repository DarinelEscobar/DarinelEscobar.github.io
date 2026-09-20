const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "public", "og-image.webp");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f8fafc"/>
  <rect x="40" y="40" width="1120" height="550" rx="36" fill="#ffffff" stroke="#d8dee8" stroke-width="2"/>
  <rect x="72" y="72" width="1056" height="486" rx="28" fill="#0f172a"/>
  <path d="M92 556L1128 132" stroke="#2563eb" stroke-width="3" opacity="0.32"/>
  <path d="M92 476L1128 100" stroke="#ffffff" stroke-width="1" opacity="0.12"/>
  <circle cx="1012" cy="164" r="74" fill="#2563eb" opacity="0.95"/>
  <circle cx="1012" cy="164" r="112" fill="#2563eb" opacity="0.13"/>
  <text x="112" y="164" fill="#93a4bd" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700">FULL-STACK SOFTWARE ENGINEER</text>
  <text x="112" y="294" fill="#f8fafc" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="800">Darinel Escobar</text>
  <text x="112" y="382" fill="#cbd5e1" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="500">React | Laravel | Cloud | Performance</text>
  <rect x="112" y="448" width="314" height="60" rx="30" fill="#2563eb"/>
  <text x="145" y="488" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">Selected Work</text>
  <text x="112" y="546" fill="#93a4bd" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600">darinelescobar.github.io</text>
</svg>`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

sharp(Buffer.from(svg))
  .webp({ quality: 88 })
  .toFile(outputPath)
  .then(() => {
    console.log(`Generated ${outputPath}`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
