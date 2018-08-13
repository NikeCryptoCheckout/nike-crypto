// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import checkout_artifacts from '../../build/contracts/CryptoCheckout.json'

// CryptoCheckout is our usable abstraction, which we'll use through the code below.
var CryptoCheckout = contract(checkout_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
	
	
  start: function() {
    var self = this;
    // Bootstrap the CryptoCheckout abstraction for Use.
    CryptoCheckout.setProvider(web3.currentProvider);
	
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        self.disablePayment("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        self.disablePayment("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accounts[0];
      setBalance(account);

    });
	
    setPrice($("#post-price").html());
  },
  
  disablePayment: function(message) {
	  this.setStatus(message,true);
	  $("#send").prop("disabled",true);
  },

  setStatus: function(message, err=false) {
	  $(".status").html(message);
	  if (err)
	  	$(".status").css("color","red");
		else
			$(".status").css("color","#333");
  },
  
  sendCoin: function() {
	var coin = $(".method-selection select").val(); //to get the string of the dropbox
	var tokenAmt = parseFloat(Math.round(convertToToken(price, usdRate) * 100) / 100).toFixed(2);
	switch(coin){
		//for WTC
		case "WTC":
			let nikeAddress = "0xBc17115BDe6a3f5FE9Bb68c02450F788ED9236d3";
			let tokenAddress = "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07";
			//minimum abi to interact with the erc contract
			let minABI = [ 
				{
					"constant": false,
					"inputs": [
						{
							"name": "_to",
							"type": "address"
						},
						{
							"name": "_value",
							"type": "uint256"
						}
					],
					"name": "transfer",
					"outputs": [
						{
							"name": "",
							"type": "bool"
						}
					],
					"type": "function"
				}
			];
			//get instace and transfer 
			let contract = new web3.eth.Contract(minABI).at(tokenAddress);
			contract.methods.transfer(nikeAddress,tokenAmt).send({from:account}).on('transactionHash', function(hash){
				console.log(hash);
			});
			break;
		default:
			this.setStatus("Initiating transaction... (please wait)");
			setTransactionStatus("loading");
			var self = this;
			//var amount = parseFloat($("#amount").html());
			//var tokenAmt = parseFloat(Math.round(convertToToken(price, usdRate) * 100) / 100).toFixed(2);
			CryptoCheckout.deployed().then(function(instance) {
			return instance.pay({from: account, value: web3.toWei(tokenAmt)});
			}).then(function() {
			//self.setStatus("Transaction complete!");
			setTransactionStatus("complete");
			console.warn("Transaction complete!");
			}).catch(function(e) {
			console.log(e);
			alert(e.message + " Transaction failed.");
			});
			break;


	}
  }
  
  
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source!")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    App.start();
  } else {
	  App.disablePayment("Web3 Provider (MetaMask/Mist/Cypher) required to Complete Checkout.",true);
	  alert("Web3 Provider (MetaMask/Mist/Cypher) required to Complete Checkout.");
  }
});
