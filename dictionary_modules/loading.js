const fs = require('fs');
const dictionaryData = require('./dictionary_data.js');

const regex = /json/i;
const path = '../data'
let jsonFiles;

let showJsonFiles = function () {

    fs.readdir(path, (err, data) => {
        if (err) throw err;

        jsonFiles = data.filter((elem, index) => {
            if (regex.test(elem)) {
                console.log(`${index + 1}: ` + elem);
                return elem;
            }
        });
    });
}



let selectedFile = function (selectedIndex) {
    if(selectedIndex > jsonFiles.length || selectedIndex < 1)
        return false;
    else{ 
        let selectedDictionaryFile = require(`${path}/${jsonFiles[selectedIndex-1]}`);
        console.log(`Successfully loaded: ${jsonFiles[selectedIndex-1]}`);
        displayStats(selectedDictionaryFile);
        return true;        
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
}



module.exports ={
    showJsonFiles: showJsonFiles,
    selectedFile: selectedFile
}