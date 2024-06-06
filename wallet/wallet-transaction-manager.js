const Wallet = require('./wallet');
const { verifySignature } = require('../util/wallet-config');
console.log('My Blockchain has started');
const Transaction = require('../transaction/transaction');

//4) Wallet testing
console.log('Creating Wallets');
const wallet1 = new Wallet();
const wallet2 = new Wallet();

const data1 = { message: 'This is a message from wallet1' };
const data2 = { message: 'This is a message from wallet2' };

const signature1 = wallet1.sign({ data: data1 });
const signature2 = wallet2.sign({ data: data2 });

console.log(`Wallet1 Public Key: ${wallet1.publicKey}`);
console.log(`Wallet1 Signature: ${signature1.toDER('hex')}`);
console.log(`Wallet2 Public Key: ${wallet2.publicKey}`);
console.log(`Wallet2 Signature: ${signature2.toDER('hex')}`);

// Verify signatures
const isSignature1Valid = verifySignature({publicKey: wallet1.publicKey, data: data1, signature: signature1});
const isSignature2Valid = verifySignature({publicKey: wallet2.publicKey, data: data2, signature: signature2});

console.log(`Is Wallet1's signature valid? ${isSignature1Valid}`);
console.log(`Is Wallet2's signature valid? ${isSignature2Valid}`);

const isSignature1ValidWithWallet2 = verifySignature({publicKey: wallet2.publicKey,data: data1,signature: signature1});
console.log(`Is Wallet1's signature valid with Wallet2's public key? ${isSignature1ValidWithWallet2}`);
const isSignature2ValidWithWallet1 = verifySignature({publicKey: wallet1.publicKey,data: data2,signature: signature2});
console.log(`Is Wallet2's signature valid with Wallet1's public key? ${isSignature2ValidWithWallet1}`);


// //5) Transaction
const transaction1 = new Transaction({senderWallet: wallet1, amount: 1001, recipient: wallet2.publicKey});
console.log(`Is the transaction: ${transaction1.id} validated? ${Transaction.validTransaction(transaction1)}`);

const transaction2 = new Transaction({senderWallet: wallet2, amount: 0, recipient: wallet1.publicKey});
console.log(`Is the transaction: ${transaction2.id} validated? ${Transaction.validTransaction(transaction2)}`);





