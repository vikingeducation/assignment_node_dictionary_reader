var fs = require('fs');

var path = './data';

function load() {
    // Start listening to STDIN
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    // Inline function to handle
    // message output
    var showMessage = (err) => {
        console.log("Welcome to the Node Dictionary Reader!");
        console.log("======================================");
        console.log("Enter q to quit.");

        if (err) {
            console.error(err);
        }
    };

    // Display message
    showMessage();

    //Read Directory
    let jsonFiles = [];
    fs.readdir(path, (err, data) => {
        if (err) {
            throw err;
        }

        console.log("Select a dictionary to load:");
        //Check if JSON and display them
        for (let i = 0; i < data.length; i++) {
            if (data[i].includes(".json")) {
                let element = (i + 1) + "." + data[i];
                console.log(element)
                jsonFiles.push(data[i]);
            }
        }

    });

    // Handler for STDIN data
    // event
    var onData = (data) => {
        data = data.trim();

        if (data === 'q') {
            process.exit();
        } else if (data <= jsonFiles.length && data > 0) {

            var path = './data/' + jsonFiles[data - 1];

            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }

                let wordArr = data.split(' ');

                let wordCount = data.split(' ').length;

                let words = {};

                wordArr.forEach(element => {
                    if (element.charAt(0).match(/^[a-zA-Z]/)) {
                        if (words[element.charAt(0)]) {
                            words[element.charAt(0)] += 1;
                        } else {
                            words[element.charAt(0)] = 1;
                        }
                    }
                })

                //Display Statistics
                console.log("Successfully loaded: ", jsonFiles[data - 1]);
                console.log("Word count: ", wordCount);
                console.log(String(words));

            });
        } else {
            // All other input is invalid
            showMessage(`Invalid: ${ data }`);
        }
    };

    // Set the listener
    process.stdin.on('data', onData);

}

//call
load();
