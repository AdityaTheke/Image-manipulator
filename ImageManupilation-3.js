//removeBlueAndGreen(image: Image): Image
function removeBlueAndGreen(image){
  let redImage= image.copy();
  for(let i=0; i<redImage.width; ++i){
    for(let j=0; j<redImage.height; ++j){
      let testPixel= redImage.getPixel(i,j);
      redImage.setPixel(i, j, [testPixel[0], 0.0, 0.0]);
    }
  }
  return redImage;
}
//makeGreyScale(image: Image): Image
function makeGrayscale(image){
  let greyImg= image.copy();
  for(let i=0; i<greyImg.width; ++i){
    for(let j=0; j<greyImg.height; ++j){
      let testPixel= greyImg.getPixel(i,j);
      let average= (testPixel[0]+testPixel[1]+testPixel[2])/3;
      greyImg.setPixel(i,j, [average, average, average]);
    }
  }
  return greyImg;
}
//imageMap(img: Image, func: (p: Pixel) => Pixel): Image
function imageMap( img, func){
  let newImg= img.copy();
  for(let i=0; i<newImg.width; ++i){
    for(let j=0; j<newImg.height; ++j){
      newImg.setPixel(i, j, func(newImg.getPixel(i, j)));
    }
  }
  return newImg;
}
//mapToRed(img: Image): Image
function mapToRed(img){
  return imageMap(img, removeBlueGreenPixel);
}
//mapToGrayscale( img: Image): Image
function mapToGrayscale(img){
  return imageMap(img, grayscale);
}

function removeBlueGreenPixel(pixel){
  let returnPixel= [pixel[0], 0.0, 0.0];
  return returnPixel;
}

function grayscale(pixel){
  let average= (pixel[0]+pixel[1]+pixel[2])/3;
  let returnPixel= [average, average, average];
  return returnPixel;
}

function pixelEq (p1, p2) { 
  const epsilon = 0.002;
  for (let i = 0; i < 3; ++i) {
    if (Math.abs(p1[i] - p2[i]) > epsilon) {
     return false;
    } 
  }
  return true;
};

test('removeBlueAndGreen function definition is correct', function() {
   const white = lib220.createImage(10, 10, [1,1,1]); 
   removeBlueAndGreen(white).getPixel(0,0);
// Need to use assert
});

test('No blue or green in removeBlueAndGreen result', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  const shouldBeRed = removeBlueAndGreen(white);
  const pixelValue = shouldBeRed.getPixel(5, 5);
  assert(pixelValue[0] === 1);
  assert(pixelValue[1] === 0);
  assert(pixelValue[2] === 0);
});

test('Check pixel equality', function() {
const inputPixel = [0.5, 0.5, 0.5]
// Create a test image, of size 10 pixels x 10 pixels, and set it to the inputPixel 
const image = lib220.createImage(10, 10, inputPixel);
// Process the image.
const outputImage = removeBlueAndGreen(image);
// Check the center pixel.
const centerPixel = outputImage.getPixel(5, 5); assert(pixelEq(centerPixel, [0.5, 0, 0]));
// Check the top-left corner pixel.
const cornerPixel = outputImage.getPixel(0, 0); assert(pixelEq(cornerPixel, [0.5, 0, 0]));
});
