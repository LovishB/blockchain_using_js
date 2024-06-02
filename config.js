//this file will store all pre defined static data

// if the last mine blocked was earlier or late 
// compared to the global mine rate time, we will adjust difficilty
const MINE_RATE = 800;
const INITIAL_DIFFICULTY = 2;

const GENESIS_DATA = {
    timestamp: Date.now(),
    lastHash: '----',
    hash: 'genesis-hash',
    data: [],
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0
};


module.exports = { GENESIS_DATA, MINE_RATE };

