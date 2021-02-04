const { ok } = require('assert');
const assert = require('assert');

var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    describe('match erc721 spec', function () {
        const nToken = 5;
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new("OpenSea Real Estate", "OSRE", {from: accountOne});
            for(let i=0; i<nToken; i++)
                await this.contract.mint(accountOne, i);
        })

        it('should return total supply', async function () { 
            let ok = true;
            let totalSupply = 0;
            const expectedTotalSupply = nToken;
            try{
                totalSupply = await this.contract.totalSupply.call();
            }
            catch{
                ok = false
            }
            assert.equal(ok, true, "Error during call to totalSupply");
            if(ok===true){
                assert.equal(totalSupply, expectedTotalSupply, `totalSupply of tokens should be ${expectedTotalSupply} not ${totalSupply}.`);
            }

        })

        it('should get token balance', async function () { 
            let ok = true;
            let balanceOne = 0, balanceTwo = 0;
            const expectedBalanceOne = nToken, expectedBalanceTwo = 0;
            try{
                balanceOne = await this.contract.balanceOf.call(accountOne);
                balanceTwo = await this.contract.balanceOf.call(accountTwo);                
            }
            catch{
                ok = false
            }
            assert.equal(ok, true, "Error during call to balanceOf");
            if(ok===true){
                assert.equal(balanceOne.eq(web3.utils.toBN(expectedBalanceOne)), true, `balanceOf(${accountOne}) should be ${expectedBalanceOne} not ${balanceOne.toString()}.`);
                assert.equal(balanceTwo.eq(web3.utils.toBN(expectedBalanceTwo)), true, `balanceOf(${accountTwo}) should be ${expectedBalanceTwo} not ${balanceTwo.toString()}.`);
            }            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let ok = true;            
            let tokenURIThree = "";
            const expectedTokenURIThree = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3";
            try{
                tokenURIThree = await this.contract.tokenURI.call(3);                
            }
            catch{
                ok = false;
            }
            assert.equal(ok, true, "Error during call to tokenURI");
            if(ok===true){
                assert.equal(tokenURIThree.localeCompare(expectedTokenURIThree), 0, `tokenURI should be ${expectedTokenURIThree} not ${tokenURIThree}.`);
            }
        })

        it('should transfer token from one owner to another', async function () { 
            // transfer first token from accountOne to accountTwo
            let ok = true;           
            const tokenId = nToken-1;
            const oldOwnerToken = await this.contract.ownerOf.call(tokenId);
            let newOwnerToken = "";
            
            assert.equal(oldOwnerToken, web3.utils.toChecksumAddress(accountOne),
                `The owner of token with tokenId ${tokenId} should be ${web3.utils.toChecksumAddress(accountOne)} not ${oldOwnerToken}.`);
            
            try{
                await this.contract.transferFrom(accountOne, accountTwo, tokenId);                
                newOwnerToken = await this.contract.ownerOf.call(tokenId);
            }
            catch{
                ok = false;
            }
            assert.equal(ok, true, "Error during call to transferFrom");

            if(ok===true){
                assert.equal(newOwnerToken, web3.utils.toChecksumAddress(accountTwo),
                    `The owner of token with tokenId ${tokenId} should be ${web3.utils.toChecksumAddress(accountTwo)} not ${newOwnerToken}.`);                
            }
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new("OpenSea Real Estate", "OSRE", {from: accountOne});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let ok = true;

            try{
                await this.contract.mint(accountTwo, i, {from: accountTwo});
            }
            catch(e){
                ok = false;
            }
            assert.equal(ok, false, `It should not be possible to mint from ${accountTwo} since the contract owner is ${accountOne}.`);
        })

        it('should return contract owner', async function () { 
            let ok = true;
            const expectedOwner = accountOne;
            let owner = "";
            try{
                owner = await this.contract.owner.call();
            }
            catch(e){
                ok = false;
            }
            assert.equal(ok, true, `Error during call to owner.`);
            if(ok==true){
                assert.equal(owner, expectedOwner, `Contract owner should be ${expectedOwner} not ${owner}.`);
            }
        })

    });
})