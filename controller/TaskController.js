const Web3 = require("web3");
const { default: Common }  = require ('@ethereumjs/common');
const config=require('../config');

var provider = config.infuraProjectId;
var web3 = new Web3(new Web3.providers.HttpProvider(provider));
var Tx = require('ethereumjs-tx').Transaction;
var contractAddress = "0x3786Bc7E2A71369fDF34Db8e20307ED4c366bF2c";
const abi = [{"inputs":[{"internalType":"uint256","name":"taskId","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"assignTask","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"}],"name":"createTask","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"taskId","type":"uint256"}],"name":"taskCompleted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tasks","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"address","name":"assignTo","type":"address"},{"internalType":"enum TodoTask.TaskStatus","name":"status","type":"uint8"}],"stateMutability":"view","type":"function"}];
const contract = new web3.eth.Contract(abi, contractAddress);
const from = "0x134BAEfB4E464bAA88F85D1DE4639F2082324bB3";


exports.form = async (req, res, next) => {
   res.render('task');
};

exports.create = async (req, res, next) => {
   console.log(req.body);
   let name = req.body.name;
   let description = req.body.description;
   const taskEncode = await contract.methods.createTask(name, description).encodeABI();
   const nonce = await web3.eth.getTransactionCount("0x134BAEfB4E464bAA88F85D1DE4639F2082324bB3", 'pending');
   const estimateGas = await web3.eth.estimateGas({
     "from"      : from,       
     "nonce"     : web3.utils.toHex(nonce), 
     "to"        : contractAddress,     
     "data"      : taskEncode
})

    const txParams = {
      nonce: web3.utils.toHex(nonce),
	  gasPrice: web3.utils.toHex(web3.utils.toWei('2', "gwei")), 
      gasLimit:  160000,
	  from: from,
      to: contractAddress,
      value: '0x00',
      data: taskEncode
    };
    var common = new Common({ chain: 'goerli' });
    var tx = new Tx(txParams, {"common": common});
	tx.sign(Buffer.from(config.privateKey, 'hex'));
	

    var raw = '0x' + tx.serialize().toString('hex');
	
	await web3.eth.sendSignedTransaction(raw)
		.on('confirmation', (confirmationNumber, receipt) => {res.send('Successfully created the task. Visit the given link to verify the transaction. https://goerli.etherscan.io/tx/' + receipt.transactionHash); })
		.on('receipt', (txReceipt) => {
			console.log("signAndSendTx txReceipt. Tx Address: " + txReceipt.transactionHash);
		})
		.on('error', error => {console.log(error);
		res.send('Transaction failed');
	});   
};





