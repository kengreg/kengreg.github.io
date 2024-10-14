const sass = require("node-sass");
const path = require("path");
const fs = require("fs");

const configFile = path.join(
  __dirname,
  "..",
  "src",
  "config",
  "eventToDev.json"
);

fs.readFile(configFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error :", err);
    return;
  }

  const config = JSON.parse(data);
  const event = config[0].event;

  const inputFile = `./src/components/${
    event.charAt(0).toUpperCase() + event.slice(1)
  }/${configFile[0].option === "hint" ? "/hint/hint.scss" : "index.scss"}`;

  const outputFile = "./build/static/css/index.css";

  sass.render(
    {
      file: path.resolve(inputFile),
      outputStyle: "compressed",
    },
    (err, result) => {
      if (err) {
        console.error("Error compilation SCSS :", err);
      } else {
        fs.writeFileSync(outputFile, result.css);
        console.log("Compike css done !");
      }
    }
  );
});
