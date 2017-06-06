let fs = require('fs');

let writeToFile = (path, data) => {
 
    fs.writeFile(path, data.join('\n'), 'utf8', (err) => {
        if(err) throw err;
        console.log('File successfully overwritten!');
        process.exit();
    });



}

module.exports = {
    writeToFile: writeToFile
}