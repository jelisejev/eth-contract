var SpreadContract = artifacts.require("./SpreadContract.sol");

module.exports = function(deployer) {
  deployer.deploy(SpreadContract);
};
