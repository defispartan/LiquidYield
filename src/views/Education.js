/*!

=========================================================
* Liquid Yield - v1.1.0
=========================================================


* Copyright 2020 Andrew Schmidt (https://www.andrew-schmidt.com)
* Licensed under MIT (https://github.com/aschmidt20/liquid-yield/blob/master/LICENSE.md)

* Coded by Andrew Schmidt

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import { Container, Row, Button } from "reactstrap";

import Uniswap from "assets/img/brand/uniswap.png";
import Aave from "assets/img/brand/aave.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Header from "components/Headers/Header.js";
import Web3 from "assets/img/brand/web3.PNG";
import LEZ from "assets/img/brand/LEZ.png";

class Scenarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <div className="infoheader" style={{ textAlign: "center" }}>
            <h1>Education Center</h1>
          </div>

          <div className="buttonrow">
            <a href="javascript:document.getElementById('ethereum').scrollIntoView(true);">
              <Button>Ethereum</Button>
            </a>
            <a href="javascript:document.getElementById('defi').scrollIntoView(true);">
              <Button>DeFi</Button>
            </a>
            <a href="javascript:document.getElementById('dex').scrollIntoView(true);">
              <Button>Decentralized Exchanges</Button>
            </a>

            <a href="javascript:document.getElementById('uniswap').scrollIntoView(true);">
              <Button>Uniswap</Button>
            </a>

            <a href="javascript:document.getElementById('sushiswap').scrollIntoView(true);">
              <Button>SushiSwap</Button>
            </a>

            <a href="javascript:document.getElementById('fees').scrollIntoView(true);">
              <Button>Fees</Button>
            </a>

            <a href="javascript:document.getElementById('il').scrollIntoView(true);">
              <Button>Impermanent Loss</Button>
            </a>

            <a href="javascript:document.getElementById('lm').scrollIntoView(true);">
              <Button>Liquidity Mining</Button>
            </a>

            <a href="javascript:document.getElementById('pe').scrollIntoView(true);">
              <Button>Price Exposure</Button>
            </a>

            <a href="javascript:document.getElementById('apr').scrollIntoView(true);">
              <Button>APR, APY, and ROI</Button>
            </a>

            <a href="javascript:document.getElementById('aave').scrollIntoView(true);">
              <Button>AAVE</Button>
            </a>
          </div>
          <h1 className="infoheader" id="ethereum">
            Ethereum
          </h1>
          <div className="edu">
            <p className="educontent">
              To understand Ethereum we must first take a step back and explore
              it's predecessor, Bitcoin.
            </p>
            <p className="educontent">
              In 2008, Satoshi Nakamoto wrote the Bitcoin whitepaper. The key
              innovation of this white paper is a consensus algorithm which
              secures a global, decentralized ledger of payments. The Bitcoin
              ledger is replicated across all participants which enforces{" "}
              <strong>immutability</strong> in the network. Immutability means
              that transaction on the Bitcoin network are irreversible, and that
              the supply of Bitcoin is not controlled by a single entity. If you
              hold the private key to a wallet cotaining 1 Bitcoin, NO ONE can
              modify the Bitcoin ledger and take your Bitcoin away, and NO
              ENTITY can create new Bitcoins and devalue your holdings outside
              of the 21 million supply cap set forth in the Bitcoin whitepaper.
            </p>
            <p className="educontent">
              Bitcoin is a revolutionary technology, but the underlying network
              serves a single purpose: to facilitate the transaction of Bitcoin.
              Ethereum is an extension of the Bitcoin distributed ledger with an
              infinitely broader scope of potential applications.{" "}
              <strong>
                Ethereum is a blockchain built on the foundation of
                programmability
              </strong>
              . Ethereum can be thought of as a global computer, where the
              current state, and execution of code is shared by all network
              participants. This means that any idea, agreement, or application
              that can be expressed in code can be verifiably executed and
              stored on the Ethereum blockchain. Over the last 5 years,
              developers have been rapidly innovating and turning this vision of
              a building decentralized web on Ethereum into a tangible reality.
            </p>
            <p className="educontent">
              The environment of applications (dApps) built on the blockchain is
              commonly referred to as <strong>Web3</strong>. The features of
              Web3 that make it so revolutionary are:
              <ul>
                <li>Seamless integration of a global payment network</li>
                <li>
                  Permisionless: There is no government or entity which can
                  prevent you from interacting with Web3. Anyone with an
                  internet connection is on a level playing field.
                </li>
                <li>
                  Censorship resistant: Once a dApp is deployed it will exist
                  forever on the blockchain. The same guarantees of immutability
                  discussed with Bitcoin apply to all interactions with Web3.
                </li>
                <li>
                  No Down Time: The decentralized nature of dApps means there is
                  no single point of failure.{" "}
                </li>
              </ul>
            </p>
          </div>
          <img src={Web3} alt="Web3" className="web"></img>
          <h1 className="infoheader" id="defi">
            DeFi (decentralized finance) is a rapidly emerging sector of Web3.
          </h1>
          <div className="edu">
            <div className="educontent"></div>
          </div>
          <h1 className="infoheader" id="dex">
            Decentralized Exchanges
          </h1>
          <div className="selector">Mock Historical</div>

          <h1 className="infoheader" id="uniswap">
            Uniswap
          </h1>
          <div className="selector">Mock Historical</div>

          <h1 className="infoheader" id="sushiswap">
            SushiSwap
          </h1>

          <h1 className="infoheader" id="fees">
            Fees
          </h1>

          <h1 className="infoheader" id="il">
            Impermanent Loss
          </h1>

          <h1 className="infoheader" id="lm">
            Liquidity Mining
          </h1>
          <h1 className="infoheader" id="pe">
            Price Exposure
          </h1>
          <h1 className="infoheader" id="apr">
            APR, APY, and ROI
          </h1>
          <h1 className="infoheader" id="aave">
            AAVE and the Liquid Ether Zap
          </h1>
          <AdminFooter />
        </Container>
      </>
    );
  }
}

export default Scenarios;
