import fs from "fs";
import path from "path";
import qrcode from "qrcode";
import { createCanvas, loadImage } from "canvas";

const SIZE = 200;
const LOGO_SIZE = 75;

const generateQRcodeImage = async (options) => {
  url, logoPath, outputPath;
  try {
    const qrCodeOptions = {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 1,
      margin: 1,
      width: SIZE
    };

    const qrCodeImage = await qrcode.toDataURL(options.url, qrCodeOptions);

    const canvas = createCanvas(SIZE, SIZE);
    const context = canvas.getContext("2d");

    const qrCodeImg = await loadImage(qrCodeImage);
    context.drawImage(qrCodeImg, 0, 0, SIZE, SIZE);

    if (options?.logoPath) {
      const logoImg = await loadImage(options?.logoPath);
      const logoX = (SIZE - LOGO_SIZE) / 2;
      const logoY = (SIZE - LOGO_SIZE) / 2;
      context.drawImage(logoImg, logoX, logoY, LOGO_SIZE, LOGO_SIZE);
    }

    const outputImageBuffer = canvas.toBuffer();
    fs.writeFileSync(outputPath, outputImageBuffer);

    console.log("QR code image with logo generated successfully:", outputPath);
  } catch (e) {
    console.error(e);
  }
};

// Usage example
const url = "";
const logoPath = path.join(__dirname, ".png");
const outputPath = path.join(__dirname, "output", ".png");
console.time("Iniciando");
generateQRcodeImage(url, logoPath, outputPath);
console.timeEnd("Iniciando");
