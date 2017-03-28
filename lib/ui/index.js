const loading = require("../loading");

function runUI() {
  greeting();
  loading.readDir();
}

function greeting() {
  console.log("Welcome to the Node Dictionary Reader!");
  console.log("======================================");
  console.log("Enter q to quit");
}

module.exports = { runUI };
