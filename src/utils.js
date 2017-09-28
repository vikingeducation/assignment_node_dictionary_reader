const fs = require('fs');

let isInRange = function(range1, range2, num) {
  if ( (num >= range1) && (num <= range2) ) return true;
  else return false;
};

let sayGoodbye = () => {
  console.log('Goodbye!');
  process.exit();
};

let saveFile = (path, results, msg) => {
  fs.writeFile(path, results, 'utf8', (err) => {
    
    if (err) console.log(err);
    console.log(msg);
    sayGoodbye();
  });
}

module.exports = {
  isInRange: isInRange,
  sayGoodbye: sayGoodbye,
  saveFile: saveFile
}

