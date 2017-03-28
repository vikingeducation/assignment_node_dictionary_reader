
class CLIModule {
  constructor(){
  }

  intro(){
    console.log(`
    Welcome to the Node Dictionary Reader!
    ======================================
    Enter q to quit
    `)
  }

  listFiles(fileArray) {
    fileArray.forEach( (fileName, index) => {
      console.log(`${index + 1}. ${fileName}`);
    })
  }

  handleInput(data, func, ...args) {
    let finished = false;
    while (!finished) {
      finished = func(data, ...args);
    }
  }

  chooseFile(input, fileList){
    input = Number(input);
    if (Number.isInteger(input) && (input < fileList.length + 1) && input > 0) {
      console.log(`You selected ${fileList[input - 1]}`);
      return fileList[input];
    } else {
      console.error('Invalid entry. Enter a number in the list');
    }
  }
}

module.exports = CLIModule;