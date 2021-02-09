// Test that all proofs (Zokrates) are valid before deploying to Rinkeby

// Test verification with correct proof
// - use the contents from proof_%03d.json generated from zokrates steps

    
// Test verification with incorrect proof

const assert = require('assert');
const fs = require('fs');

var SquareVerifier = artifacts.require('Verifier');

contract('TestSquareVerifier', accounts => {

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    describe('test zokrates', function () {
                
        beforeEach(async function () { 
            this.contract = await SquareVerifier.new();
        })

        for(let i =1; i<=10 ; i++){            
            
            it(`should validate transaction if the correct proof is used (file ${i})`, async function () { 

                // read proof
                const suffix = ('000'+i).slice(-3);
                const fileName = 'proof_'+suffix+'.json';
                console.log('Using proof file', fileName);
                const proof = JSON.parse(fs.readFileSync(__dirname+'/'+fileName));

                let ok = true;
                let isValidProof = false;
                
                try{
                    isValidProof = await this.contract.verifyTx(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
                }
                catch{
                    ok = false;
                }
                assert.equal(ok, true, "Error during call to verifyTx");
                if(ok===true){
                    assert.equal(isValidProof, true, `verifyTx should validate the proof.`);
                }
    
            });

        }       

    });
});