const cryptoHash = require('../util/crypto-hash');

//initialising elliptic algo that will be used to encrypt data
// const EC = require('elliptic').ec;
// const ec = new EC('secp256k1');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1'); // secp256k1 is commonly used in cryptocurrencies

//starting balance for erverone
const STARTING_BALANCE = 1000;

const verifySignature = ({ publicKey, data, signature }) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');
    return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = { STARTING_BALANCE, ec, verifySignature };