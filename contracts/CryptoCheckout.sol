pragma solidity ^0.4.17;

import "./Ownable.sol";

contract CryptoCheckout is Ownable {
        // Handled by inheriting from Ownable.
	//address public owner;

	constructor() public {
                // Handled by inheriting from Ownable.
		//owner = msg.sender;
	}

	function pay() payable public returns(bool sufficient) {
		owner.transfer(msg.value);
                return true;
        }

}
