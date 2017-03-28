
class CLIModule {
  constructor(){
  }

  intro(){
    return(`
    Welcome to the Node Dictionary Reader!
    ======================================
    Enter q to quit
    `)
  }
}

module.exports = CLIModule;