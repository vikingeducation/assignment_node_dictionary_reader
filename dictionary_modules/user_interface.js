let loading = require('./loading');

process.stdin.resume();
process.stdin.setEncoding('utf8');

let showPrompt = (err) => {
    console.log("Welcome to the node Dictionary Reader! \n" + 
                "================================================= \n" +
                "Enter \q to quit \n");
    console.log('---Select a dictionary---\n')
}

showPrompt();
//call the loading module to show files
loading.showJsonFiles();

let onData = (data) => {
    data = data.trim();

    //have a list of options
    //pass the option to loading module and display specific info about that file
    if(isNaN(data)){
        console.log(`${data} is not a valid number - Please enter a number representing the selectiong above`);
    }
    if (loading.selectedFile(data)) {
        process.exit('File selected');
    }
    else{
        console.log('Pick a number within the range');
    }


    if(data === '\\q'){
        console.log('Goodbye');
        process.kill();
    }
}

process.stdin.on('data', onData);