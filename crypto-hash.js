//import of the crypto lib
const crypto = require('crypto');

//..inputs takes n variables into an single array
const cryptoHash = (...inputs) =>{

    //we are selecting sha256 algo
    const hash = crypto.createHash('sha256');

    //this will concat the values present in the array and post it for hashing
    hash.update(inputs.join(' '));
    
    //digest represents the result of hashing in hex form
    return hash.digest('hex');
};

module.exports = cryptoHash;