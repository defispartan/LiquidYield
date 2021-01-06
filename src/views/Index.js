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
  Spinner,
} from "reactstrap";
import LiquidLogo from "../assets/img/brand/liquidyieldblue.png";
import Uniswap from "assets/img/brand/uniswap.png";
import SushiNew from "assets/img/brand/sushiswaplogo.png";
import LEZ from "../assets/img/brand/LEZ.png";
import LPComp from "../assets/img/brand/lpcomp.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Header from "components/Headers/Header.js";
import educenter from "../assets/img/brand/educenter.png";
import poolexplorer from "../assets/img/brand/poolexplorer.png";
import portfolio from "../assets/img/brand/portfolio.png";
import lptoken from "../assets/img/brand/lptoken.PNG";
import lezbox from "../assets/img/brand/zapbox.png";
import { Line, defaults } from "react-chartjs-2";
import {
  GET_UNI_DAY_DATA,
  GET_SUSHI_DAY_DATA,
} from "../components/Data/Query.js";
import { uniswapClient } from "../components/Data/UniswapClient.js";
import { sushiswapClient } from "../components/Data/SushiSwapClient";
import dayjs from "dayjs";

const decimals = 0;
const options = {
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Daily Fees Earned (USD)",
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "$" + value.toFixed(decimals);
          },
        },
      },
    ],
  },
  legend: { display: false },
};

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    uniLoad: true,
    sushiLoad: true,
    uniChart: null,
    sushiChart: null,
  };

  async fetchUni() {
    const result = await uniswapClient.query({
      query: GET_UNI_DAY_DATA,
      fetchPolicy: "cache-first",
    });
    let data = result.data.uniswapDayDatas;
    let unilabels = [];
    let unidata = [];
    data.reverse();
    data.forEach((entry) => {
      unilabels.push(dayjs.unix(entry.date).format("YYYY-MM-DD"));
      unidata.push(entry.dailyVolumeUSD * 0.0003);
    });
    let uniChartData = {
      labels: unilabels,
      datasets: [
        {
          fill: true,
          backgroundColor: "rgba(237,187,234)",
          data: unidata,
        },
      ],
    };
    this.setState({ uniData: uniChartData });
    this.setState({ uniLoad: false });
  }

  async fetchSushi() {
    const sushiResult = await sushiswapClient.query({
      query: GET_SUSHI_DAY_DATA,
      fetchPolicy: "cache-first",
    });
    let sushiRawData = sushiResult.data.dayDatas;
    let sushilabels = [];
    let sushidata = [];
    sushiRawData.reverse();
    sushiRawData.forEach((entry) => {
      sushilabels.push(dayjs.unix(entry.date).format("YYYY-MM-DD"));
      sushidata.push(entry.volumeUSD * 0.00025);
    });
    let sushiChartData = {
      labels: sushilabels,
      datasets: [
        {
          fill: true,
          backgroundColor: "rgba(255,236,150)",
          data: sushidata,
        },
      ],
    };
    this.setState({ sushiData: sushiChartData });
    this.setState({ sushiLoad: false });
  }

  async componentDidMount() {
    this.fetchUni();

    this.fetchSushi();
  }

  displayUniChart() {
    if (this.state.uniLoad === true) {
      return (
        <div className="newspinny">
          <Spinner
            style={{ width: "5em", height: "5em", marginTop: "30px" }}
            color="black"
          />
        </div>
      );
    } else {
      return (
        <div className="chartWrapper">
          <Line data={this.state.uniData} options={options} />
        </div>
      );
    }
  }

  displaySushiChart() {
    if (this.state.sushiLoad === true) {
      return (
        <div className="newspinny">
          <Spinner
            style={{ width: "5em", height: "5em", marginTop: "30px" }}
            color="black"
          />
        </div>
      );
    } else {
      return (
        <div className="chartWrapper">
          <Line data={this.state.sushiData} options={options} />
        </div>
      );
    }
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
            <h2
              style={{
                textAlign: "center",
                color: "#4483f4",
                marginBottom: "50px",
                marginTop: "-10px",
              }}
            >
              Smarter Liquidity Management
            </h2>
            <div className="indexheaderdiv">
              <h2>Trading Fees Earned By Liquidity Providers</h2>
              <div className="featurerow2">
                <div className="featureleft2">
                  <div className="centerfeature">
                    <img
                      src={Uniswap}
                      className="infoimage"
                      alt="Uniswap"
                    ></img>
                    {this.displayUniChart()}
                  </div>
                </div>
                <div className="featureright2">
                  <div className="centerfeature">
                    <img
                      src={SushiNew}
                      className="infoimage"
                      alt="SushiSwap"
                    ></img>
                    {this.displaySushiChart()}
                  </div>
                </div>
              </div>
            </div>
            <div className="indexheaderdiv">
              <h1 className="indexheader">What is Liquid Yield?</h1>
            </div>
            <p>
              Liquid Yield is a service designed to educate and equip people
              with tools to maximize their yields as a liquidity provider (LP).{" "}
              <strong>
                This project has no token or monetezation of any kind. Liquid
                Yield is just a collection of tools and resources.
              </strong>{" "}
              The goal of this site is to provide value to anyone who is
              interested in maximizing yields with respect to Ethereum. Whether
              you're a complete beginner, or an experienced LP, the interactive
              guides on this site will help you understand, visualize, and take
              control of the factors affecting your investments.
            </p>
            <div className="indexheaderdiv">
              <h1 className="indexheader">What is a Liquidity Provider?</h1>
            </div>
            <p>
              A liquidity provider is a user who deposits their funds into a
              liquidity pool to facilitate trading on a decentralized exchange,
              and earns passive income on their deposit. Providing liquidity to
              a decentralized exchange is a way to put to your assets to work,
              and earn a reward for doing so.
            </p>
            <p>
              This is similar in concept to a user who deposits their funds to a
              bank or lending protocol such as AAVE or Compound, and earns
              interest based on the demand for borrowing those funds. The
              diagram below compares the interest earned by lenders to fees
              earned by liquidity providers. To learn more about Ethereum, DeFi,
              decentralized exchanges, and the factors affecting returns as an
              LP, check out the <a href="/education">Education Center</a>.
              <img src={LPComp} className="lpcomp"></img>
            </p>

            <div className="indexheaderdiv" style={{ paddingTop: "30px" }}>
              <h1 className="indexheader">Liquid Yield Features</h1>
            </div>

            <div className="featurerow">
              <div className="featureleft">
                <div className="centerfeature">
                  <h3>Education Center</h3>
                  <p>
                    An all-encompassing reource which covers Bitcoin, Ethereum,
                    DeFi, and terms specific to liquidity providers. Regardless
                    of skill level, there should be something in the Education
                    Center to learn from.
                  </p>
                </div>
              </div>
              <div className="featureright">
                <a href="/education">
                  <img src={educenter} className="featureimg" />
                </a>
              </div>
            </div>

            <div className="featurerow">
              <div className="featureright">
                <div className="centerfeature">
                  <h3>Pool Explorer</h3>
                  <p>
                    {" "}
                    Gives insights into the expected ROI for liquidity pools on
                    Uniswap and SushiSwap. Pool ROI is constantly changing based
                    on volume, liquidity, pool rewards, and asset price
                    fluctuation, so staying informed about pool metrics is an
                    important skill for LP's to have.
                  </p>
                </div>
              </div>
              <div className="featureleft">
                <a href="/pools">
                  <img src={poolexplorer} className="featureimg" />
                </a>
              </div>
            </div>
            <div className="featurerow">
              <div className="featureleft">
                <div className="centerfeature">
                  <h3>LP Token Value</h3>
                  <p>
                    Often times LP tokens can be staked in contracts and it
                    becomes difficult to find the value of your staked tokens.
                    With this tool you can input a Uniswap or Sushiswap pool and
                    an amount, and get the asset breakdown with the current
                    value in USD.
                  </p>
                </div>
              </div>
              <div className="featureright">
                <a href="/lpvalue">
                  <img src={lptoken} className="featureimg" />
                </a>
              </div>
            </div>

            <div className="featurerow">
              <div className="featureright">
                <div className="centerfeature">
                  <h3>Portfolio</h3>
                  <p>
                    {" "}
                    The Portfolio tool tracks the performance of Uniswap and
                    SushiSwap LP tokens in your Ethereum wallet with respect to
                    USD and ETH.
                  </p>
                </div>
              </div>
              <div className="featureleft">
                <a href="/portfolio">
                  <img src={portfolio} className="featureimg" />
                </a>
              </div>
            </div>
            <div className="featurerow">
              <div className="featureleft">
                <div className="centerfeature">
                  <h3>Liquid Ether Zap</h3>
                  <p>
                    {" "}
                    This Liquid Ether Zap is an interface to go directly from
                    ETH into an LP position while maintaining 100% exposure to
                    the price of ETH. See the diagram below for the steps
                    involved. This feature is still under development.
                  </p>
                </div>
              </div>
              <div className="featureright">
                <a href="/zap">
                  <img src={lezbox} className="featureimg" />
                </a>
              </div>
            </div>

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
