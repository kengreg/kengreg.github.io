const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const cssDirectory = "../build/static/css";

fs.readdir(cssDirectory, (err, files) => {
  if (err) {
    console.error(`error reading folder : ${err}`);
  } else {
    files.forEach((file) => {
      const filePath = path.join(cssDirectory, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`error deleting file ${filePath} : ${err}`);
        } else {
          console.log(`Files deleted : ${filePath}`);
        }
      });
    });
  }
});

const sassCommand = `node-sass ../src/components/regentofreiko/index.scss -o  ../build/static/cssindex.css --output-style compressed`;
exec(sassCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`error using node sass : ${error}`);
  } else {
    console.log("Success");
  }
});
