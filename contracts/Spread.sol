pragma solidity ^0.4.2;

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
        require(recepients.length > 0);

        uint feeAmount = msg.value * fee / 100;
        feesAddress.transfer(feeAmount);

        spread(msg.value - feeAmount);
    }

    function spread(uint amount) private {
        uint amountPerRecepient = amount / recepients.length;

        for (uint i = 0; i < recepients.length; i++) {
            recepients[i].transfer(amountPerRecepient);
        }
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

