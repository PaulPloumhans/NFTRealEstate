const { ok } = require('assert');
const assert = require('assert');
const fs = require('fs');

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var SquareVerifier = artifacts.require('Verifier');

contract('SolnSquareVerifier', accounts => {

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    describe('test addition of solutions', async function () {

        // proof computed earlier with zokrates
        let proof = JSON.parse(fs.readFileSync(__dirname+'/proof.json'));        
        
        before(async function () {
            this.verifier = await SquareVerifier.new();
            this.contract = await SolnSquareVerifier.new("OpenSea Real Estate", "OSRE", this.verifier.address);
        });       

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should add a new solution', async function () { 
            let ok = true;            
            const numSolutionBefore = (await this.contract.numSolution.call()).toNumber();
            const expectedNumSolutionAfter = numSolutionBefore+1;
            let numSolutionAfter = numSolutionBefore;

            assert.equal(numSolutionBefore,0,`There should be no valid solution at the beginning of the test, but instead there are ${numSolutionBefore}`);

            try{
                await this.contract.addSolution(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
                numSolutionAfter = (await this.contract.numSolution.call()).toNumber();
            }
            catch{
                ok = false;
            }

            assert.equal(ok, true, "Error during call to addSolution");
            if(ok===true){                
                assert.equal(numSolutionAfter, expectedNumSolutionAfter, `There should be ${expectedNumSolutionAfter} valid solution instead of ${numSolutionAfter}`);
            }
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should not let add the same solution a second time', async function () { 
            let ok = true;
            const numSolutionBefore = (await this.contract.numSolution.call()).toNumber();
            let numSolutionAfter = 0;

            assert.equal(numSolutionBefore,1,`There should be one valid solution at the beginning of the test, but instead there are ${numSolutionBefore}`);

            try{
                await this.contract.addSolution(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
                numSolutionAfter = (await this.contract.numSolution.call()).toNumber();
            }
            catch{
                ok = false
            }
            assert.equal(ok, true, "Error during call to addSolution");
            if(ok===true){
                assert.equal(numSolutionAfter, numSolutionBefore, 'There should be no change in the number of valide solutions');
            }
        })
    });


    describe('test minting of ERC721 token with solution verifier', async function () {

        // proof computed earlier with zokrates
        let proof = JSON.parse(fs.readFileSync(__dirname+'/proof.json'));
        
        before(async function () {
            this.verifier = await SquareVerifier.new();
            this.contract = await SolnSquareVerifier.new("OpenSea Real Estate", "OSRE", this.verifier.address);
        });

        // Test if an ERC721 token can be minted if a correct solution is passed for the first time
        it('should mint one token', async function () { 
            let ok = true;
            const totalSupplyBefore = (await this.contract.totalSupply.call()).toNumber();
            let totalSupplyAfter = 0;

            try{
                await this.contract.mint(accountOne, 0, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);                
                totalSupplyAfter =  (await this.contract.totalSupply.call()).toNumber();
            }
            catch{
                ok = false
            }
            assert.equal(ok, true, "Error when minting token");
            if(ok===true){
                assert.equal(totalSupplyAfter, totalSupplyBefore+1, `There should be ${totalSupplyBefore+1} tokens in total supply instead of ${totalSupplyBefore}.`);
            }       
        });

        // Test if an ERC721 token cannot be minted if a correct solution is passed for the second time
        it('should mint one token', async function () { 
            let ok = true;
            
            try{
                await this.contract.mint(accountOne, 0, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);                
            }
            catch{
                ok = false
            }
            assert.equal(ok, false, "Should not be able to mint a new token with a solution previously used");                   
        });

        
    });

    
});