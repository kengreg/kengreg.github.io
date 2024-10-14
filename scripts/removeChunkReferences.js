const fs = require("fs");
const path = require("path");

const mainMergedPath = path.join(
  __dirname,
  "..",
  "build",
  "static",
  "js",
  "mainmerged.js"
);

// Read content of main.js
let mainContent = fs.readFileSync(mainMergedPath, "utf8");

// Remove chunk references
mainContent = mainContent.replace(
  /\(Object\.keys\(n\.f\)\.reduce\(\((t,r)=>\(n\.f\[r\]\(e,t\),t\)\),\[\]\)\),n\.u=e\s*=>\s*"static\/js\/"\s*\+\s*\.\s*\+\s*\{[^}]+}/g,
  ""
);

// Write back to main.js
fs.writeFileSync(mainMergedPath, mainContent, "utf8");

// Read contents of mainmerged.js
let mainMergedContent = fs.readFileSync(mainMergedPath, "utf8");

// Remove lines containing '.chunk.js'
// mainMergedContent = mainMergedContent.replace(
//   /\/static\/js\/\d+\.\w+\.chunk\.js/g,
//   ""
// );
// mainMergedContent = mainMergedContent.replace(
//   /\/static\/css\/\d+\.\w+\.chunk\.css/g,
//   ""
// );
mainMergedContent = mainMergedContent.replace(
  /"static\/js\/\d+\.[a-fA-F0-9]+\.chunk\.js"/g,
  ""
);

// mainMergedContent = mainMergedContent.replace(
//   /"static\/css\/\d+\.[a-f0-9]+\.chunk\.css"/g,
//   ""
// );

// Update image path for productioncd
const dynamicPathRegex =
  /"assets\/images\/events\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)"/g;
const dynamicPathMatch = dynamicPathRegex.exec(mainMergedContent);

if (dynamicPathMatch && dynamicPathMatch.length > 2) {
  const dynamicPart1 = dynamicPathMatch[1];
  const dynamicPart2 = dynamicPathMatch[2];
  mainMergedContent = mainMergedContent.replace(
    new RegExp(
      `"assets\/images\/events\/${dynamicPart1}\/${dynamicPart2}"`,
      "g"
    ),
    `"static/media"`
  );
}

fs.writeFileSync(mainMergedPath, mainMergedContent, "utf8");

let mainContentAgain = fs.readFileSync(mainMergedPath, "utf8");

//removing the function that triggers to call chunk js and css
mainContentAgain = mainContentAgain.replace(
  /n\(\d+\);?\s*\}\s*\)\(\);?/g,
  "} )();"
);

fs.writeFileSync(mainMergedPath, mainContentAgain, "utf8");

console.log("Chunk references removed from main.js and mainmerged.js");
