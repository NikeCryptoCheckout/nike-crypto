var token = "ETH";
function typeUpdate() {
    var a = document.getElementById("cointType")
    token = a.options[a.selectedIndex].innerHTML;

    web3.eth.getAccounts(function (err, accs) {
        accounts = accs;
        account = accounts[0];
        setBalance(account);
    });
    
    document.getElementById("price-crypto").innerHTML = "updating";    
    document.getElementById("subtotal").innerHTML = "updating";
    document.getElementById("total").innerHTML = "updating";
    
    setPrice(document.getElementById("post-price").innerHTML);  
}
var price = 0;
var balance = 0;
var usdRate = 0;

var SDK = typeof window !== 'undefined' ? window.COIN_API_SDK : require("./coinapi_v1")["default"]
var sdk = new SDK("E0E2D48D-7A91-4E75-A2DD-3BCE376711AA")
//var sdk = new SDK("CC07C5FD-240C-4A4E-A58A-C7D5FD2D4619")

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
    var minABI = [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "type": "function"
        }
    ];

    switch (token) {
        case "ETH":
            web3.eth.getBalance(account, function (error, result) {
                if (error) {
                    console.error(error);
                } else {
                    balance = Number(web3.fromWei(result));
                    var tokenFormatted = parseFloat(Math.round(balance * 100) / 100).toFixed(2);
                    $("#balance").html(tokenFormatted + " " + token);
                }
            });
            break;
        case "BTC": // Could not test yet
            //let tokenAddress = "0x13f8aa62bac4ae95282faad074a5726e3ff40b52";
            //let contract = new web3.eth.Contract(minABI).at(tokenAddress);
            //let tokenBalance = contract.methods.balanceOf(account);
            //$("#balance").html(tokenBalance + " " + token);
            //break;
        default:
            $("#balance").html("Balance Unavailable.");
    }
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
