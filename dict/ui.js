function init() {
  console.log(`
    Welcome to the Node Dictionary Reader!
    ======================================
    Enter q to quit
  `);
}

function listFiles(filesArr) {
  console.log('Here are the available Files:');
  
  filesArr.forEach(function(fileName, index) {
    console.log(`${index}: `, fileName);
  });
}

function promptFiles() {
  console.log('Which dictionary would you like to use?');
}

function success(dictName) {
  console.log(`Successfully loaded dictionary ${dictName}`)
}

function noFind() {
  console.log('That dictionary could not be found, please try again.')
}

function reportStats(reportObj) {
  console.log(`Word count: ${reportObj.words}`)
  console.log('Word frequency by starting letter:');

  for (var key of Object.keys(reportObj)) {
    if (key !== 'words') {
      console.log(`${key}: ${reportObj[key]}`)
    }
  }
}

module.exports = {
  init: init,
  listFiles: listFiles,
  promptFiles: promptFiles,
  success: success,
  noFind: noFind,
  reportStats: reportStats
}