const sharp = require('sharp');
(async () => {
  const { data, info } = await sharp('public/images/card1_reference.png').raw().toBuffer({ resolveWithObject: true });
  console.log('Card1 info:', info);
  const getPixel = (x, y) => {
    const i = (y * info.width + x) * 4;
    return [data[i], data[i+1], data[i+2], data[i+3]];
  };
  console.log('x=0, y=100:', getPixel(0, 100));
  console.log('x=299, y=100:', getPixel(299, 100));
  console.log('x=150, y=0:', getPixel(150, 0));
  console.log('x=150, y=212:', getPixel(150, 212));
  console.log('x=10, y=100 (bg):', getPixel(10, 100));
})();
