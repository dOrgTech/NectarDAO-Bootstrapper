const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config(); // Store environment-specific variable from '.env' to process.env

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
        ),
      network_id: 4,
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
        ),
      network_id: 1,
    },
  },
  compilers: {
    solc: {
      version: "0.6.2"
    }
  }
};
