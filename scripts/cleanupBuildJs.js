const fs = require("fs").promises;
const path = require("path");

const buildDirectory = path.join(__dirname, "..", "build");
const jsDirectory = path.join(buildDirectory, "static", "js");

function deleteFilesWithChunkName(directory) {
  return fs
    .readdir(directory)
    .then((files) => {
      const deletePromises = files.map((file) => {
        const filePath = path.join(directory, file);

        if (
          (file.endsWith(".js") ||
            file.endsWith(".js.map") ||
            file.endsWith(".txt")) &&
          file !== "mainmerged.js"
        ) {
          return fs
            .unlink(filePath)
            .then(() => console.log(`Deleted ${file}`))
            .catch((error) =>
              console.error(`Error deleting ${file}: ${error.message}`)
            );
        }
        return Promise.resolve();
      });

      return Promise.all(deletePromises);
    })
    .catch((error) =>
      console.error(`Error reading directory: ${error.message}`)
    );
}

console.log("Deleting unnecessary JS files...");
deleteFilesWithChunkName(jsDirectory)
  .then(() => {
    // Rename mainmerged.js to main.js
    const mainMergedJsSourcePath = path.join(jsDirectory, "mainmerged.js");
    const mainJsDestinationPath = path.join(jsDirectory, "main.js");

    return fs
      .rename(mainMergedJsSourcePath, mainJsDestinationPath)
      .then(() =>
        console.log(`Renamed mainmerged.js to ${mainJsDestinationPath}`)
      )
      .catch((error) =>
        console.error(`Error renaming mainmerged.js: ${error.message}`)
      );
  })
  .catch((error) => console.error(`Error during cleanup: ${error.message}`));
