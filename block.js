//this is a reference to the cryptoHash funstion in crypto-hash file
const cryptoHash = require('./crypto-hash');
const { GENESIS_DATA } = require('./config');

class Block {

    //giving values in a map for better formatting
    constructor({timestamp, lastHash, hash, data}) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    //a static function, it will return the genesis block
    static genesis() {
        return new this(GENESIS_DATA);
    }

     //this func will return a new block and create the hash using previous block hash 
    static mineBlock({lastBlock, data}) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = cryptoHash(timestamp, lastHash, data);

        return new Block({
            timestamp: timestamp,
            lastHash: lastHash,
            data: data,
            hash: cryptoHash(timestamp, lastHash, data)
        })
    }
}

module.exports = Block;


