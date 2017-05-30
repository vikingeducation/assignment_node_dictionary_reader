var states = {
  possibleStates: {
    INITIALIZING: 0,
    LOADING_DICTIONARIES: 1,
    DISPLAYING_DICTIONARY_STATS: 2,
    QUITTING: 3
  }
}

states.currentState = states.possibleStates.INITIALIZING;

states.advanceState = () => {
  switch (states.currentState) {
    case states.possibleStates.INITIALIZING:
    states.currentState = states.possibleStates.LOADING_DICTIONARIES;

  }
}

module.exports = states;
