const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "..", "build", "static", "js");
const mainFilePath = path.join(outputPath, "mainmerged.js");

// Read contents of all chunk files
const chunkContents = fs
  .readdirSync(outputPath)
  .filter((file) => file.includes("chunk"))
  .map((file) => fs.readFileSync(path.join(outputPath, file), "utf8"));

// Read content of main.js
const mainContent = fs.readFileSync(mainFilePath, "utf8");

// Concatenate main.js and chunks
const concatenatedContent = mainContent + "\n" + chunkContents.join("\n");

// Write back to main.js
fs.writeFileSync(mainFilePath, concatenatedContent, "utf8");
