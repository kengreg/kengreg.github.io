const fs = require("fs");
const path = require("path");

const directory = path.join(__dirname, "..", "build", "static", "css");
const regexBackground = /url\(["']?\/lp\/([^"')]*)["']?\)/g;
const configFile = path.join(
  __dirname,
  "..",
  "src",
  "config",
  "eventToDev.json"
);

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error("Error reading the directory:", err);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith(".css")) {
      const filePath = path.join(directory, file);

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the file:", err);
          return;
        }
        const newContent = data.replace(regexBackground, (match, fileName) => {
          if (/\.[a-f0-9]+\./i.test(fileName)) {
            const newFileName = fileName.replace(/\.[a-f0-9]+\./i, ".");
            const finalName = newFileName.replace("/media", "/media/img");
            console.log(finalName);
            return `url("/lp/${finalName}")`;
          }
          return match;
        });
        fs.writeFile(filePath, newContent, "utf8", (err) => {
          if (err) {
            console.error(`Error writing the file ${filePath}:`, err);
          } else {
            console.log(`File ${file} has been updated.`);
          }
        });
      });
    }
  });
});
