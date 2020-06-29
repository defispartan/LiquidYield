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

  function connectWallet() {
    const drizzleObject = new Drizzle(drizzleOptions);
    setDrizzle(drizzleObject);
    setWalletConnect(true);
  }

  return walletConnected ? (
    <DrizzleProvider drizzle={drizzle}>
      <LoadingContainer>
        <ZapConnect disconnect={() => setWalletConnect(false)} />{" "}
      </LoadingContainer>
    </DrizzleProvider>
  ) : (
    <ZapPlain connect={() => connectWallet()} />
  );
}

export default ZapHome;
