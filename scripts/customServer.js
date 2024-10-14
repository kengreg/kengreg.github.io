const { spawn } = require("child_process");
const path = require("path");
const readline = require("readline");
const eventToDev = require("../src/config/eventToDev.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const redColor = "\x1b[31m";
const resetStyle = "\x1b[0m";
const BGblue = "\x1b[44m";
const BGgreen = "\x1b[42m";
console.clear();
rl.question(
  `Do you want to upload the build to AWS? (yes/no) \n Path : ${BGgreen}[bucket ./lp/${eventToDev[0].event}]${resetStyle}`,
  (answer) => {
    rl.close();

    if (answer.toLowerCase() === "yes") {
      console.log("Uploading build to AWS...");

      const serverFilePath = path.join(__dirname, "..", "api", "server.js");

      const serverProcess = spawn("node", [serverFilePath]);

      serverProcess.stdout.on("data", (data) => {
        console.log(`Server output: ${data}`);
      });

      serverProcess.stderr.on("data", (data) => {
        console.error(`Server error: ${data}`);
      });

      serverProcess.on("close", (code) => {
        console.log(`Server process exited with code ${code}`);
      });
    } else {
      console.log("Not uploading build to AWS.");
    }
  }
);
