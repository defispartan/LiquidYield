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
              The goal of this site is to provide value to anyone who is
              interested in maximizing yields with respect to Ethereum. Whether
              you're a complete beginner, or an experienced LP, the interactive
              guides on this site will help you understand, visualize, and take
              control of the factors affecting your LP yields.
            </p>
            <h2>Features</h2>
            <p>
              The first resource you should check out is the{" "}
              <a href="/education">Education Center</a>. This page is meant to
              be an all-encompassing reource which covers Bitcoin, Ethereum,
              DeFi, and terms specific to liquidity providers. Regardless of
              skill level, there should be something in the Education Center to
              learn from. Two sections worth highlighting are the{" "}
              <a href="/education#il">impermanent loss</a> and{" "}
              <a href="/education#pe">price exposure</a> sections. The
              information and interactive tools in these sections are the keys
              to mastering liquidity provision.
            </p>
            <p>
              Once you've gone through the education center and have a
              comfortable understanding of the four factors affecting LP yields,
              check out the <a href="/pools">Pool Explorer</a> to get an idea of
              the ROI for liquidity pools on Uniswap and SushiSwap. As explained{" "}
              <a href="/education#apr">here</a>, pool ROI is constantly changing
              based on volume, liquidity, pool rewards, and asset price
              fluctuation, so treat shorter term metrics like weekly and monthly
              ROI with more confidence than APY. In addition, the pool ROI
              cannot predict assets prices, so the returns are with respect to
              the LP tokens (50% exposure to ETH, and 50% expsosure to a second
              asset). This second point is why it is recommended to do your own
              research on the assets in a liquidity pool before investing, and
              track your returns with respect to ETH! For each pool in the
              explorer, you can click on the row to bring up links for more in
              depth pool analytics with{" "}
              <a href="https://apy.vision/#/">apy.vision</a>, and a simple UI to
              invest in the pool with{" "}
              <a href="https://zapper.fi/dashboard">zapper.fi</a>.
            </p>
            <p>
              The next two features are tools to track your existing LP
              positions. The first is the{" "}
              <a href="#lpvalue">LP Token Value Calculator</a>. Often times LP
              tokens can be staked in contracts and it becomes difficult to find
              the value of your staked tokens. With this tool you can input a
              pool and an amount, and get the asset breakdown with value in USD
              for your LP tokens. The second tool is the{" "}
              <a href="#portfolio">Porfolio</a>, which tracks the performance of
              Uniswap and SushiSwap LP tokens in your Ethereum wallet.
            </p>
            <p>
              The final (and most exciting) feature of Liquid Yield is the{" "}
              <a href="/zap">Liquid Ether Zap</a>. This zap is an interface to
              go directly from ETH into an LP position while maintaining 100%
              exposure to the price of ETH. To learn how this is possible, read
              the AAVE section in the education center or check out the diagram
              below. Currently the zap is under construction while I update the
              interface to work with AAVE V2 and propose the creation of Uniswap
              and SushiSwap markets in AAVE governance. I'll be posting links to
              support these proposals once they're available.
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
