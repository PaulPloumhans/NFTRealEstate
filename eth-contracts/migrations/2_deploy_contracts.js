// migrating the appropriate contracts
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function(deployer) {
  // use promise to avoid race condition
  deployer.deploy(SquareVerifier).then( () => {
    return deployer.deploy(SolnSquareVerifier, "OpenSea Real Estate", "OSRE", SquareVerifier.address);
  })
};
