<?php 
if(!isset($_POST['amount']) && !isset($_GET['amount']))
{
    header('location:index.php');
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>NikeCryptoCheckout</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
  <link href="css/animate.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>
<body>
	<div id="post-price" style="display:none">
		<?php
		if(isset($_POST['amount'])){
			echo($_POST['amount']);
		} else {
			echo($_GET['amount']);
		}
		?>
	</div>
	<section id="main">
		<div class="center-all modal-container">
			<img class="logo" src="img/nike.png">
			<div class="chk-modal animated fadeIn">
				<div class="hero-header">
					<div class="center-all">
					<h3>Total</h3>
					<h1 id="price-usd"></h1>
					<h3 id="price-crypto">0.22 ETH</h3>
					</div>
				</div>
				<div class="method-selection">
					Pay With:
					<select>
				    <option value="ETH">ETH</option>
				    <option value="BTC">BTC</option>
				    <option value="LTC">LTC</option>
				  </select>
				</div>
				<div class="summary">
					<h1>Transaction Summary</h1>
					<div class="row summary-row">
						<div class="col-6 key">Your Balance</div>
						<div id="balance" class="col-6 value">0.78 ETH</div> <!-- add 'error' to class on insufficient funds -->
						<div class="col-6 key">Subtotal</div>
						<div id="subtotal" class="col-6 value">0.22 ETH</div>
						<div class="col-4 key key-big">Grand Total</div>
						<div id="total" class="col-8 value value-big">0.22 ETH</div> <!-- add 'error' to class on insufficient funds -->
					</div>
					<p id="error-msg" class="error"></p> <!-- print error here -->
					
				</div>
				<button id="pay-btn" class="next-btn">
					<div class="btn-inner">
						<span id="btn-default">Complete</span>
						<div id="btn-loading" class="hidden spinner"></div>
						<i id="btn-complete" class="fas fa-check animated pulse hidden"></i>
					</div>
				</button>
				<div id="lockscreen" class="disabled"> <!-- add display:none when web3js found -->
					<div class="center-all">
						<i id="lock-icon" class="fas fa-lock animated infinite pulse"></i>
						<p class="disabled-status">Connecting to Wallet</p>
					</div>
				</div>
				<div id="thankyou" class="disabled hidden"> <!-- add display:none when web3js found -->
					<div class="center-all">
						<i id="lock-icon" class="fas fa-check-circle"></i>
						<p class="disabled-status">Thank you! Your order has been received. Click <a href="index.php">here</a> to restart the demo.</p>
					</div>
				</div>
			</div>
			
		</div>
	</section>
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  <script src="https://rawgit.com/mzabriskie/axios/master/dist/axios.min.js"></script>
  <script src="https://rawgit.com/coinapi/coinapi-sdk/master/javascript-rest/coinapi_v1.js"></script>
  <script src="./app.js"></script>
  <script src="js/checkout.js"></script>
</body>
</html>

