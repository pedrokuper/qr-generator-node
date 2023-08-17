import QRCode from "qrcode-svg";
const url = "";

const qrcode = new QRCode({
  content: url,
  padding: 4,
  width: 1000,
  height: 1000,
  color: "#000000",
  background: "#ffffff",
  ecl: "M"
});
qrcode.save("sample.svg", function (error) {
  if (error) throw error;
  console.log("Done!");
});
