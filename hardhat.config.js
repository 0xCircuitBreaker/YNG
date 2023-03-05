require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${WALLET_PRIVATE_KEY}`],
      gasPrice: 10000000000, // 10 gwei
    },
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${WALLET_PRIVATE_KEY}`],
      gasPrice: 8000000000, // 8 gwei
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "XBKZV5RKZ4Y44AUEVAQ5TPH5T39D85KTVF"
  },
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
    ],
  },
};
