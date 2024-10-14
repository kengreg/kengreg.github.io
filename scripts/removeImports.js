const fs = require("fs");
const path = require("path");

const mainMergedPath = path.join(
  __dirname,
  "..",
  "build",
  "static",
  "js",
  "main.js"
);

//IMPORTANT REPLACE:
//! all these replaces are important in order to avoid errors in console or import chunk files

//? REPLACE: functions that work or try to chunk files-------------------------------
let mainMergedContent = fs.readFileSync(mainMergedPath, "utf8");
const regexPattern = /,?n\.(e|u|miniCssF)=e=>".*?\.chunk\.(js|css)",?/g;

//? REPLACE: after the above replace we need to eliminate any call of those functions-------------------------------
mainMergedContent = mainMergedContent.replace(regexPattern, (match) => {
  if (match.includes("n.u")) {
    return ",n.u = function(e) {};";
  } else if (match.includes("n.miniCssF")) {
    return "n.miniCssF = function(e) {};";
  } else {
    return "";
  }
});

//? REPLACE: finally we need to remove any code that try to append css to the head -------------------------------
//this one is trying to append chunk css
// mainMergedContent = mainMergedContent.replace(
//   /document\.head\.appendChild\(a\)/g,
//   "() => {}"
// );

//this one is trying to append chunk css in different way
// mainMergedContent = mainMergedContent.replace(
//   /document\.head\.appendChild\(l\)/g,
//   "''"
// );

const regex1 = /&&\s*document\.head\.appendChild\([^)]+\)\s*}/g;
mainMergedContent = mainMergedContent.replace(regex1, "&&''}");

const regex2 = /\([^)]+\):\s*document\.head\.appendChild\([^)]+\)\s*}/g;
mainMergedContent = mainMergedContent.replace(regex2, ":() => {}}");

// mainMergedContent = mainMergedContent.replace(
//   /n\.f\.j\s*=\s*\(t,r\)\s*=>\s*{([\s\S]*?)};/g,
//   (match, p1) => {
//     let modified = p1.replace(
//       /else {[\s\S]*?}/,
//       'else { console.log("ready"); }'
//     );
//     return `n.f.j = (t, r) => {${modified}};`;
//   }
// );

mainMergedContent = mainMergedContent.replace(
  /n\.f\.j\s*=\s*\(t,\s*r\)\s*=>\s*{([\s\S]*?)\s*};/g,
  (match, p1) => {
    console.log("we found a replace to do");
    let modified = p1.replace(
      /else\s*{([\s\S]*?)\s*}/,
      'else { console.log("ready"); }'
    );
    return `n.f.j = (t, r) => {};`;
  }
);

// Write back to mainmerged.js
fs.writeFileSync(mainMergedPath, mainMergedContent, "utf8");
console.log("finish with deleting imports");
