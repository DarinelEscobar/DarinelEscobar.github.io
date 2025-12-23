const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
// We search in src. The find_by_name tool showed images in src/assets/images

const extensions = ['.jpg', '.jpeg', '.png'];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function processImages() {
  const files = getAllFiles(srcDir);
  const imageFiles = files.filter(file => extensions.includes(path.extname(file).toLowerCase()));

  console.log(`Found ${imageFiles.length} images to process.`);

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const newFile = file.replace(ext, '.webp');

    // Check if it's me.jpg
    if (file.endsWith('me.jpg') || file.endsWith('me.jpeg')) {
      console.log(`Resizing and converting: ${file}`);
      await sharp(file)
        .resize(200, 300)
        .webp({ quality: 80 })
        .toFile(newFile);
    } else {
      console.log(`Converting: ${file}`);
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(newFile);
    }
  }
}

processImages().catch(err => {
  console.error(err);
  process.exit(1);
});
