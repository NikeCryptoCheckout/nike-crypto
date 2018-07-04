<!DOCTYPE html>
<html>
<head>
  <title>NikeCryptoCheckout</title>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
  <link href="css/animate.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>
<body>
	<section id="main">
		<div class="center-all modal-container">
			
			<img class="logo" src="img/nike.png">
			
			<div class="start-modal animated fadeIn">
				<form action="checkout.php" method="post" enctype="application/json">
					<div class="summary">
						<h1>Nike Crypto Checkout Demo</h1>
						Enter an amount in USD to begin the demo.
						<input name="amount" class="start-input form-control" value="200.00" type="number" min="0.01" step="0.01">
					</div>
					<button id="start-btn" type="submit" class="next-btn">
						<div>Checkout</div>
					</button>
				</form>
			</div>
			
			
		</div>
	</section>
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  <script src="./app.js"></script>
</body>
</html>
