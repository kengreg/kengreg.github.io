const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const mediaFolder = "build/static/media/img";
const indexPath = path.join(__dirname, "..", "build", "index.html");
const eventDev = require(path.resolve(
  __dirname,
  "..",
  "src",
  "config",
  "eventToDev.json"
));

const eventToBuild = eventDev[0].urlName;
const dictionaryOptions = {
  hint: 0,
  landingPage: 1,
  special: 2,
};

function renameFile(folder, fileName) {
  const fullPath = path.join(folder, fileName);

  if (
    /\.[a-f0-9]+\./i.test(fileName) &&
    /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(fileName)
  ) {
    const newFileName = fileName.replace(/\.[a-f0-9]+\./i, ".");
    const newFullPath = path.join(folder, newFileName);

    try {
      fs.renameSync(fullPath, newFullPath);
      console.log(`Rename: ${fileName} -> ${newFileName}`);
    } catch (err) {
      console.error(`${fileName}:`, err);
    }
  }
}

function updateHTML(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error ${filePath}:`, err);
      return;
    }

    const regexImages = new RegExp(
      `"\\/lp\\/${eventToBuild}\\/static\\/media\\/([^"]+)"`,
      "g"
    );

    const regexImagesHint = new RegExp(
      `"\\/lp\\/${eventToBuild}\\/hint\\/static\\/media\\/([^"]+)"`,
      "g"
    );
    const regexImagesPage = new RegExp(
      `"\\/lp\\/${eventToBuild}\\/page\\/static\\/media\\/([^"]+)"`,
      "g"
    );

    // Replace references to mainmerged.js with main.js
    const regexMainMerged = new RegExp(
      `"\\/lp\\/${eventToBuild}\\/static\\/js\\/mainmerged.js"`,
      "g"
    );
    const regexMainHintMerged = new RegExp(
      `"\\/lp\\/${eventToBuild}\\/hint\\/static\\/js\\/mainmerged.js"`,
      "g"
    );
    const regexMainPageMerged = new RegExp(
      `"\\/lp\\/${eventToBuild}\\/page\\/static\\/js\\/mainmerged.js"`,
      "g"
    );

    const coption = dictionaryOptions[eventDev[0].option];

    const regexToJStoChange =
      coption === 0
        ? regexMainHintMerged
        : coption === 2
        ? regexMainPageMerged
        : regexMainMerged;

    const currentChangeFolder =
      coption === 0
        ? `"/lp/${eventToBuild}/hint/static/js/main.js"`
        : coption === 2
        ? `"/lp/${eventToBuild}/page/static/js/main.js"`
        : `"/lp/${eventToBuild}/static/js/main.js"`;
    const regexToChangeChunkCSS =
      coption === 0
        ? /<link\s+href="\/lp\/[^\/]+\/hint\/static\/css\/\d+\..+\.chunk\.css"\s+rel="stylesheet"\s+type="text\/css"\s*\/?>/g
        : coption === 2
        ? /<link\s+href="\/lp\/[^\/]+\/page\/static\/css\/\d+\..+\.chunk\.css"\s+rel="stylesheet"\s+type="text\/css"\s*\/?>/g
        : /<link\s+href="\/lp\/[^\/]+\/static\/css\/\d+\..+\.chunk\.css"\s+rel="stylesheet"\s+type="text\/css"\s*\/?>/g;

    const newContent = data
      .replace(
        coption === 0
          ? regexImagesHint
          : coption === 2
          ? regexImagesPage
          : regexImages,
        (match, fileName) => {
          if (
            /\.[a-f0-9]+\./i.test(fileName) &&
            /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(fileName)
          ) {
            const newFileName = fileName.replace(/\.[a-f0-9]+\./i, ".");
            let imgFolder =
              coption === 0 ? "imghint" : coption === 2 ? "page" : "img";
            let currentFolder =
              coption === 0
                ? "hint/static"
                : coption === 2
                ? "page/static"
                : "static";
            return `"/lp/${eventToBuild}/${currentFolder}/media/${newFileName}"`;
          }
          return match;
        }
      )
      .replace(regexToJStoChange, currentChangeFolder)
      .replace(regexToChangeChunkCSS, "");

    fs.writeFile(filePath, newContent, "utf8", (err) => {
      if (err) {
        console.error(`Error ${filePath}:`, err);
      } else {
        console.log(`${filePath} Success`);
        callback();
      }
    });
  });
}

function updateLink(filePath) {
  fs.readFile(indexPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const coption = dictionaryOptions[eventDev[0].option];
    const pattern = new RegExp(
      `<link href="/lp/${eventToBuild}/${
        coption === 0 ? "hint/" : coption === 2 ? "page/" : ""
      }static/css/main\\..+?\\.css" rel="stylesheet">`
    );
    data = data.replace(
      pattern,
      `<link href="/lp/${eventToBuild}/${
        coption === 0 ? "hint/" : coption === 2 ? "page/" : ""
      }static/css/main.css" rel="stylesheet">
      <script src="/lp/${eventToBuild}/${
        coption === 0 ? "hint/" : coption === 2 ? "page/" : ""
      }static/js/main.js" defer></script>
      `
    );
    const $ = cheerio.load(data);
    $('[style*="--"]').each((index, element) => {
      let backgroundStyle = $(element).attr("style");
      backgroundStyle = backgroundStyle.replace(/\.\w+\\/g, "");
      $(element).attr("style", backgroundStyle);
    });

    fs.writeFile(indexPath, $.html(), "utf8", (err) => {
      if (err) {
        console.error(`Error : ${err}`);
        return;
      }
      console.log("done");
    });
  });
}
if (fs.existsSync(mediaFolder)) {
  fs.readdir(mediaFolder, (err, files) => {
    if (err) {
      console.error("Error: ", err);
      return;
    }
    files.forEach((fileName) => {
      renameFile(mediaFolder, fileName);
    });
  });
} else {
  console.error(`Directory ${mediaFolder} does not exist.`);
}

updateHTML(indexPath, () => {
  updateLink(indexPath);
});
