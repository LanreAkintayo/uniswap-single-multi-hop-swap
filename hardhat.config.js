require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  networks:{
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/0J0s7Zvbx_ucnbo7Xipjv05OnD3jWkr4"
      }
    }
  }
};
