const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

describe("Swapping", function () {
    let swapping;
    let accounts
    let weth;
    let dai;

    before(async function(){
        accounts = await ethers.getSigners();
        weth = await ethers.getContractAt("IWETH", WETH9)
        dai = await ethers.getContractAt("IERC20", DAI)

        const Swapping = await ethers.getContractFactory("Swapping");
        swapping = await Swapping.deploy();

        await swapping.deployed();

    })

    // it("SwapsExactInputSingle", async function(){
    //     console.log("Before swap, DAI Balance: ", await dai.balanceOf(accounts[0].address))

    //     const amountIn = 10n ** 18n

    //     await weth.connect(accounts[0]).deposit({value: amountIn});
    //     await weth.connect(accounts[0]).approve(swapping.address, amountIn)

    //     const amountOut = await swapping.connect(accounts[0]).swapExactInputSingle(amountIn)

    //     console.log("After Swap, DAI Balance: ", await dai.balanceOf(accounts[0].address))
        
    // })

    // it("SwapsExactOutputSingle", async function(){
    //     console.log("Before swap, DAI Balance: ", await dai.balanceOf(accounts[0].address))

    //     // swapExactOutputSingle(uint256 amountOut, uint256 amountInMaximum) 
    //     const amountInMaximum = 10n ** 18n
    //     const amountOut = 100n * 10n ** 18n

    //     await weth.connect(accounts[0]).deposit({value: amountInMaximum});
    //     await weth.connect(accounts[0]).approve(swapping.address, amountInMaximum)

    //     const amountIn = await swapping.connect(accounts[0]).swapExactOutputSingle(amountOut, amountInMaximum)

    //     console.log("Amount needed to swap 100 DAI: ", amountIn.data.toString())

    //     console.log("After Swap, DAI Balance: ", await dai.balanceOf(accounts[0].address))
        
    // })


    it("SwapsExactInputMultiHop", async function(){
        console.log(" [Multihop Swap] Before swap, DAI Balance: ", await dai.balanceOf(accounts[0].address))

        const amountIn = 10n ** 18n

        await weth.connect(accounts[0]).deposit({value: amountIn});
        await weth.connect(accounts[0]).approve(swapping.address, amountIn)

        const amountOut = await swapping.connect(accounts[0]).swapExactInputMultihop(amountIn)

        console.log(" [Multihop Swap] After Swap, DAI Balance: ", await dai.balanceOf(accounts[0].address))
        
    })

    it("SwapsExactOutputMultiHop", async function(){
        console.log("Before swap, DAI Balance: ", await dai.balanceOf(accounts[0].address))

        // swapExactOutputSingle(uint256 amountOut, uint256 amountInMaximum) 
        const amountInMaximum = 10n ** 18n
        const amountOut = 100n * 10n ** 18n

        await weth.connect(accounts[0]).deposit({value: amountInMaximum});
        await weth.connect(accounts[0]).approve(swapping.address, amountInMaximum)

        const amountIn = await swapping.connect(accounts[0]).swapExactOutputMultihop(amountOut, amountInMaximum)

        console.log("[Multihop Swap] Amount needed to swap 100 DAI in : ", amountIn.data.toString())

        console.log("After Swap, DAI Balance: ", await dai.balanceOf(accounts[0].address))
        
    })

});
