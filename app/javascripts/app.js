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

    });
    setPrice($("#post-price").html());
    setBalance(0.345667);  // should do user's balance here instead of 0.345667
    unlock();
    // check for sufficient balance after unlocking?
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
	this.setStatus("Initiating transaction... (please wait)");
    var self = this;
    var amount = parseFloat($("#amount").html());
    CryptoCheckout.deployed().then(function(instance) {
      return instance.pay({from: account, value: web3.toWei(amount)});
    }).then(function() {
      self.setStatus("Transaction complete!");
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Payment request rejected.",true);
    });
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
  }
});
