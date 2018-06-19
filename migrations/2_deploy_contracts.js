var CryptoCheckout = artifacts.require("./CryptoCheckout.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptoCheckout);
};
