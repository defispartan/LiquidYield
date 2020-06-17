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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import Uniswap from "assets/img/brand/uniswap.png";
import Aave from "assets/img/brand/aave.png";

import Header from "components/Headers/Header.js";

class About extends React.Component {
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
          <Row>
            <div className="col" style={{ textAlign: "center" }}>
              <h1>Powered By</h1>
              <Row>
                <div
                  class="power"
                  style={{
                    backgroundImage: `url(${Aave})`,
                  }}
                >
                  <a
                    href="https://aave.com"
                    style={{ display: "block", width: "100%", height: "100%" }}
                  ></a>
                </div>
                <div
                  class="power"
                  style={{ backgroundImage: `url(${Uniswap})` }}
                >
                  <a
                    href="https://uniswap.exchange"
                    style={{ display: "block", width: "100%", height: "100%" }}
                  ></a>
                </div>
              </Row>
              <h1 style={{ marginTop: "50px" }}>Inspired By</h1>
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li class="list">
                  <a href="https://twitter.com/NodarJ/status/1213507574215200769?s=20">
                    This Tweet
                  </a>
                </li>
                <li class="list">
                  <a href="https://www.uniswaproi.com/#">Uniswap ROI</a>
                </li>
                <li class="list">
                  <a href="https://zapper.fi">Zapper</a>
                </li>
                <li class="list">
                  <a href="https://zumzoom.github.io/analytics/uniswap/roi/">
                    ZumZoom Uniswap ROI Graphs
                  </a>
                </li>
              </ul>
              <h1 style={{ marginTop: "50px" }}>Source Code</h1>
              <a href="https://github.com/aschmidt20/LiquidYield">GitHub</a>
              <h1 style={{ marginTop: "50px" }}>Donate</h1>
              <p>defispartan.eth</p>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default About;
