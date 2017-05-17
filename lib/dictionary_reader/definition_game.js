let _answer;
let choices;
let _words;
let _score = 0;
let _attempts = 3;

const getDefinition = (dictionary) => {
  _words = Object.keys(dictionary);
  let rng = Math.floor((Math.random() * _words.length) + 1);
  let selected = _words[rng]
  _answer = selected;
  return dictionary[selected];
};

const getChoices = (dictionary) => {
  choices = [_answer];

  for (let i = 0; i < 4; i++) {
    let rng = Math.floor((Math.random() * _words.length) + 1);
    choices.push(_words[rng]);
  }

  choices = shuffle(choices);

  return choices;
};

// Fisher Yates Shuffle borrowed from:
// http://stackoverflow.com/a/2450976/7565120
const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const checkAnswer = (input) => {
  let _answerIndex = choices.indexOf(_answer);
  return input === _answer || parseInt(input - 1) === _answerIndex;
};

const updateScore = (isAnswerCorrect) => {
  if (isAnswerCorrect) {
    _score += _answer.length;
  } else {
    _attempts--;
  }
};

const getScore = () => {
  return _score;
};

const getAttempts = () => {
  return _attempts;
};

const getResponse = (isAnswerCorrect) => {
  if (isAnswerCorrect) {
    return `Correct! The answer was ${ _answer }.`;
  } else {
    return `Sorry, that was incorrect. The answer was ${ _answer }.`;
  }
};

module.exports = {
  getDefinition: getDefinition,
  getChoices: getChoices,
  checkAnswer: checkAnswer,
  updateScore: updateScore,
  getScore: getScore,
  getAttempts: getAttempts,
  getResponse: getResponse
};