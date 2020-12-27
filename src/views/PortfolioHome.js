import React, { useState } from "react";

import PortfolioPlain from "./PortfolioPlain.js";
import drizzleOptions from "../drizzleOptions.js";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import LoadingContainer from "./LoadingContainer.js";
const { DrizzleProvider } = drizzleReactHooks;

function PortfolioHome() {
  const [walletConnected, setWalletConnect] = useState(false);
  const [drizzle, setDrizzle] = useState(null);
  const [alertMessage, setAlert] = useState(null);

  function connectWallet() {
    const drizzleObject = new Drizzle(drizzleOptions);
    setDrizzle(drizzleObject);
    setWalletConnect(true);
  }

  return walletConnected ? (
    <DrizzleProvider drizzle={drizzle}>
      <LoadingContainer
        unsetWallet={() => setWalletConnect(false)}
        setAlert={(alert) => setAlert(alert)}
        disconnect={() => setWalletConnect(false)}
        page="Portfolio"
      />
    </DrizzleProvider>
  ) : (
    <PortfolioPlain
      connect={() => connectWallet()}
      alert={alertMessage}
      setAlert={(alert) => setAlert(alert)}
    />
  );
}

export default PortfolioHome;
