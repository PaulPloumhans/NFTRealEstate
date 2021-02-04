// migrating the appropriate contracts
var SquareVerifier = artifacts.require("Verifier");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var ERC721Mintable = artifacts.require("ERC721MintableComplete");

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
  //deployer.deploy(SolnSquareVerifier);
  deployer.deploy(ERC721Mintable, "OpenSea Real Estate", "OSRE");
};
