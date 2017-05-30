var helpers = {

  showMessage: (err, message) => {
    console.log(message);
    if (err) {
      console.error(err);
    }
  }
}

module.exports = helpers;
