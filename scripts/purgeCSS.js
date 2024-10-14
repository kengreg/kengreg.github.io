const { PurgeCSS } = require("purgecss");
const fs = require("fs");

// Run PurgeCSS
async function runPurgeCSS() {
  const purgeCSSResults = await new PurgeCSS().purge({
    content: ["./build/index.html", "./build/static/js/*.js"], //sources to check
    css: ["./build/static/css/main.css"], //css that will be purged
    keyframes: true,
    variables: true,
    rejected: true,
    whitelistPatterns: [/^(?!fs-|tw-).*$/],
  });
  purgeCSSResults.forEach((purgedContent, index) => {
    fs.writeFileSync(`./build/static/css/main.css`, purgedContent.css);
  });
}

runPurgeCSS()
  .then(() => {
    console.log("PurgeCSS completed.");
  })
  .catch((error) => {
    console.error("Error running PurgeCSS:", error);
  });
