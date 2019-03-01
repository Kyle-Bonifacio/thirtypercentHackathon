require('dotenv').config(); // read .env files
const express = require('express');

const app = express();
const port = process.env.PORT || 8888; //assigns port to listen

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Listen for HTTP requests on port 8888
app.listen(port, () => {
  console.log('listening on %d', port);
});

//process.env.USER_ADDRESS1
//process.env.PRIVATE_KEY1
//process.env.PASSWORD1

var nemsdk = require('nem-sdk').default;
var endpoint = nemsdk.model.objects.create("endpoint")(nemsdk.model.nodes.defaultTestnet, nemsdk.model.nodes.defaultPort);
var common = nemsdk.model.objects.create("common")(process.env.PASSWORD1, process.env.PRIVATE_KEY1);
var transferTransaction = nemsdk.model.objects.create("transferTransaction")(process.env.USER_ADDRESS1, 0.5000, 'Hello from the test');
var preparedTransation = nemsdk.model.transactions.prepare("transferTransaction")(common, transferTransaction, nemsdk.model.network.data.testnet.id);

nemsdk.model.transactions.send(common, preparedTransation, endpoint).then(function(res){
	console.log(res);
}, function(err){
	console.log(err);
});