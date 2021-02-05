import React, { useState } from "react";

import PortfolioPlain from "./PortfolioPlain.js";
import LoadingContainer from "./LoadingContainer.js";
import drizzleOptions from "../drizzleOptions.js";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
const { DrizzleProvider } = drizzleReactHooks;

function PortfolioHome(props) {
  const [alertMessage, setAlert] = useState(null);
  let drizzle = {};
  if (props.walletConnected) {
    drizzle = new Drizzle(drizzleOptions);
  }
  return props.walletConnected ? (
    <DrizzleProvider drizzle={drizzle}>
      <LoadingContainer
        unsetWallet={() => props.setWalletConnect(false)}
        setAlert={(alert) => setAlert(alert)}
        disconnect={() => props.setWalletConnect(false)}
        page="Portfolio"
      />
    </DrizzleProvider>
  ) : (
      <PortfolioPlain
        connect={() => props.connectWallet()}
        alert={alertMessage}
        setAlert={(alert) => setAlert(alert)}
      />
    );
}

export default PortfolioHome;
