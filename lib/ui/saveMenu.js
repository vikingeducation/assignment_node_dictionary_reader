function saveMenu(dictionary, words) {
  menu("Do you want to save results", {"y":"", "n":""}, (choice) => {
    if(choice ==="y") {
      // save the data
      console.log("What filepath should we write results to?");
      process.stdin.resume();
      process.setEncoding('utf8');
      let onData = data => {
        data = data.trim();
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        callback(data);
      }
      process.stdin.on('data', onData);
    }
  })
  console.log("Do you want to save results?")
}
