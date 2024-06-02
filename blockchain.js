const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    //this function ads the block to new chain
    addBlock({data}) {
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock = Block.mineBlock({lastBlock: lastBlock, data: data});
        this.chain.push(newBlock);
    }

    
    //this fucntion will validate the chain
    static isValidChain(chain) {

         //validation for genesis block
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, lastHash, hash, data, nonce, difficulty } = chain[i];
            const actualLastHash = chain[i - 1].hash;
            const lastDifficulty = chain[i - 1].difficulty;
            
            //validating lasthash for rest of the block
            if (lastHash !== actualLastHash) return false;

            //validating new hash generation for rest of the block
            if (hash !== cryptoHash(timestamp, lastHash, data, nonce, difficulty)) return false;

            //This check has been added so that no attacker can jump difficluty in their blockchain
            //either reducing and quickly creating a longer chain or increasing the making blockchain slow
            if (Math.abs(lastDifficulty - difficulty) > 1) return false;
        }

        return true;
    }

    // getter method to return the chain
    getChain() {
        return this.chain;
    }

    //this function will replace the chain if new chain is validated and the long chain rule is follwed
    replaceChain(newChain) {
        //long chain rule failed
        if(newChain.length <= this.chain.length) {
            return;
        }

        //validation check failed
        if(!Blockchain.isValidChain(newChain)) {
            return;
        }   
        this.chain = newChain;
    }
}

module.exports = Blockchain;