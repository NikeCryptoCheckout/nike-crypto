pragma solidity ^0.4.17;

contract MetaCoin {
	address public owner;

	constructor() public {
		owner = msg.sender;
	}
	
	function pay() payable public returns(bool sufficient) {
		owner.transfer(msg.value);
        return true;
    }
}
