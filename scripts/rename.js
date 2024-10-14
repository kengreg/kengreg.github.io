const fs = require("fs");
const path = require("path");

const sourceDirectory = path.join(__dirname, "..", "build", "static", "js");

const extensionsToRename = [".js", ".txt", ".map"];

extensionsToRename.forEach((ext) => {
  const randomFileName = fs
    .readdirSync(sourceDirectory)
    .find((file) => file.endsWith(ext));

  if (randomFileName) {
    const sourcePath = path.join(sourceDirectory, randomFileName);
    const destinationPath = path.join(sourceDirectory, `main${ext}`);

    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else {
    console.error(ext);
  }
});
