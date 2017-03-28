const fs = require('fs');

function checkLocation(filePath) {
  return fs.existsSync(filePath);
}

function saveAtLocation(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

module.exports = {
  checkLocation,
  saveAtLocation
};
