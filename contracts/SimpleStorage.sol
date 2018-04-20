pragma solidity ^0.4.2;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x * 2;
    }

    function get() public constant returns (uint) {
        return storedData;
    }
}

