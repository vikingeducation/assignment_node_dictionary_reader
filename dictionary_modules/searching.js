
function Search(dictionary){

    this.exactMatch = (findWord) => {
        let results = [];

        //Using the RegExp, pass in a string to be used as a regex literal
        let regex = new RegExp ('^'+findWord+'$', 'i');

        //pass 
        for(item in dictionary){
            if(regex.test(item)){
                results.push(item);
            }
        }

        return results;


    }

    this.partialMatch = (findWord)=> {
        let results = [];
        let regex = new RegExp (findWord, 'i');

        //pass 
        for(item in dictionary){
            if(regex.test(item)){
                results.push(item);
            }
        }

        return results;
    }

    this.beginsWith = (findWord) =>{
        let results = [];

        //Using the RegExp, pass in a string to be used as a regex literal
        let regex = new RegExp ('^'+findWord, 'i');

        //pass 
        for(item in dictionary){
            if(regex.test(item)){
                results.push(item);
            }
        }

        return results;
    }
    this.endWith = (findWord) => {
        let results = [];

        //Using the RegExp, pass in a string to be used as a regex literal
        let regex = new RegExp (findWord+'$', 'i');

        //pass 
        for(item in dictionary){
            if(regex.test(item)){
                results.push(item);
            }
        }

        return results;
    }

}

module.exports = Search;