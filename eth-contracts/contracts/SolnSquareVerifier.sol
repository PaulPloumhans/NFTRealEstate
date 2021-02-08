//pragma solidity >=0.4.21 <0.6.0;
pragma solidity >=0.4.21;

import "./verifier.sol";
import "./ERC721Mintable.sol";

contract SolnSquareVerifier is ERC721MintableComplete {

    // unique solutions - key = keccak256(abi.encodePacked( arguments for Verifier.verifyTx)
    mapping (bytes32 => bool) private _solutions;
    uint private _solutionCnt;

    // Verifier
    Verifier private _contractVerifier;


    event SolutionAdded(uint counter);

    constructor(string memory name_, string memory symbol_, address verifierAddress) public ERC721MintableComplete(name_, symbol_) {
        _contractVerifier = Verifier(verifierAddress);
        _solutionCnt = 0;
    }

    /// @return number of solutions
    function numSolution() public view returns(uint){
        return _solutionCnt;
    }

    // only required to do a test as perthe UDacity requirements
    /// @dev check if (the hash of) a solution is already known, and if not, add it
    /// @return true if a new (previously not present) solution is added, false otherwise
    function addSolution(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
        public
        onlyOwner
        whenNotPaused
        returns(bool)
    {
        // compute hash of proof            
        bytes32 key = keccak256(abi.encodePacked(a,b,c,input));
        
        return _addSolution(key);                              
    }

    /// @dev check if (the hash of) a solution is already known, and if not, add it
    /// @return true if a new (previously not present) solution is added, false otherwise
    function _addSolution(bytes32 key) private returns(bool){
        if(_solutions[key]==false){
            _solutions[key] = true;
            _solutionCnt++;
            emit SolutionAdded(_solutionCnt);
            return true;
        }else{
            return false;
        }                      
    }

    /// @dev mint a new token only if a valid proof, not used previously, is passed (a, b, c, input)
    function mint(
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
        public
        whenNotPaused
        returns(bool)
    {
        // compute hash of proof            
        bytes32 key = keccak256(abi.encodePacked(a,b,c,input));
        // hash of proof cannot be present
        require(_solutions[key] == false);
        // is it a valid solution?
        if(_contractVerifier.verifyTx(a,b,c,input)){
            _addSolution(key);
            return mint(to,tokenId);
        }else{
            return false;
        }         
    }
}


  


























