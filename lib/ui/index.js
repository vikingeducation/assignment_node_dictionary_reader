const menu = require("./menu");
const ui   = require("./ui");

module.exports = () => {
  console.log("Welcome to the Node Dictionary Reader:");
  console.log("======================================");

  menu("Enter q to quit or enter to load and continue", ["q", ""], arg => {
    if (arg === "q" || arg === "quit") {
      process.exit(); // end the process immediately
    }

    //UI STUFF
    ui();
  });
};
