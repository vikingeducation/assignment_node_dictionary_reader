let userInterface = require('./lib/cli_user_interface');
let loader = require('./lib/loading');


userInterface.introMessage();
userInterface.quit();

loader.loading().then((data) => {
	userInterface.displayDictionaries(data);
	userInterface.selectDict(data);
	userInterface.selectSearchType();
})
