
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
}

module.exports = CLIModule;