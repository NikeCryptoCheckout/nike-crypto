var token = "ETH";
var price = 0;
var balance = 0;
var tokenPrice = 0;
var usdRate = 0;

var SDK = typeof window !== 'undefined' ? window.COIN_API_SDK : require("./coinapi_v1")["default"]
var sdk = new SDK("E0E2D48D-7A91-4E75-A2DD-3BCE376711AA")
//var sdk = new SDK("CC07C5FD-240C-4A4E-A58A-C7D5FD2D4619")


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
	setInsufficientFunds(false);
    
    setPrice(document.getElementById("post-price").innerHTML);
}

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
			tokenPrice = Number(tokenFormatted);
        })
        .then(() => {
			if(isInsufficient()) {
				setInsufficientFunds(true);
				document.getElementById("pay-btn").disabled = true;
				
			} else {
				setInsufficientFunds(false);
				document.getElementById("pay-btn").disabled = false;
			}
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

    if (token == "ETH")
    {
        web3.eth.getBalance(account, function (error, result) {
            if (error) {
                console.error(error);
            } else {
                balance = Number(web3.fromWei(result));
                var tokenFormatted = parseFloat(Math.round(balance * 100) / 100).toFixed(2);
                $("#balance").html(tokenFormatted + " " + token);
            }
        });

		 return;
    }

    var contractAddress = "";

    // Add new tokens here
    switch (token) {
        case "BNB":
            contractAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"; // BOKKY test token address
            break;
        default:
            $("#balance").html("Balance Unavailable.");
    }

    var tokenContract = web3.eth.contract(minABI).at(contractAddress);

    tokenContract.balanceOf(account, function (error, result) {
        if (!error) {
            balance = Number(web3.fromWei(result));
            var tokenFormatted = parseFloat(Math.round(balance * 100) / 100).toFixed(2);
            $("#balance").html(tokenFormatted + " " + token);
        } else {
            console.error(error);
        }
    });
}

function isInsufficient() {
	if(balance < tokenPrice) {
		return true;
	}
	return false;
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
