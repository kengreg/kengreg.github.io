const fs = require("fs");
const path = require("path");
const eventDev = require(path.resolve(
  __dirname,
  "..",
  "src",
  "config",
  "eventToDev.json"
));
const dictionaryOptions = {
  hint: 0,
  landingPage: 1,
  special: 2,
};
const dictionaryContainer = ["hint", "index", "page"];
// const processHint = eventDev[0].option === "hint";
const processFile = dictionaryOptions[eventDev[0].option];

const cssFilesHint = [
  "build/static/css/tailwind.min.css",
  "build/static/css/hint.css",
];
const cssFiles = [
  "build/static/css/tailwind.min.css",
  "build/static/css/index.css",
];
const cssFilesSpecial = [
  "build/static/css/tailwind.min.css",
  "build/static/css/page.css",
];

if (
  (processFile === 0 && fs.existsSync(cssFilesHint[1])) ||
  (processFile === 1 && fs.existsSync(cssFiles[1])) ||
  (processFile === 2 && fs.existsSync(cssFilesSpecial[1]))
) {
  const mergedCSS =
    processFile === 0
      ? cssFilesHint.map((file) => fs.readFileSync(file, "utf8")).join("\n")
      : processFile === 2
      ? cssFilesSpecial.map((file) => fs.readFileSync(file, "utf8")).join("\n")
      : cssFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
  fs.writeFileSync("build/static/css/main.css", mergedCSS);
  try {
    fs.unlinkSync("build/static/css/tailwind.css");
    fs.unlinkSync("build/static/css/tailwind.min.css");
    // fs.unlinkSync(
    //   `build/static/css/${eventDev[0].option === "hint" ? "hint" : "index"}.css`
    // );
    fs.unlinkSync(
      `build/static/css/${
        dictionaryContainer[dictionaryOptions[eventDev[0].option]]
      }.css`
    );
    console.log("Delete File successfully.");
  } catch (error) {
    console.log(error);
  }
}

console.log("Fusion completed");
