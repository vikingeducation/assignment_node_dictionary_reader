let loading = require('./loading');
let Search = require('./searching.js');
let searchOption;
let selectedFile;

let resumeInput = function (func) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', func);

}

let pauseInput = function (func) {
    process.stdin.pause();
    process.stdin.removeListener('data', func);
}

const showPrompt = (err) => {
    console.log("Welcome to the node Dictionary Reader! \n" +
        "================================================= \n" +
        "Enter \q to quit \n");
    console.log('---Select a dictionary---\n')
}

const searchOptionMessage = () => {

    console.log('What kind of search?\n' +
        '1: Exact\n' +
        '2: Partial\n' +
        '3: Begins With\n' +
        '4: Ends With\n');

}

let loadFileData = (data) => {
    data = data.trim();
    selectedFile = loading.selectFile(data);

    //have a list of options
    //pass the option to loading module and display specific info about that file
    if (isNaN(data)) {
        console.log(`${data} is not a valid number - Please enter a number representing the selectiong above`);
    }
    
    if (selectedFile == 'err') {
        console.log('Pick a number within the range\n');
    }
    else {
        pauseInput(loadFileData);
        searchOptionMessage();
        resumeInput(searchSelection);
    }

    if (data === '\\q') {
        console.log('Goodbye');
        process.exit();
    }
}



let searchSelection = (data) => {
    data = data.trim();
    if (data === '\\q') {
        console.log('Goodbye');
        process.exit();
    }

    if (data < 1 || data > 4) {
        console.log('Please input correct choice --- 1 to 4');
    }
    else {

        pauseInput(searchSelection);
        console.log('Enter the search term: ');
        searchOption = data;

        resumeInput(searchTerm);

    }
}

let searchTerm = (data) => {
    data = data.trim();

    const search = new Search(selectedFile);
    let results = [];

    if (data === '\\q') {
        console.log('Goodbye');
        process.exit();
    }

    if (searchOption == '1') {
        results = search.exactMatch(data);
    }
    if (searchOption == '2') {
        results = search.partialMatch(data);
    }
    if (searchOption == '3') {
        results = search.beginsWith(data);
    }
    if (searchOption == '4') {
        results = search.endWith(data);

    }

    if (results.length == 0) {
        console.log(`Unable to search for ${data}, try another word`);
    }
    else {
        console.log(`Found ${results.length} matches:`)
        results.forEach(elem => {
            console.log(`${elem}\n`)
        });
        
    }
}

let saveSearchResults = (data) {
    data = data.trim();


}

showPrompt();
//call the loading module to show files
loading.showJsonFiles();
resumeInput(loadFileData);
