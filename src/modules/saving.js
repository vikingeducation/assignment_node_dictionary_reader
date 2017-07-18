var fs = require('fs');
var lastSearchValue;
var SaveSearch = function()
{

//write file
fs.writeFile("test", lastSearchValue, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
}
var LastSearch = function(lastvalue)
{
lastSearchValue = lastvalue;


}
module.exports = {"SaveSearch": SaveSearch,"LastSearch": LastSearch}
