const fs = require("fs-extra");
const path = require("path");
const buildDir = path.resolve(__dirname, "..", "build", "static");
const mediaDir = path.resolve(__dirname, "..", "build", "static", "media");
const eventDev = require(path.resolve(
  __dirname,
  "..",
  "src",
  "config",
  "eventToDev.json"
));
const assetsDir = path.resolve(
  __dirname,
  "..",
  "src",
  `assets/images/events/${eventDev[0].event}`
);

const directoryToDelete = path.join(
  __dirname,
  "..",
  "build",
  "static",
  "media"
);

const dictionaryOptions = {
  hint: 0,
  landingPage: 1,
  special: 2,
};

try {
  fs.removeSync(directoryToDelete);
  console.log(`Success ${directoryToDelete}`);
} catch (err) {
  console.error(`Error : ${err}`);
}

function copyImages(source, destination) {
  if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) {
    console.error(`'${source}' do not exist`);
    return;
  }

  fs.readdirSync(source).forEach((file) => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isFile()) {
      if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(file)) {
        fs.copyFileSync(sourcePath, destPath);
      }
    } else if (fs.statSync(sourcePath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
      copyImages(sourcePath, destPath);
    }
  });
}

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir);
}

function deleteDirectories() {
  const selectedOption = eventDev[0].option;

  let directoriesToDelete = [];
  switch (dictionaryOptions[selectedOption]) {
    case 0:
      directoriesToDelete = ["img", "page"];
      break;
    case 1:
      directoriesToDelete = ["imghint", "page"];
      break;
    case 2:
      directoriesToDelete = ["img", "imghint"];
      break;
    default:
      console.log("Invalid event option");
      return; // Exit function if event option is invalid
  }

  try {
    directoriesToDelete.forEach((directory) => {
      const directoryPath = path.join(mediaDir, directory);
      if (fs.existsSync(directoryPath)) {
        fs.removeSync(directoryPath);
        console.log(`Success: ${directoryPath} deleted`);
      } else {
        console.log(`Directory does not exist: ${directoryPath}`);
      }
    });
  } catch (err) {
    console.error(`Error deleting directories: ${err}`);
  }
}

copyImages(assetsDir, mediaDir);
deleteDirectories();
console.log("Images has been copied");
