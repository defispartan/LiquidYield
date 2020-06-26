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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
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
import LiquidLogo from "../assets/img/brand/liquid-react.png";
import LPreturns from "../assets/img/brand/lpreturns.PNG";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <div className="col" style={{ textAlign: "left" }}>
            <div
              className="logohead"
              style={{ backgroundImage: `url(${LiquidLogo})` }}
            ></div>
            <h1
              style={{
                textAlign: "center",
                color: "#416fe6",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Provide Liquidity. Accumulate ETH.
            </h1>
            <h2>What is Liquid Yield?</h2>
            <p>
              Liquid Yield is a service designed to help DeFi investors maximize
              their Ethereum yields by leveraging the{" "}
              <a href="https://app.aave.com/?pool=Uniswap">
                Aave Uniswap Market
              </a>
              . This site provides investors with an in-depth analysis of
              liquidity pool yields and a tool to zap into Uniswap pools while
              maintaining 100% exposure to the price of Ethereum.
            </p>

            <h2>What is Uniswap?</h2>
            <p>
              Uniswap is a decentralized exchange and AMM (automated market
              maker), allowing users to efficiently swap Ethereum and ERC20
              tokens without an order book by leveraging reserves of assets
              called liquidity pools. The ratio of assets in the pool serve as a
              price discovery mechanism for asset pairs, and the pools rely on
              arbitrage to keep Uniswap asset prices in line with other
              exchanges. Liquidity providers on Uniswap must deposit an equal
              value of both assets in the pair to maintain a constant product of
              reserves. When a user swaps currencies on the exchange, a 0.3% fee
              is assesed and is distributed proportionally to the liquidity
              providers. When a person contributes liquidity to a pool, pool
              tokens are minted to represent the contributors share of the pool.
              To withdraw the pooled assets, the pool tokens are burned and an
              equivalent share of the tokens in the pool are returned.
            </p>
            <h2>How do I make money as a liquidity provider?</h2>
            <p>
              Liquidity pools have a simple fee-based payout structure (0.3% per
              swap), but the returns of being a liquidity provider often a
              source of confusion for investors. This confusion is due to the
              fact that fee accumalation is not the only contributing factor to
              the returns of a liquidity pool. The other two important factors
              that a provider must take into account are{" "}
              <strong>Impermanent Loss</strong> and{" "}
              <strong>Price Exposure</strong>.
            </p>
            <p>
              {" "}
              <strong>Impermanent Loss</strong> occurs when the price of the two
              assets in a liquidity pair diverge. The result of this price
              divergence is a reduction in the value of the supplied liquidity
              relative to holding the assets, in some cases completely negating
              the fees earned by the providers. We can model the effects of
              impermanent loss on liquidity provider returns by looking at the
              return on investment for positions with varying pool growth (fee
              accrual) and price divergence as shown in the figure below.
            </p>
            <figure>
              <div
                className="lpreturns"
                style={{ backgroundImage: `url(${LPreturns})` }}
              ></div>
            </figure>
            <figcaption>
              {" "}
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  marginBottom: "20px",
                }}
              >
                Source:{" "}
                <a href="https://medium.com/@pintail/understanding-uniswap-returns-cc593f3499ef">
                  https://medium.com/@pintail/understanding-uniswap-returns-cc593f3499ef
                </a>
              </p>
            </figcaption>
            <p>
              This phenomenon of impermanent loss introduces uncertainty in
              calculating liquidity provider returns because accuractely
              predicting pool returns would require accurate forecasting of
              asset prices. The incurred losses can be minimized by providing
              liquidity to pools whos assets have prices that do not fluctuate
              (i.e. stablecoins). For more information about Uniswap returns and
              impermanent loss,{" "}
              <a href="https://medium.com/@pintail/understanding-uniswap-returns-cc593f3499ef">
                this
              </a>{" "}
              article provides some fantastic insights.
            </p>
            <p>
              <strong>Price Exposure</strong> is much simpler to understand but
              can also result in dimished returns compared to holding Ethereum.
              By contributing an equal value of both tokens in the pair, a
              provider only has 50% price exposure to both tokens. This means
              that if the price of Ethereum rises by 20%, the pool tokens will
              only appreciate by 10%. Maintaining price exposure to Ethereum is
              a key reason why liquidity pools may not provide the best yield
              for investors if the market is bullish on Ethereum, and is the
              reasoning behind the <strong>Liquid Ether Zap</strong> explained
              below.
            </p>

            <p>
              The{" "}
              <a href="https://app.aave.com/?pool=Uniswap">
                Aave Uniswap Market
              </a>{" "}
              can be leveraged to long Ethereum by providing Uniswap liquidity
              pool tokens as collateral. An example of the Liquid Ether Zap
              transaction for the ETH/DAI pool are shown in the graph below and
              the result is earning liquidity provision fees on 100% of your
              initial investment while maintaining 100% exposure to the price of
              Ethereum.
            </p>
            <div className="liquidether">
              <img
                alt="Liquid Ether Zap"
                src={require("assets/img/theme/liquidetherzap.jpg")}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default Index;
