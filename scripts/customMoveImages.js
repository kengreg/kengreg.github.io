const fs = require("fs");
const path = require("path");

const eventDev = require(path.resolve(
  __dirname,
  "..",
  "src",
  "config",
  "eventToDev.json"
));

const dictionaryOptions = {
  hint: 0,
  landingPage: 1,
  special: 2,
};

const imagesDir =
  dictionaryOptions[eventDev[0].option] === 0
    ? "imghint"
    : dictionaryOptions[eventDev[0].option] === 0
    ? "page"
    : "img";
const imagesDirPath = path.join(
  __dirname,
  "..",
  "build",
  "static",
  "media",
  imagesDir
);
const staticMediaPath = path.join(__dirname, "..", "build", "static", "media");

// Check if the source directory exists
console.log("existence of folder: " + imagesDirPath);
if (fs.existsSync(imagesDirPath)) {
  // Move images from the specified directory
  fs.readdirSync(imagesDirPath).forEach((file) => {
    const sourcePath = path.join(imagesDirPath, file);
    const destinationPath = path.join(staticMediaPath, file);
    fs.renameSync(sourcePath, destinationPath);
  });

  console.log(`Images moved from ${imagesDir} to static/media`);

  // Delete the source directory img or imghint
  fs.rmSync(imagesDirPath, { recursive: true, force: true });
} else {
  console.log("Directory doesnt not exist. No images moved");
}
