const Jimp = require('jimp');

async function processImage(inputImage, outputImage) {
    const image = await Jimp.read(inputImage);

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];

        if (red > 200 || green > 200 || blue > 200) {
            this.bitmap.data[idx + 0] = 255; // R
            this.bitmap.data[idx + 1] = 255; // G
            this.bitmap.data[idx + 2] = 255; // B
        }
    });

    await image.writeAsync(outputImage);
}

// Call the function with the path of the input image and the path of the output image
processImage('./input.jpg', 'output.jpg');