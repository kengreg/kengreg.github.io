const readline = require("readline");
const eventList = require("../src/config/eventList.json");
const fs = require("fs");
const path = require("path");
const keypress = require("keypress");
const packageFile = "package.json";
const configFile = path.join(
  __dirname,
  "..",
  "src",
  "config",
  "eventToDev.json"
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const redColor = "\x1b[31m";
const resetStyle = "\x1b[0m";
const BGblue = "\x1b[44m";
const BGgreen = "\x1b[42m";

let selectedIndex = 0;
let selectedEvent;
let selectedOption;

let phase = 0;
const dictionaryOptions = {
  hint: 0,
  landingPage: 1,
  special: 2,
};
const dictionaryAssetsFolder = ["imghint", "img", "page"];
const dictionaryUrlNames = ["/hint", "", "/page"];
const dictionaryContainer = ["Hint", "Home", "Page"];

function displayEventOptions() {
  console.clear();
  console.log(
    `${BGgreen}***  Please select which event you would like to edit ***${resetStyle}\n`
  );
  for (let i = 0; i < Object.values(eventList).length; i++) {
    const option = Object.values(eventList)[i];
    const hintText = option.hint ? ", hint" : "";
    const shareText = option.share ? ", share" : "";
    const specialText = option.special ? ", special" : "";
    if (i === selectedIndex) {
      console.log(
        `${BGblue}[${i + 1}] ${option.name.toUpperCase()} (${
          option.label
        }) - (LP${hintText}${shareText}${specialText})${resetStyle}`
      );
    } else {
      console.log(
        `[${i + 1}] ${option.name.toUpperCase()} (${
          option.label
        }) - (LP${hintText}${shareText}${specialText})`
      );
    }
  }
}

function selectEvent() {
  displayEventOptions();

  keypress(process.stdin);

  process.stdin.on("keypress", (ch, key) => {
    if (key && key.name === "up" && phase === 0) {
      if (selectedIndex > 0) {
        selectedIndex--;
        displayEventOptions();
      }
    } else if (key && key.name === "down" && phase === 0) {
      if (selectedIndex < Object.values(eventList).length - 1) {
        selectedIndex++;
        displayEventOptions();
      }
    } else if (key && key.name === "return") {
      if (phase === 0) {
        selectedEvent = Object.values(eventList)[selectedIndex];
        process.stdin.pause();
        phase = 1;
        selectedIndex = 0;
        handleEventSelection();
      } else if (phase === 1) {
        // handlePropertySelection();
      }
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
}

function handleEventSelection() {
  console.clear();
  console.log(
    `${BGgreen}***  ${selectedEvent.name} - Please select a property to edit ***${resetStyle}\n`
  );
  const propertyKeys = Object.keys(selectedEvent);

  let index = 3;

  for (let i = 2; i < propertyKeys.length; i++) {
    const key = propertyKeys[i];
    const propertyValue = selectedEvent[key];

    if (propertyValue !== false) {
      if (index - 3 === selectedIndex) {
        console.log(`${BGblue}[${index - 2}] ${key}${resetStyle}`);
        selectedOption = key;
      } else {
        console.log(`[${index - 2}] ${key}`);
      }
      index++;
    }
  }

  process.stdin.removeAllListeners("keypress");
  process.stdin.on("keypress", (ch, key) => {
    if (key && key.name === "up" && phase === 1) {
      if (selectedIndex > 0) {
        selectedIndex--;
        handleEventSelection();
      }
    } else if (key && key.name === "down" && phase === 1) {
      if (selectedIndex < index) {
        selectedIndex++;
        handleEventSelection();
      }
    } else if (key && key.name === "return" && phase === 1) {
      process.stdin.pause();
      writeChoice();
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
}

function writeChoice() {
  const data = [
    {
      event: selectedEvent.name,
      option: selectedOption,
      urlName: selectedEvent.urlName,
    },
  ];

  fs.writeFileSync(
    "./src/config/eventToDev.json",
    JSON.stringify(data, null, 4)
  );
  const appJsPath = path.join(__dirname, "..", "src", "App.js");
  const fileContainerName = `${selectedEvent.name
    .charAt(0)
    .toUpperCase()}${selectedEvent.name.slice(1)}.js`;
  const containerJsPath = path.join(
    __dirname,
    "..",
    "src",
    "containers",
    fileContainerName
  );
  fs.readFile(appJsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const updatedData = data.replace(
      /from "([^/]+)\/([^"]+)";/,
      (match, path) => {
        const updatedPath = `./containers/${selectedEvent.name
          .charAt(0)
          .toUpperCase()}${selectedEvent.name.slice(1)}`;
        return `from "${updatedPath}";`;
      }
    );

    fs.writeFile(appJsPath, updatedData, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
  //adding the function to load images which is used by the npm start only
  const assetsContextPath = path.join(
    __dirname,
    "..",
    "src",
    "components",
    "General",
    "AssetsContext.js"
  );
  fs.readFile(assetsContextPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const selectedEventPattern =
      /const imgPath = "assets\/images\/events\/[^/]+\/(img|imghint|page)";/;
    const assetsImagesPath = `assets/images/events/${selectedEvent.name}/${
      dictionaryAssetsFolder[dictionaryOptions[selectedOption]]
    }`;
    let updatedData = data;
    updatedData = data.replace(
      selectedEventPattern,
      `const imgPath = "${assetsImagesPath}";`
    );
    updatedData = updatedData.replace("/* replace_import", "// replace_import");
    updatedData = updatedData.replace(
      "/* replace_useEffect",
      "// replace_useEffect"
    );
    updatedData = updatedData.replace(
      /(?<!\/\/)replace_end\s*\*\//g,
      "//replace_end */"
    );
    // Write the updated content back to the file
    fs.writeFile(assetsContextPath, updatedData, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });

  //change the path of the container according to the required content
  fs.readFile(containerJsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const updatedData = data.replace(
      /import Contents from "([^/]+)\/([^"]+)";/,
      (match, p1, p2) => {
        const updatedPath = `./${selectedEvent.name}/${
          dictionaryContainer[dictionaryOptions[selectedOption]]
        }`;
        return `import Contents from "${updatedPath}";`;
      }
    );

    fs.writeFile(containerJsPath, updatedData, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });

  fs.readFile(configFile, "utf8", (err, data) => {
    if (err) {
      console.error(`error ${configFile}: ${err}`);
      process.exit(1);
    }

    try {
      const config = JSON.parse(data);
      let suffixeHomePage =
        dictionaryUrlNames[dictionaryOptions[selectedOption]];

      if (Array.isArray(config) && config.length > 0 && config[0].event) {
        const homepage = `lp/${config[0].urlName}${suffixeHomePage}`;
        fs.readFile(packageFile, "utf8", (err, packageData) => {
          if (err) {
            console.error(`error ${packageFile}: ${err}`);
            process.exit(1);
          }

          try {
            const packageJson = JSON.parse(packageData);
            packageJson.homepage = homepage;
            fs.writeFile(
              packageFile,
              JSON.stringify(packageJson, null, 2),
              "utf8",
              (err) => {
                if (err) {
                  console.error(`error ${packageFile}: ${err}`);
                  process.exit(1);
                }
              }
            );
          } catch (e) {
            console.error(`error ${packageFile}: ${e}`);
            process.exit(1);
          }
        });
      } else {
        console.error(`error`);
        process.exit(1);
      }
    } catch (e) {
      console.error(`Error ${configFile}: ${e}`);
      process.exit(1);
    }
  });
  console.log(`
  ${BGgreen}***  ${selectedEvent.name}...editing ${selectedOption}  ***${resetStyle}\n
  `);
  rl.close();
}

function main() {
  selectEvent();
}

main();
