//this is a reference to the cryptoHash funstion in crypto-hash file
const cryptoHash = require('./crypto-hash');
const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('./config');

class Block {

    //giving values in a map for better formatting
    constructor({timestamp, lastHash, hash, data, nonce, difficulty}) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    //a static function, it will return the genesis block
    static genesis() {
        return new this(GENESIS_DATA);
    }

     //this func will return a new block and create the hash using previous block hash 
    static mineBlock({lastBlock, data}) {

        //nonce, timestamp, hash, diffuculty value calculation
        let nonce = 0;
        let timestamp, hash, difficulty;
        const lastHash = lastBlock.hash;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = this.adjustDifficulty({lastBlockDifficulty: lastBlock.difficulty, 
                lastBlockTimestamp: lastBlock.timestamp, newTimestamp: timestamp });
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));
        //1) let's assume difficulty is 4
        //2) hash.substring(0, difficulty) - it will give the string from index 0 to the index 4, 
        //   so you will give you 4 the leading digits
        //3) '0'.repeat(difficulty)- it will give 0000
        //4) now we want to run the loop until the hash generated will have 4 leading zeros

        //while checking contiditon, we convert hex to binary for more precise average time using difficlity 
        //since we need more leading zeros and our system can easily mine in hex 3-4 leading zeros.
        // 0001 (hex) is equal to 0000 0000 0000 0001 (binary), so many zeros to work for

        return new Block({
            timestamp: timestamp,
            lastHash: lastHash,
            data: data,
            hash: hash,
            nonce : nonce,
            difficulty: difficulty
        })
    }

    static adjustDifficulty({lastBlockDifficulty, lastBlockTimestamp, newTimestamp}) {
        const difficulty = lastBlockDifficulty;
        //fail safe so that the difficulty never goes below 0
        if(lastBlockDifficulty < 1) {
            return difficulty;
        }

        //the block is taking more time than min rate(mined too slow), reduce difficulty
        const difference = newTimestamp - lastBlockTimestamp;
        if(difference > MINE_RATE) {
            return difficulty -1;
        }

        //the block is taking less time than min rate(mined too quick), reduce difficulty
        return difficulty +1;
    }
}

module.exports = Block;


