# Liquid Yield - https://liquidyield.finance

Project to maximize yields as a liquidity provider by leveraging the Aave Uniswap market to provide 100% exposure to the price of Ethereum

## Frontend

Built using React.js

Can launch local development server from the root directory with the command

```
npm run start
```

To create production build for server deployment, you can create a **build** directory with the command

```
npm run build
```

## Smart Contracts

This project uses the Truffle framework. Contracts and Migrations are located in their respective folders. To compile smart contracts run the command

```
truffle compile
```

The file **truffle-config.js** provides layouts for network deployments. Instructions for deploying to specific networks are below

### Ganache

To start a local Ganache instance and enter the Truffle development terminal run the command

```
truffle develop
```

Note: It's a known issue that Ganache may have trouble running on Node version 14.\*. If the you get errors or a hanging terminal when running the above command you may have to use nvm to switch to an older Node version (12.\* worked for me). Within this terminal you can run `migrate` to deploy contracts to the local Ganache instance.

### Ropsten

To deploy contracts to Ropsten, you'll need an Infura API key and a wallet with Ropsten ETH.

In the root directory, you'll need to make a .env file with:

```
pk="a Web3 wallet private key or mnemonic"
ropsteninfura="your Infura URL with API key"
```

Alternatively you can skip the .env and hardcode these values into truffle-config.js. Once you have your truffle-config.js setup for ropsten deployment you can migrate smart contracts to the network with

```
truffle migrate --network ropsten
```
