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
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
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
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>


          <div className="col" style={{textAlign:"center"}}>
            <br></br>

              <h2>What is Liquid Yield?</h2>
              <p>Liquid Yield is a service designed to maximize the yields of being a Uniswap liquidity provider while maintaining 100% exposure to the price of Ethereum. As a DeFi enthusiast I find my investment decisions boiling down to a simple question, </p>
              <h2>What is Uniswap?</h2>
              <h2>How do I make money as a liquidity provider?</h2>
              <p>Liquidity pools have a simple payout structure but are often a source of confusion for investors as finding accurate reporting and predictions for pool returns is not straightforward. </p>

              <div className="emphasis">I have Ethereum, how do I leverage it to earn more?</div>

              <p>On the surface, providing liquidity to an AMM like Uniswap can seem like an enticing option with weekly returns as high as 10%, but from personal experience being a liquidity provider is not as lucrative in nominal returns and often gets beaten out by simply holding Ethereum. With the abundance of leverage and lending oppurtunities popping up in the DeFi ecosystem I thought that surely there was a simple way to maximize LP returns while maintaining Ethereum exposure. With the introduction of Aave's Uniswap Market, this easy solution exists and Liquid Yield is a site built to bring this oppurtunity to you with a simple zap interface.</p>
              <p>I call this transaction the Liquid Ether Zap, the individual steps are shown in the graph below and the result is earning liquidity provision fees on 100% of your initial investment while maintaining 100% exposure to the price of Ethereum.</p>
              <img
                alt="..."
                src={require("assets/img/theme/liquidetherzap.jpg")}
              />
            </div>





          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
