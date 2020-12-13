require("dotenv").config();

const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const PK = process.env.pk;
const ropsteninfura = process.env.ropsteninfura;
const mainnetinfura = process.env.mainnetinfura;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "./src/contracts"),
  networks: {
    develop: {
      // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(PK, ropsteninfura);
      },
      network_id: 3,
    },
    mainnet: {
      provider: function () {
        return new HDWalletProvider(PK, mainnetinfura);
      },
      network_id: 1,
      gasPrice: 27000000000, //27 gwei
    },
  },
};
