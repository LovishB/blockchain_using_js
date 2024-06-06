const Blockchain = require('./blockchain');
console.log('My Blockchain has started');

// 1) Creating and Adding blockchain
const myBlockchain = new Blockchain();
myBlockchain.addBlock({data: 'First Transaction'});
myBlockchain.addBlock({data: 'Second Transaction'});
myBlockchain.addBlock({data: 'Third Transaction'});
myBlockchain.addBlock({data: 'Fourth Transaction'});

myBlockchain.getChain().forEach((block, index) => {
        console.log(`Block ${index}:`);
        console.log(JSON.stringify(block, null, 4));
});

//2) Validating blockchain
console.log('lets validate the blockchain');
console.log(Blockchain.isValidChain(myBlockchain.getChain()));


// 3) Checking long chain rule and replacement
    const myBlockchain2 = new Blockchain();
    myBlockchain2.addBlock({data: 'First Transaction'});
myBlockchain2.addBlock({data: 'Second Transaction'});
myBlockchain2.addBlock({data: 'Third Transaction'});
myBlockchain2.addBlock({data: 'Fourth Transaction'});
console.log(Blockchain.isValidChain(myBlockchain2.getChain()));

console.log('Will chain replace? ');
myBlockchain.replaceChain(myBlockchain2.getChain());