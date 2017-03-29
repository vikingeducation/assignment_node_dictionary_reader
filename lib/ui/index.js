const loading = require('../loading');
const dictionaryData = require('../dictionaryData');
const search = require('../searching');
const saving = require('../saving');

function runUI() {
  greeting();
}

function greeting() {
  console.log('Welcome to the Node Dictionary Reader!');
  console.log('======================================');
  console.log('Enter q to quit');
  console.log('');

  dictionarySelect();
}

function dictionarySelect() {
  console.log('Select a dictionary to load:');
  var availableFiles = loading.readDir();

  for (var i = 0; i < availableFiles.length; i++) {
    console.log(i + 1 + '. ' + availableFiles[i]);
  }

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function(str) {
    str = str.trim();

    if (str === 'q') {
      console.log('Goodbye!');
      process.exit();
    }

    userChoice = parseInt(str);

    if (userChoice > 0 && userChoice <= availableFiles.length) {
      process.stdin.pause();
      process.stdin.removeAllListeners('data');

      var path = './data/' + availableFiles[userChoice - 1];
      dictionaryLoad(path);
    } else {
      console.log('That value does not match an available dictionary');
    }
  });
}

function dictionaryLoad(path) {
  console.log('Successful load!');

  console.log(dictionaryData.collectStats(path));

  searchDialogue(dictionaryData.dataObj.data);
}

function searchDialogue(data) {
  console.log('What kind of search would you like to perform?');
  console.log('1. Exact');
  console.log('2. Partial');
  console.log('3. Begins with');
  console.log('4. Ends with');

  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  process.stdin.on('data', function(searchNum) {
    searchNum = searchNum.trim();

    process.stdin.pause();
    process.stdin.removeAllListeners('data');

    searchListener(searchNum, data);
  });
}

function searchListener(searchNum, data) {
  console.log('What term would you like to search for?');
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  process.stdin.on('data', function(searchStr) {
    searchStr = searchStr.trim();

    process.stdin.pause();
    process.stdin.removeAllListeners('data');

    if (searchNum === '1') {
      console.log(search.exactSearch(searchStr, data));
      saveDialog(search.exactSearch(searchStr, data));
    } else if (searchNum === '2') {
      printResults(search.partialSearch(searchStr, data));
    } else if (searchNum === '3') {
      printResults(search.beginsWithSearch(searchStr, data));
    } else if (searchNum === '4') {
      printResults(search.endsWithSearch(searchStr, data));
    } else {
      console.log("That isn't an available option, goodbye");
      process.exit();
    }
  });

  function printResults(matches) {
    console.log('Number of matches: ' + matches.length);
    console.log(matches);

    saveDialog(matches);
  }
}

function saveDialog(matches) {
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');
  console.log("Do you want to save results? y/n? 'q' quits.");
  process.stdin.on('data', function(response) {
    response = response.trim();
    if ('y' === response) {
      process.stdin.pause();
      process.stdin.removeAllListeners('data');
      saveLocation(matches);
    } else if ('n' === response || 'q' === response) {
      process.exit();
    } else {
      console.log("That isn't an available option, goodbye");
      process.exit();
    }
  });
}

function saveLocation(matches) {
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  console.log('What filepath should we write results to?');

  process.stdin.on('data', function(filePath) {
    filePath = filePath.trim();

    if (saving.checkLocation(filePath)) {
      process.stdin.pause();
      process.stdin.removeAllListeners('data');

      overwriteSave(filePath, matches);
    } else {
      saving.saveAtLocation(filePath, matches);
      process.exit();
    }
  });
}

function overwriteSave(filePath, matches) {
  console.log(
    'WARNING: A file already exists here, do you want to overwrite it, y/n?'
  );

  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  process.stdin.on('data', function(response) {
    response = response.trim();

    if (response === 'y') {
      saving.saveAtLocation(filePath, matches);
      process.exit();
    } else {
      console.log('Goodbye');
      process.exit();
    }
  });
}

module.exports = { runUI };
