const fs = require("fs-extra");
const sharp = require("sharp");
const path = require("path");
const mediaDir = path.resolve(__dirname, "..", "build", "static", "media");
const scriptDirectory = __dirname;
const inputDirectory = path.join(scriptDirectory, "../build/static/media/img");
const outputDirectory = path.join(
  scriptDirectory,
  "../build/static/media/compressed"
);
const targetDirectory = path.join(scriptDirectory, "../build/static/media/img");
const configFile = path.join(
  __dirname,
  "..",
  "src",
  "config",
  "eventToDev.json"
);
const dictionaryOptions = {
  hint: 0,
  landingPage: 1,
  special: 2,
};

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

const supportedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  /* ".svg" Losing transparent when formating png...".png" */
  ,
];
let originalTotalSize = 0;
let compressedTotalSize = 0;

function compressImage(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    sharp(inputPath)
      .jpeg({ quality: 40 })
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error(`${inputPath}: ${err.message}`);
          reject(err);
        } else {
          const originalSize = fs.statSync(inputPath).size;
          const compressedSize = fs.statSync(outputPath).size;
          originalTotalSize += originalSize;
          compressedTotalSize += compressedSize;
          moveImage(
            outputPath,
            path.join(targetDirectory, path.basename(outputPath))
          );
          console.log(originalSize + "  TO  " + compressedSize);
          resolve();
        }
      });
  });
}

fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error(`Error folder reading ${inputDirectory}: ${err.message}`);
    return;
  }

  const compressionPromises = [];

  files.forEach((file) => {
    const filePath = path.join(inputDirectory, file);
    const fileExtension = path.extname(file).toLowerCase();
    if (supportedExtensions.includes(fileExtension)) {
      const outputFilePath = path.join(outputDirectory, file);
      compressionPromises.push(compressImage(filePath, outputFilePath));
    }
  });

  Promise.all(compressionPromises)
    .then(() => {
      console.log(`All images have been compressed`);
      const savedSize = originalTotalSize - compressedTotalSize;
      console.log(`We saved: ${savedSize} octets size`);
      fs.removeSync(outputDirectory);
    })
    .catch((error) => {
      console.error(`Error compressing images: ${error.message}`);
    });
});

function moveImage(sourcePath, targetPath) {
  fs.rename(sourcePath, targetPath, (err) => {
    if (err) {
      console.error(`Error ${sourcePath} > ${targetPath}: ${err.message}`);
    }
  });
}

if (
  dictionaryOptions[configFile[0].option] === 0 ||
  dictionaryOptions[configFile[0].option] === 2
) {
  const prepath =
    dictionaryOptions[configFile[0].option] === 0
      ? "../build/hint"
      : "../build/page";
  const hintDirectory = path.join(scriptDirectory, "../build/hint");

  if (!fs.existsSync(hintDirectory)) {
    fs.mkdirSync(hintDirectory);
  }

  fs.moveSync(
    outputDirectory,
    path.join(hintDirectory, "static/media/compressed"),
    { overwrite: true }
  );

  fs.moveSync(
    path.join(scriptDirectory, "../build/index.html"),
    path.join(hintDirectory, "index.html"),
    { overwrite: true }
  );

  const shareHtmlPath = path.join(hintDirectory, "share.html");
  if (fs.existsSync(shareHtmlPath)) {
    fs.removeSync(shareHtmlPath);
  }

  fs.removeSync(path.join(scriptDirectory, "../build/static"));
  fs.removeSync(path.join(scriptDirectory, "../build/share.html"));
}

function deleteImghintFolder() {
  try {
    if (fs.existsSync(outputDirectory)) {
      fs.removeSync(outputDirectory);
      console.log(`Success: ${outputDirectory} deleted`);
    } else {
      console.log(`Directory does not exist: ${outputDirectory}`);
    }
  } catch (err) {
    console.error(`Error deleting directory: ${err}`);
  }
}
deleteImghintFolder();
