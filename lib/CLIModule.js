
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


  }

  chooseFile(input, fileList){
    input = Number(input);
    if (Number.isInteger(input) && (input < fileList.length + 1) && input > 0) {
      return fileList[input - 1];
    } else {
      console.error('Invalid entry. Enter a number in the list');
    }
  }
}

module.exports = CLIModule;