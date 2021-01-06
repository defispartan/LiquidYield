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
import { Container, Row } from "reactstrap";

import Uniswap from "assets/img/brand/uniswap.png";
import Aave from "assets/img/brand/aave.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Header from "components/Headers/Header.js";
import TheGraph from "assets/img/brand/thegraph.png";
import Zapper from "assets/img/brand/zapper.png";
import SushiSwap from "assets/img/brand/sushiswaplogo.png";
import DeFiPedia from "assets/img/brand/defipedia.png";

class About extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col" style={{ textAlign: "center" }}>
              <h1>Powered By</h1>
              <Row>
                <div
                  className="powerleft"
                  style={{ backgroundImage: `url(${Uniswap})` }}
                >
                  <a
                    href="https://uniswap.exchange"
                    style={{ display: "block", width: "100%", height: "100%" }}
                  >
                    {" "}
                  </a>
                </div>
                <div
                  className="powerright"
                  style={{
                    backgroundImage: `url(${SushiSwap})`,
                  }}
                >
                  <a
                    href="https://sushiswap.fi/"
                    style={{ display: "block", width: "100%", height: "100%" }}
                  >
                    {" "}
                  </a>
                </div>
              </Row>
              <Row>
                <div
                  className="powerleft"
                  style={{ backgroundImage: `url(${TheGraph})` }}
                >
                  <a
                    href="https://thegraph.com/"
                    style={{ display: "block", width: "100%", height: "100%" }}
                  >
                    {" "}
                  </a>
                </div>
                <div
                  className="powerright"
                  style={{ backgroundImage: `url(${Zapper})` }}
                >
                  <a
                    href="https://zapper.fi/"
                    style={{ display: "block", width: "100%", height: "100%" }}
                  >
                    {" "}
                  </a>
                </div>
              </Row>
              <Row>
                <div
                  className="powerleft"
                  style={{
                    backgroundImage: `url(${Aave})`,
                  }}
                >
                  <a
                    href="https://aave.com"
                    style={{ display: "block", width: "100%", height: "100%" }}
                  >
                    {" "}
                  </a>
                </div>

                <div
                  className="powerright"
                  style={{
                    backgroundImage: `url(${DeFiPedia})`,
                  }}
                >
                  <a
                    href="https://twitter.com/defipedia?lang=en"
                    style={{ display: "block", width: "100%", height: "100%" }}
                  >
                    {" "}
                  </a>
                </div>
              </Row>

              <h1 style={{ marginTop: "50px" }}>Inspired By</h1>
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li className="list">
                  <a href="https://twitter.com/NodarJ/status/1213507574215200769?s=20">
                    This Tweet
                  </a>
                </li>
                <li className="list">
                  <a href="https://www.uniswaproi.com/#">Uniswap ROI</a>
                </li>
              </ul>

              <h1 style={{ marginTop: "50px" }}>Future Plans</h1>
              <div style={{ textAlign: "center" }}></div>
              <ul>
                <li className="listelement">
                  Add graphs for ETH and USD value of LP tokens over time to
                  Pool Explorer, LP Token Value, and Portfolio
                </li>
                <li className="listelement">
                  Turn LP Token Value Calculator into a tool for visualizing
                  USD/ETH value, fees earned, and IL of any liquidity pool
                  (historical performance or scenario based){" "}
                </li>
                <li className="listelement">
                  Improve accuracy of Pool Explorer metrics and add more
                  timeframes (daily, weekly, yearly)
                </li>
                <li>SushiSwap Portfolio Support (with SushiBar)</li>
                <li className="listelement">
                  Create and/or promote AAVE governance proposals for Uniswap
                  and SushiSwap market
                </li>
                <li className="listelement">
                  Work with community members to build, test, and audit smart
                  contracts for the Liquid Ether Zap{" "}
                </li>
                <li className="listelement">
                  Add Support for more Ethereum wallet types
                </li>
                <li className="listelement">Integrate Curve and Balancer</li>
              </ul>

              <h1 style={{ marginTop: "50px" }}>Source Code</h1>
              <a href="https://github.com/aschmidt20/LiquidYield">GitHub</a>

              <h1 style={{ marginTop: "50px" }}>
                Question, Comments, or Feature Requests
              </h1>
              <p>
                You can reach out to me on Twitter{" "}
                <a href="https://twitter.com/defispartan">@defispartan</a>
              </p>
              <h1 style={{ marginTop: "50px" }}>Donate</h1>
              <p>defispartan.eth</p>
            </div>
          </Row>
          <AdminFooter />
        </Container>
      </>
    );
  }
}

export default About;
