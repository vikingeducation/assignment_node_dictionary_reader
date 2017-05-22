const fs = require('fs');
const dictionaryData = require('./dictionary_data.js');

const regex = /json/i;
const path = '../data'
let jsonFiles;
let selectedDictionaryFile;

let showJsonFiles = function () {

    fs.readdir('./data', (err, data) => {
        if (err) throw err;

        jsonFiles = data.filter((elem, index) => {
            if (regex.test(elem)) {
                console.log(`${index + 1}: ` + elem);
                return elem;
            }
        });
    });
}



let selectFile = function (selectedIndex) {
    

    if(selectedIndex > jsonFiles.length || selectedIndex < 1)
        return 'err';
    else{ 
        selectedDictionaryFile = require(`${path}/${jsonFiles[selectedIndex-1]}`);
        console.log(`Successfully loaded: ${jsonFiles[selectedIndex-1]}`);
        displayStats(selectedDictionaryFile);
        return selectedDictionaryFile;        
    }
}


let displayStats = function(file) {
  let wordCount =  dictionaryData.wordCount(file);
  let letterFrequency = dictionaryData.letterFrequency(file);

  console.log(`Word count: ${wordCount} \n`);
  console.log("Word frequency starting by letter:\n");
  for(item in letterFrequency){
      console.log(`${item}: ${letterFrequency[item]} `);
  }
  console.log("\n");
}



module.exports ={
    showJsonFiles: showJsonFiles,
    selectFile: selectFile,
}