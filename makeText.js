const process = require("process");
const fs = require("fs");
const mm = require("./markov");
const axios = require("axios");

let data = "";

try {
  if (!process.argv[2] || !process.argv[3]) throw new TypeError();

  switch (process.argv[2].toLowerCase()) {
    case "file": {
      data = fs.readFileSync(process.argv[3], "utf8");
      break;
    }
    case "url": {
      data = axios.get(process.argv[3]);
      break;
    }
  }
} catch (e) {
  let msg = "";

  switch (e.code) {
    case "ENOENT":
      msg = "File not found";
      break;
    case "ERR_INVALID_URL":
      msg = "Invalid URL";
      break;
    case "ERR_INVALID_ARG_TYPE":
      msg = "No file path provided";
      break;
  }
  if (!msg && e instanceof TypeError) {
    msg = "Usage: makeText.js <file|url> <path> [numWords]";
  }

  if (!msg) throw e;

  console.error("Error: ", msg);
  process.exit(1);
}

const machine = new mm.MarkovMachine(data);
console.log(machine.makeText((numWords = process.argv[4])));
