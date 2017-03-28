
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

  handleFileSelection(input, fileList){
    let finshed = false;
    input = Number(input)
    if ( isNaN(input) || (input < 1) || ( input > fileList.length) ) {
      console.error('Invalid entry. Enter a number in the list');
    } else {
      console.log(`You selected ${fileList[input - 1]}`);
    }
    // todo: check input type - is it an integer? does it match something in file list?

  }
}

module.exports = CLIModule;