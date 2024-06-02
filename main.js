const Blockchain = require('./blockchain');

console.log('My Blockchain has started');
// Initialize the blockchain
const myBlockchain = new Blockchain();

// console.log('Has genesis block added to blockchain? ');
// console.log(JSON.stringify(myBlockchain.getChain()[0], null, 4));


myBlockchain.addBlock({data: 'First Transaction'});
myBlockchain.addBlock({data: 'Second Transaction'});
myBlockchain.addBlock({data: 'Third Transaction'});
myBlockchain.addBlock({data: 'Fourth Transaction'});

// console.log('Has two new blocks added to chain?')

// myBlockchain.getChain().forEach((block, index) => {
//         console.log(`Block ${index}:`);
//         console.log(JSON.stringify(block, null, 4));
//     });

    console.log('lets validate the blockchain');

    console.log(Blockchain.isValidChain(myBlockchain.getChain()));

//     const myBlockchain2 = new Blockchain();
//     myBlockchain2.addBlock({data: 'First Transaction'});
// myBlockchain2.addBlock({data: 'Second Transaction'});
// myBlockchain2.addBlock({data: 'Third Transaction'});
// myBlockchain2.addBlock({data: 'Fourth Transaction'});
// console.log(Blockchain.isValidChain(myBlockchain2.getChain()));


// console.log('Will chain replace? ');
// myBlockchain.replaceChain(myBlockchain2.getChain());



// myBlockchain.getChain().forEach((block, index) => {
//     console.log(`Block ${index}:`);
//     console.log(JSON.stringify(block, null, 4));
// });




