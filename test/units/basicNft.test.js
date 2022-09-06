const { assert } = require("chai");
const { network, ethers, deployments } = require("hardhat");

network.config.chainId != 31337? describe.skip : describe("basicNft", ()=>{

    let accounts,deployer,basicNft;
    beforeEach(async()=>{
        await deployments.fixture(["basicNft"])
        accounts = await ethers.getSigners() 
        deployer = accounts[0]
        basicNft = await ethers.getContract("BasicNft", deployer)
        
    })

    describe("Constructor", ()=>{

        it("should set counter to 0" ,async()=>{
            let tokenCounter = await basicNft.getTokenCounter()
            assert.equal(tokenCounter,"0")
        })
        it("should set the name and description of nft right" ,async()=>{
            // checking the ERC712 constuctor input 
            // see ERC712 on eip.ethereum.org 
            let name = await basicNft.name()
            let symbol = await basicNft.symbol()
            assert.equal(name,"Kumpel")
            assert.equal(symbol,"DOG")
        })
    })
    describe("Mint Fnctionality ", ()=>{
        // so here we want to  call mint fct and check if the TokenCounter is incemented
        // i'll call it 2 times .. final result shold be counter = 2 
        it("increments the tokenCounter after mint fct call", async()=>{
            await basicNft.mintNft()
            updatedTokenCounter = await basicNft.getTokenCounter() 
            assert.equal(updatedTokenCounter,"1")
            await basicNft.mintNft()
            updatedTokenCounter = await basicNft.getTokenCounter()
            assert.equal(updatedTokenCounter,"2")
        })
        it("should make TokenURI available",async()=>{
            assert.equal(await basicNft.tokenURI(0),await basicNft.tokenURI(1))
        })
    })
})