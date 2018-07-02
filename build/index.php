<!DOCTYPE HTML>
<html>
	<head>
		<title>Landing</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
		<link href="css/app.css" rel="stylesheet">
	</head>
	
	<body>
		<section id="landing">
			<div class="container">
				<h2>Payment Amount</h2>
				<p>Enter the amount and select the currency for the item price, then click Pay to proceed to Crypto Checkout.</p>
				<form action="checkout.php" method="post" enctype="application/json">
					<input class="form-control" name="amount" required="" type="text" placeholder="Enter amount" size="8"/>
					<select class="form-control" name="currency">
						<option value="USD">US Dollars</option>
						<!--
<option value="JPY">Japanese Yen</option>
						<option value="KRW">Korean Won</option>
						<option value="BRL">Brazilian Real</option>
						<option value="AUD">Australian Dollar</option>
-->
					</select>
					<button class="btn btn-primary" type="submit" style="width:100%">Proceed To Checkout</button>
				</form>
			</div>
		</section>
	
	 <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
	</body>
</html>