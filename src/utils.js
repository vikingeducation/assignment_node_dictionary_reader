let isInRange = function(range1, range2, num) {
  if ( (num >= range1) && (num <= range2) ) return true;
  else return false;
};

let sayGoodbye = () => {
  console.log('Goodbye!');
  process.exit();
};

module.exports = {
	isInRange: isInRange,
	sayGoodbye: sayGoodbye
}