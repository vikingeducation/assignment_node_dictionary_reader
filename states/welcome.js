const loader = require('../lib/loader');

const welcomeState = {
  header: `
Welcome to the Node Dictionary Reader!
======================================
Enter q to quit
  `,

  prompt: () => {
    console.log(welcomeState.header);
    let fileList = welcomeState.getFiles()

    return(`
    Select a dictionary to load:
    ${fileList}
    `);
  },

  getFiles: () => {
    let fileList;
    loader.getJSON('./data').then( (files ) => {
      fileList = files;
      return fileList;
    })
  }
};

module.exports = (data) => {
  return welcomeState
};

//   listFiles: (fileArray) => {
//     fileArray.forEach( (fileName, index) => {
//       console.log(`${index + 1}. ${fileName}`);
//     })
//   },

// loader.getJSON(path).then( (files) => {
//   fileList = files;
//   cli.listFiles(fileList);
// });
