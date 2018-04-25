pragma solidity ^0.4.2;

// @todo: keep part of the ether on the contracts balance
// @todo: allow to widthdraw balance
// @todo: use contracts as recepients
contract Spread {
    address[] public recepients;
    address owner;
    uint fee;
    address feesAddress;

    constructor(uint _fee, address _feesAddress) public {
        owner = msg.sender;
        fee = _fee;
        feesAddress = _feesAddress;
    }

    function () public payable {
        require(msg.value >= 1 * 100 / fee);

        uint feeAmount = msg.value * fee / 100;
        feesAddress.transfer(feeAmount);
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
}

