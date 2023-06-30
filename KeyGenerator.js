const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Generate a new key pair and convert them to hex-strings
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// Print the keys to the console
console.log();
console.log('public key (also the wallet address, freely shareable)\n',publicKey);

console.log();
console.log('private key (keep this secret! To sign transactions)\n',privateKey);