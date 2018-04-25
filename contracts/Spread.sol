pragma solidity ^0.4.2;

// @todo: keep part of the ether on the contracts balance
// @todo: allow to widthdraw balance
// @todo: use contracts as recepients
contract Spread {
    address[] public recepients;
    address owner;
    uint ownBalance = 0;

    constructor() public {
        owner = msg.sender;
    }

    function () public payable {
        require(msg.value >= 1 / 0.1);
        // @todo: define rate when creating the contract
        ownBalance += msg.value / (1 / 0.1);
    }

    function addRecepient(address recepient) public {
        require(msg.sender == owner);
        recepients.push(recepient);
    }

    function getRecepients() public view returns (address[]) {
        return recepients;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getOwnBalance() public view returns (uint) {
        return ownBalance;
    }
}

