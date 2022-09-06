const { network} = require("hardhat");
const {verify} = require("../utils/verify");




module.exports = async function({getNamedAccounts, deployments}){

    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts()
    const args = []
    const chainId = network.config.chainId
    

    const basicNft = await deploy("BasicNft",{
        from:deployer,
        log:true,
        args:args,
        waitConfirmations:1

    })
    if(chainId == 4 && process.env.ETHERSCAN_API_KEY){
        log("verifying ...")
        await verify(basicNft.address, args)
    }
}

module.exports.tags = ["all","basicNft"];