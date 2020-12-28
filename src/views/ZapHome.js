import React, { useState } from "react";
import ZapPlain from "./ZapPlain.js";
import drizzleOptions from "../drizzleOptions.js";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import LoadingContainer from "./LoadingContainer.js";
const { DrizzleProvider } = drizzleReactHooks;

function ZapHome(props) {
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
        page="Zap"
      />
    </DrizzleProvider>
  ) : (
    <ZapPlain
      connect={() => props.connectWallet()}
      alert={alertMessage}
      setAlert={(alert) => setAlert(alert)}
    />
  );
}

export default ZapHome;
