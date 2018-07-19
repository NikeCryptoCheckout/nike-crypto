var token = "ETH";
var price = 0;
var balance = 0;
var usdRate = 0;

var SDK = typeof window !== 'undefined' ? window.COIN_API_SDK : require("./coinapi_v1")["default"]
var sdk = new SDK("E0E2D48D-7A91-4E75-A2DD-3BCE376711AA")

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
        var t = new Date();
        price = usd;

        sdk.exchange_rates_get_specific_rate(token, "USD", t)
        .then((Exchange_rates_get_specific_rate) => {
            usdRate = Number(Exchange_rates_get_specific_rate["rate"]);
        })
        .then(() => {
            var usdFormatted = parseFloat(Math.round(price * 100) / 100).toFixed(2);
            $( "#price-usd" ).html("$"+usdFormatted);
            var tokenFormatted = parseFloat(Math.round(convertToToken(price, usdRate) * 100) / 100).toFixed(2);
            $( "#price-crypto" ).html(tokenFormatted+" " +token);
            $( "#subtotal" ).html(tokenFormatted+" " +token);
            $( "#total" ).html(tokenFormatted+" " +token);
        })
        .then(() => {
            unlock();
        })
        .catch((err) => {
            console.log('get rate failed')
        });
}

function setToken(symbol) {
	token = symbol;
}

function setBalance(account) {
        web3.eth.getBalance(account, function(error, result) {
            if (error) {
                console.error(error);
            } else {
                balance = Number(web3.fromWei(result));
                //console.log('account bal: ' + balance);
                var tokenFormatted = parseFloat(Math.round(balance * 100) / 100).toFixed(2);
                $( "#balance" ).html(tokenFormatted+" " +token);
            }
        });
}

function setTransactionStatus(status) {
	$("#btn-default").addClass("hidden");
	$("#btn-loading").addClass("hidden");
	$("#btn-complete").addClass("hidden");
	$("#btn-"+status).removeClass("hidden");
	
	if (status == "complete") {
		$("#thankyou").removeClass("hidden");
		$("#thankyou").addClass("animated");
		$("#thankyou").addClass("slideInUp");
	}
}

///////////////// Helpers ///////////////

function convertToToken(usd, usdRate) {
        return Number(usd) / Number(usdRate) ;
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
