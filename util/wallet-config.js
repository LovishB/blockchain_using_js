const cryptoHash = require('../util/crypto-hash');

//initialising elliptic algo that will be used to encrypt data
// const EC = require('elliptic').ec;
// const ec = new EC('secp256k1');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1'); // secp256k1 is commonly used in cryptocurrencies


//starting balance for erverone
const STARTING_BALANCE = 1000;

// responsible for verifying the authenticity of a digital signature
// public key of the signer
// data is the original data that was meant to be signed
// signature is the generated sign using (data + private key)
const verifySignature = ({publicKey, data, signature}) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex'); //converts public key in an object that cn be used for verification
    return keyFromPublic.verify(cryptoHash(data), signature); //here the verification is taking place
}

module.exports = { STARTING_BALANCE, ec, verifySignature };