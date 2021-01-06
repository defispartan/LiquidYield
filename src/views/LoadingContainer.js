import React from "react";

import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Spinner } from "reactstrap";
import ZapConnect from "./ZapConnect.js";
import PortfolioConnect from "./PortfolioConnect.js";
const { useDrizzleState } = drizzleReactHooks;
const networkMap = {
  1: "Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Goerli",
  42: "Kovan",
};

function LoadingContainer({ unsetWallet, setAlert, disconnect, page }) {
  const drizzleStatus = useDrizzleState((state) => state.drizzleStatus);
  const drizzleState = useDrizzleState((state) => state);
  const networkId = drizzleState.web3.networkId;
  if (
    drizzleState.web3.status === "initialized" &&
    networkId !== 3 &&
    networkId !== 1
  ) {
    unsetWallet();
    if (networkId === undefined) {
      setAlert(
        "No Web3 wallet detected in your browser. To use this feature you'll need the Ethereum broswer wallet like MetaMask."
      );
    } else if (networkMap[networkId] !== undefined) {
      setAlert(
        "Web3 wallet is connected to an unsupported network: " +
          networkMap[networkId] +
          ". Currently Ropsten and Mainnet are the only supported Ethereum networks. Please change network and try again."
      );
    } else {
      setAlert(
        "Web3 wallet is connected to an unknown network. Current Ropsten and mainnet are the only supported Ethereum networks. Please change network and try again"
      );
    }
  }
  if (drizzleStatus.initialized === false) {
    return (
      <div className="spinny">
        <Spinner style={{ width: "3em", height: "3em" }} color="primary" />
      </div>
    );
  } else if (page === "Portfolio") {
    return <PortfolioConnect disconnect={() => disconnect()} />;
  } else if (page === "Zap") {
    return <ZapConnect disconnect={() => disconnect()} />;
  }
}

export default LoadingContainer;
