# assignment_node_dictionary_reader
I CAN HAS SPELLZ IN "Node"? K THNX BYE



Break everything down into single function modules and constructors

good syntax and semantics so that the features interact with each other well.

(child module file structure will be important)



1. CLI User Interface
-user prompting
  with - stdin
  using - prompt #. dictionary

-accepting input
  accept input as call to dictionary(store in var)

-error reporting
  file doesnt exist
  input invalid (NaN)


-display
  display json files directory
    dir array =fs.readdir



2. Loading 
-loading dictionary file
  pull dictionary out of dir array
  currentDict = readFile on dictionary

-keeping track of dictionary files available for loading
  with dir array


3. Saving
-write search results to file
  Module: 
    save results?
    file path?
    if file exists, overwrite?
    if not append
    exit

-avoid overwriting the default dictionary.json (loaded dict)
  Saving regex to its own object


4. searching
  -search current dictionary (parent module)
    separate functions(module folder w children modules)
      exact match
      partial matches
      begins with
      ends with
      formatter
    -by user input
      require search functionality into main module

5. Dictionary Data
  -the wrapper for the dictionary.json
    -used to access json data
    -used to provide statistics
      

