const fs = require("fs");
const path = require("path");

const directoryPath = "build/static/js";
const cssChunkPattern = /"static\/css\/.*?\.chunk\.css"/g;

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("error reading :", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Can not read file :", err);
        return;
      }

      const cleanedData = data.replace(cssChunkPattern, "");

      fs.writeFile(filePath, cleanedData, "utf8", (err) => {
        if (err) {
          console.error("Error writting :", err);
          return;
        }
        console.log(`Done : ${filePath}`);
      });
    });
  });
});
