fs = require("fs");

let dictionaries = {
  arrayDictionaries: fs.readdirSync("../data/", (err, data) => {
    if (err) {
      throw err;
    }
    return data;
  }),
  loaderFunction: function loader() {
  fs.readdir("../data/", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("Select a dictionary to load:");
    for (let i = 0; i < data.length; i++) {
      console.log(i + 1 + ". " + data[i]);
    }
    return data;
  });
  }
}

module.exports = dictionaries;
