const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { spawn } = require("child_process");
const eventDev = require(path.resolve(
  __dirname,
  "..",
  "src",
  "config",
  "eventToDev.json"
));
const eventNameBuild = eventDev[0].event;

console.clear();

function filterCSSFile(filePath) {
  const cssContent = fs.readFileSync(filePath, "utf8");
  const lines = cssContent.split("\n");
  const filteredLines = lines.filter((line) => {
    return line.includes(eventNameBuild);
  });
  const filteredCSSContent = filteredLines.join("\n");
  fs.writeFileSync(filePath, filteredCSSContent, "utf8");
  console.log(`Filtered ${filePath}`);
}

function deleteFilesWithChunkName(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      deleteFilesWithChunkName(filePath);
    } else if (file.includes("chunk") && file.endsWith(".css")) {
      filterCSSFile(filePath);
    } else if (
      file === "200.html" ||
      file === "asset-manifest.json" ||
      file === "robots.txt" ||
      file === "favicon.ico" ||
      (eventDev[0].option === "hint" && file === "share.html") ||
      file.includes("src_components") ||
      file.includes("src_containers") ||
      file.includes("vendors")
    ) {
      fs.unlinkSync(filePath);
      console.log(`Deleted ${file}`);
    }
  });
}

const buildDirectory = path.join(__dirname, "..", "build");
console.log("Deleting CSS files without 'other'...");
deleteFilesWithChunkName(buildDirectory);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.close();
