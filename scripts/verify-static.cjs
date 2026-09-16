const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const requiredFiles = [
  "public/favicon.svg",
  "public/og-image.webp",
  "public/sitemap.xml",
  "public/site.webmanifest",
];
const requiredIndexSnippets = [
  'rel="canonical"',
  'property="og:title"',
  'property="og:image"',
  'name="twitter:card"',
  "/favicon.svg",
  "/site.webmanifest",
];

const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(rootDir, relativePath))) {
    failures.push(`Missing ${relativePath}`);
  }
}

const indexHtml = read("index.html");

if (indexHtml.includes("vite.svg")) {
  failures.push("index.html still references vite.svg");
}

for (const snippet of requiredIndexSnippets) {
  if (!indexHtml.includes(snippet)) {
    failures.push(`index.html missing ${snippet}`);
  }
}

const robotsTxt = read("public/robots.txt");

if (!robotsTxt.includes("https://darinelescobar.github.io/sitemap.xml")) {
  failures.push("robots.txt does not reference the production sitemap");
}

const assetImages = read("src/lib/assetImages.ts");

if (assetImages.includes("eager: true")) {
  failures.push("assetImages.ts still uses eager image loading");
}

const dashAuditFiles = [
  "index.html",
  "src/content/portfolio/ui.ts",
  "src/content/portfolio/projects.ts",
  "src/content/portfolio/experience.ts",
  "src/components/DetailsProjects/MediaGallery.tsx",
  "src/components/DetailsProjects/DetailsProjects.tsx",
];

for (const relativePath of dashAuditFiles) {
  const content = read(relativePath);

  if (/[—–]/u.test(content) || content.includes("â€”") || content.includes("â€“")) {
    failures.push(`${relativePath} contains a forbidden dash character`);
  }
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Static portfolio checks passed.");
