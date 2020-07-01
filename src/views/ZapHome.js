import React, { useState } from "react";
import ZapConnect from "./ZapConnect.js";
import ZapPlain from "./ZapPlain.js";
import drizzleOptions from "../drizzleOptions.js";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import LoadingContainer from "./LoadingContainer.js";
const { DrizzleProvider } = drizzleReactHooks;

function ZapHome() {
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
      />
    </DrizzleProvider>
  ) : (
    <ZapPlain
      connect={() => connectWallet()}
      alert={alertMessage}
      setAlert={(alert) => setAlert(alert)}
    />
  );
}

export default ZapHome;
