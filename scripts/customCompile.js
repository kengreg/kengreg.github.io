const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const cssDirectory = "./build/static/css";

fs.readdir(cssDirectory, (err, files) => {
  if (err) {
    console.error(`Error reading folder : ${err}`);
  } else {
    files.forEach((file) => {
      const filePath = path.join(cssDirectory, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`${filePath} : ${err}`);
        } else {
          console.log(`File deleted : ${filePath}`);
        }
      });
    });
  }
});
