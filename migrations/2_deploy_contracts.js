var Spread = artifacts.require("./Spread.sol");

module.exports = function(deployer) {
  deployer.deploy(Spread, 10, '0x5c937978f2FaBF0C08A1fD8BdD2155c938d78061');
};
