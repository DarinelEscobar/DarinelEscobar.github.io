const sharp = require('sharp');
const path = require('path');

const srcImage = path.join(__dirname, '../src/assets/images/COEPES-Public/fav.webp');
const destImage = path.join(__dirname, '../src/assets/images/COEPES-Public/fav-400.webp');

console.log(`Resizing ${srcImage} to ${destImage}`);

sharp(srcImage)
  .resize(400, 300)
  .webp({ quality: 80 })
  .toFile(destImage)
  .then(info => { console.log('Success', info); })
  .catch(err => { console.error('Error', err); });
