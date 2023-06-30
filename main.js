const { Blockchain, Transaction } = require('./BlockChain');
const EC = require('elliptic').ec;
const ellipticCurve = new EC('secp256k1');

//My private key goes here
const myPrivateKey = ellipticCurve.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myPrivateKey.getPublic('hex');
const sendingAddress1 = ellipticCurve.genKeyPair();
const address1 = sendingAddress1.getPublic('hex');
const sendingAddress2 = ellipticCurve.genKeyPair();
const address2 = sendingAddress2.getPublic('hex');
// Create new instance of Blockchain class
const myBlockchain = new Blockchain();

// Mine first block
myBlockchain.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const transaction1 = new Transaction(myWalletAddress, address2, 100);
transaction1.sign(myPrivateKey);
myBlockchain.addTransaction(transaction1);

// Mine block
myBlockchain.minePendingTransactions(myWalletAddress);

// Create second transaction
const transaction2 = new Transaction(myWalletAddress, address1, 70);
transaction2.sign(myPrivateKey);
myBlockchain.addTransaction(transaction2);

// Mine block
myBlockchain.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of myWalletAddress is ${myBlockchain.getBalanceOfAddress(myWalletAddress)}`);
console.log(`Balance of address2 is ${myBlockchain.getBalanceOfAddress(address2)}`);
console.log(`Balance of address1 is ${myBlockchain.getBalanceOfAddress(address1)}`);


// Uncomment this line  to test tampering with the chain
// myBlockchain.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', myBlockchain.isChainValid() ? 'Yes' : 'No');
console.log(`Balance of myWalletAddress is ${myBlockchain.getBalanceOfAddress(myWalletAddress)}`);
