const https = require('https');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Unimog_U400_production_%28assembly_line%29_Mercedes-Benz_W%C3%B6rth.jpg';
https.get(url, { headers: { 'User-Agent': 'TruckBodyBuilder/1.0 (contact@truckbodybuilder.com)' } }, res => {
  const file = fs.createWriteStream('scratch/unimog_assembly.jpg');
  res.pipe(file);
  file.on('finish', () => {
    console.log('Saved unimog assembly size:', fs.statSync('scratch/unimog_assembly.jpg').size);
  });
});
