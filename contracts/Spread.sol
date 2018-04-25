pragma solidity ^0.4.2;

// @todo: keep part of the ether on the contracts balance
// @todo: allow to widthdraw balance
// @todo: use contracts as recepients
contract Spread {
    address[] public recepients;
    address owner;
    uint comission;

    // @todo: move own balance to a separate contract
    uint ownBalance = 0;

    constructor(uint _comission) public {
        owner = msg.sender;
        comission = _comission;
    }

    function () public payable {
        require(msg.value >= 1 * 100 / comission);
        ownBalance += msg.value * comission / 100;
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

