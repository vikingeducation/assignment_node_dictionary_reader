
function search(content, option, phrase) {

  var keys = Object.keys(content);
  var results = [];
  var phrase = phrase.toLowerCase();

  function getSearchPattern() {
    switch(option) {
      case '1':
        // exactSearch();
        return new RegExp(phrase);
      case '2':
        // patrialSearch();
        return new RegExp(".*" + phrase + ".*", "g");
      case '3':
        // prefixSearch();
        return new RegExp("^" + phrase, "g");
      case '4':
        // sufixSearch();
        return new RegExp(phrase + "$", "g");
    };
  }

  function searcher() {
    var matcher = getSearchPattern();
    keys.forEach( (word) => {
      if ( matcher.test(word) ) {
        results.push(word);
      }
    })
    return results;
  }

  return searcher();


  // function exactSearch() {
  //   keys.forEach( (word) => {
  //     var matcher = new RegExp(phrase);
  //     if ( matcher.test(word) ) {
  //       results.push(word);
  //     }
  //   });
  // }
  //
  // function patrialSearch() {
  //
  // }
  //
  // function prefixSearch() {
  //
  // }
  //
  // function sufixSearch() {
  //
  // }

}


module.exports =  {
  properties: function(content, option, phrase) {
    return search(content, option, phrase);
  }
}
