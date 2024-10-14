const readline = require("readline");
const eventToDev = require("./src/config/eventToDev.json");
const fs = require("fs");

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
  `${BGgreen}Build finish. Do you want to upload the build to aws${resetStyle} ${eventToDev[0].event.toUpperCase()}.${BGgreen}\nwebsite/lp/${
    eventToDev[0].event
  }${resetStyle}`,
  (value) => {
    console.log(value + " is building...");
  }
);
