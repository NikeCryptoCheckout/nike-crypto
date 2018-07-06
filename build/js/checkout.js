var token = "ETH";
var price = 0;
var balance = 0;
var accounts;
var account;

///////////////// Start ///////////////

$(document).ready(function() {

});

///////////////// Public Interface ///////////////

function unlock() {
	$( "#lock-icon" ).removeClass("fa-lock");
	$( "#lock-icon" ).addClass("fa-unlock");
	$( "#lock-icon" ).removeClass("pulse");
	$( "#lock-icon" ).addClass("tada");
	setTimeout(function() {
		$( "#lockscreen" ).addClass("animated");
		$( "#lockscreen" ).addClass("slideOutUp");
	}, 500);
}

function setInsufficientFunds(insufficient) {
	$( "#balance" ).removeClass("error");
		$( "#total" ).removeClass("error");
	if (insufficient) {
		$( "#balance" ).addClass("error");
		$( "#total" ).addClass("error");
		setError("Oops! Look's like you don't have enough tokens to complete the transaction!");
	} else {
		setError("");
	}
}

function setError(error) {
	$( "#error-msg" ).html(error);
}

function setPrice(usd) {
	price = usd;
	var usdFormatted = parseFloat(Math.round(price * 100) / 100).toFixed(2);
	$( "#price-usd" ).html("$"+usdFormatted);
	var tokenFormatted = parseFloat(Math.round(convertToToken(price) * 100) / 100).toFixed(2);
	$( "#price-crypto" ).html(tokenFormatted+" " +token);
	$( "#subtotal" ).html(tokenFormatted+" " +token);
	$( "#total" ).html(tokenFormatted+" " +token);
}

function setToken(symbol) {
	token = symbol;
}

function setBalance(bal) {
	balance = bal;
	var tokenFormatted = parseFloat(Math.round(balance * 100) / 100).toFixed(2);
	$( "#balance" ).html(tokenFormatted+" " +token);
}

///////////////// Helpers ///////////////

function convertToToken(usd) {
	return usd / 450;
}

function sendCoin() {
        this.setStatus("Initiating transaction... (please wait)");
        var self = this;
        var amount = 
}

$( "select" ).focus(function() {
  $(".method-selection").css("background-color","#ddd");
});
$( "select" ).blur(function() {
  $(".method-selection").css("background-color","#eee");
});
$( "select" ).change(function() {
  $(".method-selection").css("background-color","#eee");
  $( "select" ).blur();
});
$( "#pay-btn" ).click(function() {
  App.sendCoin();

});
