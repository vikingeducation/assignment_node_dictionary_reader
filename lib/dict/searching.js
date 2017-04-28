const saving = require('./saving');

let _dict = {};
let _command = 0;
let _searchTerm = '';
let _regex = '';
let _searchResults = {};
let _searchCount = 0;

function init(dictionary) {

  _dict = dictionary.words

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  searchOptionsMessage();

  var onData = (data) => {
    data = data.trim();

    if (data === '\\q' || data === '\\Q') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      process.exit();

    } else if (_command === 0 && checkValidInput(data)) {
      _command = parseInt(data);
      console.log('Enter a search term: ');
    } else if (checkValidInput(_command)) {
      // we have a search term, now just need the input
      _searchTerm = data;
      runSearch();
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      saving.init(_searchResults, this);
    } else {
      console.log('Invalid input!');
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

function resetSearch() {
  _command = 0;
  _searchTerm = '';
  _regex = '';
  _searchResults = {};
  _searchCount = 0;
  searchOptionsMessage();
}

function runSearch() {
  console.log(`Searching for ${_searchTerm} using ${_command}`);
  switch (_command) {
    case 1:
      _regex = new RegExp('^' + _searchTerm + '$');
      break;
    case 2:
      _regex = new RegExp('^\\w+' + _searchTerm + '\\w+');
      break;
    case 3:
      _regex = new RegExp('^' + _searchTerm + '\\w+');
      break;
    case 4:
      _regex = new RegExp('\\w+' + _searchTerm + '$');
      break;
    default:
      console.error('Invalid command request');
  }

  for (words in _dict) {
    if (_regex.test(words.toString())) {
      _searchResults[words] = _dict[words];
      _searchCount += 1;
    }
  }

  console.log(`\n Found ${_searchCount} matches`);
  for (word in _searchResults) {
    console.log(word);
  };
}

function checkValidInput(data) {
  if (parseInt(data) >= 1 && parseInt(data) <= 4) {
    return true
  } else {
    return false
  }
}

function searchOptionsMessage() {
  console.log('\nSelect a search option: ');
  console.log('1: Exact Match');
  console.log('2: Partial Match');
  console.log('3: Begins with Match');
  console.log('4: Ends with Match');
  console.log('\\Q: Quit');
}

module.exports = {
  init
}
