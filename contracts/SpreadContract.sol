pragma solidity ^0.4.2;

// @todo: keep part of the ether on the contracts balance
// @todo: allow to widthdraw balance
contract SpreadContract {
    address[] public recepients;
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function addRecepient(address recepient) public {
        recepients.push(recepient);
    }

    function getRecepients() public view returns (address[]) {
        return recepients;
    }
}

