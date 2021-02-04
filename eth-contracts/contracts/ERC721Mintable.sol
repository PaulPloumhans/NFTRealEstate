pragma solidity >= 0.6.0;

// import 'openzeppelin-solidity/contracts/utils/Address.sol';
// import 'openzeppelin-solidity/contracts/drafts/Counters.sol';
// import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
// import 'openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol';
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/Pausable.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";
//import "./Oraclize.sol";

//contract ERC721MintableComplete is ERC721, Ownable, Pausable, usingOraclize {
contract ERC721MintableComplete is ERC721, Ownable, Pausable {
    //  TODO's: Create CustomERC721Token contract that inherits from the ERC721Metadata contract. You can name this contract as you please
    //  1) Pass in appropriate values for the inherited ERC721Metadata contract
    //      - make the base token uri: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/
    constructor(string memory name_, string memory symbol_) public ERC721(name_, symbol_) {
        _setBaseURI("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/");
    }

    //  TODO's: Create CustomERC721Token contract that inherits from the ERC721Metadata contract. You can name this contract as you please
    //  2) create a public mint() that does the following:
    //      -can only be executed by the contract owner
    //      -takes in a 'to' address, tokenId, and tokenURI as parameters
    //      -returns a true boolean upon completion of the function
    //      -calls the superclass mint and setTokenURI functions
    function mint(address to, uint256 tokenId) public onlyOwner returns (bool) {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenId.toString()); // probably not required
        return true;
    }
}
