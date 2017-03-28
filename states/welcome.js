const loader = require('../lib/loader');
const cli = require('../lib/cliModule');

const welcomeState = {

  fileList: loader.getJSONFiles('./data'),

  header: `
Welcome to the Node Dictionary Reader!
======================================
Enter q to quit
  `,

  prompt: () => {
    console.log(welcomeState.header);

    return(`
Select a dictionary to load:
${welcomeState.listFiles(welcomeState.fileList)}
    `);
  },

  listFiles: (fileArray) => {
    let string = "";
    fileArray.forEach( (fileName, index) => {
      string += `${index + 1}. ${fileName}\n`;
    })
    return string;
  },

  isValid: (data) => {
    data = parseInt(data) - 1;
    return Number.isInteger(data) && welcomeState.fileList[data];
  },

  error: () => {
    return 'Invalid entry. Enter a number in the list.';
  },

  transition: (data) => {
    cli.render('stats', data);
  }
};

module.exports = (data) => {
  return welcomeState;
};
