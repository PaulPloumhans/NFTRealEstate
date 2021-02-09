const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require('fs');
const MNEMONIC = fs.readFileSync(__dirname+"/../.secret").toString().trim();
const web3 = require("web3");
const NODE_API_KEY = "1513bf39502d4f39b26dde0541e7d281"
const isInfura = true;
const NFT_CONTRACT_ADDRESS = "0x7901aB61B36510257E190c688dc2114A819caFcB";
const OWNER_ADDRESS = "0x5449D74DE77a33D53D768f208142bB9126098228";
const NETWORK = "rinkeby";
const NUM_TOKENS = 10;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const NFT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[2]",
        "name": "a",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[2][2]",
        "name": "b",
        "type": "uint256[2][2]"
      },
      {
        "internalType": "uint256[2]",
        "name": "c",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[2]",
        "name": "input",
        "type": "uint256[2]"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// const NFT_ABI = [
//   {
//     constant: false,
//     inputs: [
//       {
//         name: "_to",
//         type: "address",
//       },
//     ],
//     name: "mintTo",
//     outputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];


async function main() {
  const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
  const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );
  const web3Instance = new web3(provider);

  if (NFT_CONTRACT_ADDRESS) {
    let nftContract = null;
    try{
      nftContract = new web3Instance.eth.Contract(
        NFT_ABI,
        NFT_CONTRACT_ADDRESS,
        { gasLimit: "1000000" }
      );
    }
    catch(e){
      console.log('Could not create contract.')
    }
    

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_TOKENS; i++) {
      // read proof
      let suffix = ('000'+(i+1)).slice(-3);
      let fileName = 'proof_'+suffix+'.json';
      console.log('Using proof file ', fileName);
      let proof = JSON.parse(fs.readFileSync(__dirname+'/'+fileName));
      const result = await nftContract.methods
        .mint(OWNER_ADDRESS, i, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted token. Transaction: " + result.transactionHash);
    }
    delete nftContract;
  } else {
    console.error(
      "Define NFT_CONTRACT_ADDRESS."
    );
  }
  provider.engine.stop();
  return;
}

main();
