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
          <div className="eduheader" style={{ textAlign: "center" }}>
            <h1>Education Center</h1>
          </div>

          <div className="buttonrow">
            <a href="javascript:document.getElementById('ethereum').scrollIntoView(true);">
              <Button>Ethereum</Button>
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

            <a href="javascript:document.getElementById('aave').scrollIntoView(true);">
              <Button>AAVE</Button>
            </a>
          </div>
          <h1 classname="scenarioheader" id="ethereum">
            Ethereum
          </h1>
          <div className="selector">Mock Historical</div>

          <h1 classname="scenarioheader" id="dex">
            Decentralized Exchanges
          </h1>
          <div className="selector">Mock Historical</div>

          <h1 classname="scenarioheader" id="uniswap">
            Uniswap
          </h1>
          <div className="selector">Mock Historical</div>

          <h1 classname="scenarioheader" id="sushiswap">
            SushiSwap
          </h1>

          <h1 classname="scenarioheader" id="fees">
            Fees
          </h1>

          <h1 classname="scenarioheader" id="il">
            Impermanent Loss
          </h1>

          <h1 classname="scenarioheader" id="lm">
            Liquidity Mining
          </h1>
          <h1 classname="scenarioheader" id="pe">
            Price Exposure
          </h1>
          <h1 classname="scenarioheader" id="aave">
            AAVE and the Liquid Ether Zap
          </h1>
          <AdminFooter />
        </Container>
      </>
    );
  }
}

export default Scenarios;
