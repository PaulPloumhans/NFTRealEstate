# Udacity Blockchain Capstone: Real Estate Marketplace

This is the capstone project for Udacity Blockchain Developer nanodegree program.

It consists of these main elements:
* Using ERC721 tokens (non-fungible) to represent individual real estate assets
* Using zero knowledge *proofs* (ZK-snark) to simulate that only the owner of an asset has the right to link it to an ERC721 token
* Listing the properties (actually their token) on the OpenSea marketplace

# Implementation

Key points:
* The latest version of the open-zeppelin library is used for ERC721 tokens. This guarantees that the tokens are compatible with the latest version of OpenSea.
* The library zokrates is used to implement ZK-snark

# Deployment

## ERC721: contract SolnSquareVerifier

The contract SolnSquareVerifier the ERC721 tokens is deployed on the Rinkeby network at address
`0x7901aB61B36510257E190c688dc2114A819caFcB`
More details are in the file
`eth-contracts/deployment_rinkeby.txt`

## Tokens minted

Ten tokens have been minted. Their name is *OpenSea Real Estate*, with symbol *OSRE*. This was done using the javascript file
`eth-contracts/to-opensea/mint.js`
The transaction hashes for the minting of these tokens are in the file
`eth-contracts/to-opensea/minting_proof.txt`

## Verification with ZK-snark

Each token was minted using a unique *proof* generated with the zokrates library. The code for generating proofs is in
`zokrate/code/square`
The 10 generated proofs (each one used when minting one token) are found in the folder
`eth-contracts/to-opensea/proof_0XX.json`
where *XX* goes from 1 to 10.

## OpenSea storefront

The minted tokens are visible at 
https://testnets.opensea.io/assets/opensea-real-estate

Out of the 10 tokens minted by address *0x5449D74DE77a33D53D768f208142bB9126098228*, five were listed for sale (1 ETH) and were bought by address *0x77724F4C9d4446Fd71847530Fe722871F73500a1*.

# Installation and testing

## Dependencies and version used

The project depends n the following packages:
* openzeppelin-solidity 3.4.0
* truffle-hdwallet-provider 1.0.17
Other tools and versions used are:
* solc 0.6.2
* truffle v5.1.51

## Installation
The required packages can be installed using
`npm install`
from folder
`eth-contracts`

## Testing
Four test files exist in folder
`eth-contracts\test`
They can be run using the command
`truffle test`

# Project Resources

This project used as a star the scaffolding code provided by Udacity at https://github.com/udacity/Blockchain-Capstone.

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
