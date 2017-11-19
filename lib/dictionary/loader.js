const fs = require("fs");
const dictionary_data = require("./dictionary_data");

function loader(param, files) {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  var onData = data => {
    data = param.trim();
    let path = files[data - 1];
    let dictionary;

    if (data === "q") {
      process.exit();
    } else if (parseInt(data) < 1 || parseInt(data) > files.length) {
      console.log("Please choose a valid dictionary option.");
    } else {
      fs.readFile(`../../data/${path}`, (err, data) => {
        if (err) {
          throw err;
        }
        dictionary = JSON.parse(data);
        console.log("Successfully loaded: dictionary.json!");
        dictionary_data(dictionary);
      });


  function searching () {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        // placeholder for search module
        console.log("What kind of search?");
        console.log("1: Exact");
        console.log("2: Partial");
        console.log("3: Begins With");
        console.log("4: Ends With");

        switch(parseInt(data)) {
          case '1':
            console.log("What are you looking for?")
            searches.exact_matches(data)

          default:
        }




        console.log("What word are you looking for?")
      }
    }
  };
}

      // Set the listener
      process.stdin.on("data", onData);
    }
  };
  onData();
}

module.exports = loader;
