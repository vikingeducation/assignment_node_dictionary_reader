process.stdin.resume();
process.stdin.setEncoding("utf8");

function showMessage(err) {
  console.log('Welcome to the Node Dictionary Reader!');
  console.log('======================================');
  console.log('Enter q to quit');

  if (err) {
    console.error(err);
  }
};

function quit() {
	let userIn = "";

	process.stdin.on("data", (data) => {
		data = data.trim();

		if (data === "q") {
      console.log('quitting');
			process.stdin.pause();
		}
	})
}


module.exports = {
	showMessage: showMessage,
  quit: quit
}
