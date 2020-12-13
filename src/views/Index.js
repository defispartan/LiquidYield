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
import LiquidLogo from "../assets/img/brand/liquidyieldblue.png";
import LPreturns from "../assets/img/brand/lpreturns.PNG";
import Factors from "../assets/img/theme/factors.png";
import LEZ from "../assets/img/brand/LEZ.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <div className="col" style={{ textAlign: "left" }}>
            <img
              className="logohead"
              src={LiquidLogo}
              alt="Liquid Yield Logo"
            ></img>
            <h1
              style={{
                textAlign: "center",
                color: "#4483f4",
                marginBottom: "50px",
                marginTop: "-10px",
              }}
            >
              Smarter Liquidity Management
            </h1>
            <h2>What is Liquid Yield?</h2>
            <p>
              Liquid Yield is a service designed to educate and equip people
              with skills and tools to maximize their yields as a liquidity
              provider (LP).{" "}
              <strong>
                This project has no token or monetezation of any kind. Liquid
                Yield is just a collection of resources to improve the lives of
                liquidity providers.
              </strong>{" "}
              My goal with this site is to provide value to anyone that is
              interested in maximizing yields with respect to Ethereum. Whether
              you're a complete beginner, or an experienced LP, the interactive
              guides on this site will help you understand, visualize, and take
              control of the factors affecting your LP returns.
            </p>
            <h2>Key Features</h2>
            <p>
              I would first recommend exploring the{" "}
              <a href="/education">Education Center</a>. Some of the information
              in the early sections can probably be skipped over if you've
              already been exposed to Uniswap before. Regardless of skill level,
              the <a href="/education#il">impermanent loss</a> and{" "}
              <a href="/education#pe">price exposure</a> sections are{" "}
              <strong>must reads</strong>. The information and interactive tools
              in these sections are the keys to mastering liquidity provision.
            </p>
            <p>
              Once you've gone through the education center and have a
              comfortable understanding of the 4 factors affecting your returns,
              check out the <a href="/pools">Pool Explorer</a> and sort by APR
              to get an idea of the returns you can expect as an LP. These
              values are subject to change as liquidity and volume vary, so do
              your due dilligence by clicking on the pools you are interested in
              to view historical trends, and perform your research on the coin
              before investing.
            </p>
            <p>
              The final (and most exciting) feature of Liquid Yield is the{" "}
              <a href="/zap">Liquid Ether Zap</a>. This zap is an interface to
              go directly from ETH into an LP position while maintaining 100%
              exposure to the price of ETH. To learn how this is possible, read
              the AAVE section in the education center or check out the diagram
              below. Currently the zap is under construction while I update the
              interface to work with AAVE V2 and propose the creation of Uniswap
              and SushiSwap markets in AAVE governance. If you are a holder of
              AAVE I would strongly encourage you to support these proposals as
              they're neccessary for the Liquid Ether Zap to work.
            </p>

            <img
              className="indexlez"
              src={LEZ}
              alt="Liquid Ether Zap Diagram"
            ></img>
          </div>
          <AdminFooter />
        </Container>
      </>
    );
  }
}

export default Index;
