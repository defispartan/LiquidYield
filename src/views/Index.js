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
import { Collapse, Container, Spinner, Button } from "reactstrap";
import LiquidLogo from "../assets/img/brand/liquidyieldblue.png";
import Uniswap from "assets/img/brand/uniswap.png";
import SushiNew from "assets/img/brand/sushiswaplogowhite.png";
import LEZ from "../assets/img/brand/lezwhite.png";
import LPComp from "../assets/img/brand/lpcomp.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Header from "components/Headers/Header.js";
import educenter from "../assets/img/brand/educenter.png";
import poolexplorer from "../assets/img/brand/poolexplorer.png";
import portfolio from "../assets/img/brand/portfolio.png";
import lptoken from "../assets/img/brand/lptoken.PNG";
import lezbox from "../assets/img/brand/zapbox.png";
import { Bar } from "react-chartjs-2";
import {
  GET_UNI_DAY_DATA,
  GET_SUSHI_DAY_DATA,
  GET_INDEX_PRICES
} from "../components/Data/Query.js";
import { uniswapClient } from "../components/Data/UniswapClient.js";
import { sushiswapClient } from "../components/Data/SushiSwapClient";
import dayjs from "dayjs";


const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const round = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
// Options for ChartJS plots of daily trading fee revenue
const decimals = 0;
const options = {
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Daily Earnings (USD)",
          fontColor: "white"
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "$" + numberWithCommas(value.toFixed(decimals));
          },
          fontColor: "white",
          max: 5000000
        },
        stacked: true
      },
    ],
    xAxes: [
      {
        ticks: {
          fontColor: "white"
        },
        stacked: true
      }
    ]
  },
  legend: {
    display: true,
    labels: {
      fontColor: "white"
    }
  },
}



// Class representing the Liquid Yield homepage
class Index extends React.Component {
  state = {
    uniLoad: true, // Current loading state of UNI chart
    sushiLoad: true, // Current loading state of SUSHI chat
    uniChart: null, // Uniswap trading fee data to plot
    sushiChart: null, // SushiSwap trading fee data to plot
    chartTime: "alltime",
    chartType: "both",
    bothLoad: true,
    uniMasterFees: null,
    uniMasterRewards: null,
    sushiMasterFees: null,
    sushiMasterRewards: null,
    uniMasterTime: null,
    sushiMasterTime: null,
    uniPrice: null,
    sushiPrice: null,
    notesOpen: false,
    notesIcon: <i className="plus circle icon"></i>


  };


  setThirty = (type) => {
    this.setState({ chartTime: "thirty" })

    if (typeof type === 'object') {
      type = this.state.chartType
    }
    let newsushidata = this.state.sushiData
    let newunidata = this.state.uniData
    newunidata.labels = this.state.uniMasterTime.slice(this.state.uniMasterTime.length - 30)
    newsushidata.labels = this.state.sushiMasterTime.slice(this.state.sushiMasterTime.length - 30)
    newunidata.datasets[0].data = this.state.uniMasterFees.slice(this.state.uniMasterFees.length - 30)
    newsushidata.datasets[0].data = this.state.sushiMasterFees.slice(this.state.sushiMasterFees.length - 30)
    newunidata.datasets[1].data = this.state.uniMasterRewards.slice(this.state.uniMasterRewards.length - 30)
    newsushidata.datasets[1].data = this.state.sushiMasterRewards.slice(this.state.sushiMasterRewards.length - 30)
    if (type === "fees") {
      newunidata.datasets[0].hidden = false
      newunidata.datasets[1].hidden = true
      newsushidata.datasets[0].hidden = false
      newsushidata.datasets[1].hidden = true
    }
    else if (type === "both") {
      newunidata.datasets[0].hidden = false
      newunidata.datasets[1].hidden = false
      newsushidata.datasets[0].hidden = false
      newsushidata.datasets[1].hidden = false
    }
    else {
      newunidata.datasets[0].hidden = true
      newunidata.datasets[1].hidden = false
      newsushidata.datasets[0].hidden = true
      newsushidata.datasets[1].hidden = false
    }

    this.setState({ uniData: newunidata, sushiData: newsushidata })
  }




  setHundred = (type) => {
    this.setState({ chartTime: "hundred" })

    if (typeof type === 'object') {
      type = this.state.chartType
    }

    let newunidata = this.state.uniData
    let newsushidata = this.state.sushiData
    newunidata.labels = this.state.uniMasterTime.slice(this.state.uniMasterTime.length - 100)
    newsushidata.labels = this.state.sushiMasterTime.slice(this.state.sushiMasterTime.length - 100)
    newunidata.datasets[0].data = this.state.uniMasterFees.slice(this.state.uniMasterFees.length - 100)
    newsushidata.datasets[0].data = this.state.sushiMasterFees.slice(this.state.sushiMasterFees.length - 100)
    newunidata.datasets[1].data = this.state.uniMasterRewards.slice(this.state.uniMasterRewards.length - 100)
    newsushidata.datasets[1].data = this.state.sushiMasterRewards.slice(this.state.sushiMasterRewards.length - 100)
    if (type === "fees") {
      newunidata.datasets[0].hidden = false
      newunidata.datasets[1].hidden = true
      newsushidata.datasets[0].hidden = false
      newsushidata.datasets[1].hidden = true
    }
    else if (type === "both") {
      newunidata.datasets[0].hidden = false
      newunidata.datasets[1].hidden = false
      newsushidata.datasets[0].hidden = false
      newsushidata.datasets[1].hidden = false
    }
    else {
      newunidata.datasets[0].hidden = true
      newunidata.datasets[1].hidden = false
      newsushidata.datasets[0].hidden = true
      newsushidata.datasets[1].hidden = false
    }


    this.setState({ uniData: newunidata, sushiData: newsushidata })
  }




  setAllTime = (type) => {
    this.setState({ chartTime: "alltime" })
    if (typeof type === 'object') {
      type = this.state.chartType
    }
    let newunidata = this.state.uniData
    let newsushidata = this.state.sushiData
    newunidata.labels = this.state.uniMasterTime
    newsushidata.labels = this.state.sushiMasterTime
    newunidata.datasets[0].data = this.state.uniMasterFees
    newsushidata.datasets[0].data = this.state.sushiMasterFees
    newunidata.datasets[1].data = this.state.uniMasterRewards
    newsushidata.datasets[1].data = this.state.sushiMasterRewards
    if (type === "fees") {
      newunidata.datasets[0].hidden = false
      newunidata.datasets[1].hidden = true
      newsushidata.datasets[0].hidden = false
      newsushidata.datasets[1].hidden = true
    }
    else if (type === "both") {
      newunidata.datasets[0].hidden = false
      newunidata.datasets[1].hidden = false
      newsushidata.datasets[0].hidden = false
      newsushidata.datasets[1].hidden = false
    }
    else {
      newunidata.datasets[0].hidden = true
      newunidata.datasets[1].hidden = false
      newsushidata.datasets[0].hidden = true
      newsushidata.datasets[1].hidden = false
    }


    this.setState({ uniData: newunidata, sushiData: newsushidata })


  }

  callActive = (type) => {
    if (this.state.chartTime === "thirty") {
      this.setThirty(type)
    }
    else if (this.state.chartTime === "hundred") {
      this.setHundred(type)

    }
    else {
      this.setAllTime(type)

    }
  }

  setFeesOnly = () => {
    this.setState({ chartType: "fees" })

    this.callActive("fees")

  }

  setBoth = () => {
    this.setState({ chartType: "both" })
    this.callActive("both")
  }

  setRewardOnly = () => {
    this.setState({ chartType: "rewards" })
    this.callActive("rewards")
  }

  resizeSushi = () => {
    let count = 0
    let newtime = [...this.state.sushiMasterTime]
    let newfees = [...this.state.sushiMasterFees]
    let newrewards = [...this.state.sushiMasterRewards]
    let entries = []
    let dataentries = []

    while (this.state.sushiMasterTime.length + count < this.state.uniMasterTime.length) {
      entries.push(this.state.uniMasterTime[count])
      dataentries.push(0)
      count = count + 1
    }

    newtime = entries.concat(newtime)
    newfees = dataentries.concat(newfees)
    newrewards = dataentries.concat(newrewards)



    let sushiChartData = {
      labels: newtime,
      datasets: [
        {
          label: "Trading Fees",
          backgroundColor: "rgba(255,236,150)",
          data: newfees,
        },
        {
          label: "SUSHI Liquidity Mining Rewards",
          backgroundColor: "rgba(191,41,31)",
          data: newrewards,
        },
      ],
    };



    this.setState({ sushiData: sushiChartData, sushiMasterTime: newtime, sushiMasterFees: newfees, sushiMasterRewards: newrewards, bothLoad: false })

  }





  // Fetches Uniswap trading fee data from TheGraph
  async fetchUni() {
    const result = await uniswapClient.query({
      query: GET_UNI_DAY_DATA,
      fetchPolicy: "cache-first",
    });
    const ethprice = await uniswapClient.query({
      query: GET_INDEX_PRICES,
      fetchPolicy: "cache-first",

    })
    let ethderivedprice = 1 / (ethprice.data.tokens[2].derivedETH)
    let uniprice = ethprice.data.tokens[0].derivedETH * ethderivedprice
    let data = result.data.uniswapDayDatas;
    let unilabels = [];
    let unidata = [];
    let unirewarddata = [];
    if (dayjs.unix(data[0].date) > dayjs.unix(data[1].date)) {

      data.reverse();
    }
    data.forEach((entry) => {
      unilabels.push(dayjs.unix(entry.date).format("YYYY-MM-DD"));
      unidata.push(entry.dailyVolumeUSD * 0.003);
      if ((dayjs.unix(entry.date) < dayjs.unix(1600387200)) || (dayjs.unix(entry.date) > dayjs.unix(1605571200))) {
        unirewarddata.push(0)
      }
      else {
        unirewarddata.push(uniprice * (20000000 / 60))
      }
    });
    this.setState({ uniMasterTime: unilabels, uniMasterFees: unidata, uniMasterRewards: unirewarddata })
    let uniChartData = {
      labels: unilabels,
      datasets: [
        {
          label: "Trading Fees",

          backgroundColor: "rgba(237,187,234)",
          data: unidata,
        },
        {
          label: "UNI Liquidity Mining Rewards",

          backgroundColor: "rgba(142,39,176)",
          data: unirewarddata,
        },

      ],

    };
    this.setState({ uniData: uniChartData, uniLoad: false, uniPrice: uniprice })

    if (this.state.sushiLoad === false) {
      this.resizeSushi()
      //this.setState({ bothLoad: false })
    }
  }

  // Fetches SushiSwap trading fee data from TheGraph
  async fetchSushi() {
    const sushiResult = await sushiswapClient.query({
      query: GET_SUSHI_DAY_DATA,
      fetchPolicy: "cache-first",
    });
    const ethprice = await uniswapClient.query({
      query: GET_INDEX_PRICES,
      fetchPolicy: "cache-first",

    })
    let ethderivedprice = 1 / (ethprice.data.tokens[2].derivedETH)
    let sushiprice = ethprice.data.tokens[1].derivedETH * ethderivedprice
    let sushiRawData = sushiResult.data.dayDatas;
    let sushilabels = [];
    let sushidata = [];
    let sushirewarddata = []
    if (dayjs.unix(sushiRawData[0].date) > dayjs.unix(sushiRawData[1].date)) {

      sushiRawData.reverse();
    }
    sushiRawData.forEach((entry) => {
      sushilabels.push(dayjs.unix(entry.date).format("YYYY-MM-DD"));
      sushidata.push(entry.volumeUSD * 0.0025);
      let rewardentry = 6500 * sushiprice
      if (dayjs.unix(entry.date) < dayjs.unix(1600387200)) {
        sushirewarddata.push(rewardentry * 1000)
      }
      else if (dayjs.unix(entry.date) < dayjs.unix(1599868800)) {
        sushirewarddata.push(rewardentry * 100)
      }
      else if (dayjs.unix(entry.date) < dayjs.unix(1601510400)) {
        sushirewarddata.push(rewardentry * 90)
      }
      else if (dayjs.unix(entry.date) < dayjs.unix(1604188800)) {
        sushirewarddata.push(rewardentry * 80)
      }
      else if (dayjs.unix(entry.date) < dayjs.unix(1606780800)) {
        sushirewarddata.push(rewardentry * 70)
      }
      else if (dayjs.unix(entry.date) < dayjs.unix(1609459200)) {
        sushirewarddata.push(rewardentry * 60)
      }
      else if (dayjs.unix(entry.date) < dayjs.unix(1612137600)) {
        sushirewarddata.push(rewardentry * 50)
      }
      else if (dayjs.unix(entry.date) < dayjs.unix(1612137600)) {
        sushirewarddata.push(rewardentry * 40)
      }

    });
    this.setState({ sushiMasterTime: sushilabels, sushiMasterFees: sushidata, sushiMasterRewards: sushirewarddata })
    let sushiChartData = {
      labels: sushilabels,
      datasets: [
        {
          label: "Trading Fees",
          backgroundColor: "rgba(255,236,150)",
          data: sushidata,
        },
        {
          label: "SUSHI Liquidity Mining Rewards",
          backgroundColor: "rgba(191,41,31)",
          data: sushirewarddata,
        },
      ],
    };
    this.setState({ sushiData: sushiChartData, sushiLoad: false, sushiPrice: sushiprice });


    if (this.state.uniLoad === false) {
      this.resizeSushi()
      //this.setState({ bothLoad: false })
    }
  }

  // Fetch data when component mounts
  async componentDidMount() {
    if (this.state.uniLoad === true) {

      this.fetchUni();
    }
    if (this.state.sushiLoad === true) {
      this.fetchSushi();
    }
  }



  // Displays stacked bar chart of Uniswap trading fees + liquidity mining rewards or spinner if loading
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
          <Bar data={this.state.uniData} options={options} />
        </div>

      );
    }
  }

  // Displays stacked bar chart of SushiSwap trading fees + liquidity mining rewards or spinner if loading
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
          <Bar data={this.state.sushiData} options={options} />
        </div>
      );
    }
  }
  displayDateRow = () => {
    if (this.state.bothLoad === true) {
      return <></>
    }
    if (this.state.chartTime === "thirty") {
      return (<div>
        <Button color="info" onClick={this.setThirty}>Last 30 Days</Button>
        <Button onClick={this.setHundred}>Last 100 Days</Button>
        <Button onClick={this.setAllTime}>All Time</Button>
      </div>)
    }
    else if (this.state.chartTime === "hundred") {
      return (
        <div>
          <Button onClick={this.setThirty}>Last 30 Days</Button>
          <Button color="info" onClick={this.setHundred}>Last 100 Days</Button>
          <Button onClick={this.setAllTime}>All Time</Button>
        </div>
      )
    }
    else return (
      <div>
        <Button onClick={this.setThirty}>Last 30 Days</Button>
        <Button onClick={this.setHundred}>Last 100 Days</Button>
        <Button color="info" onClick={this.setAllTime}>All Time</Button>
      </div>
    )
  }

  displayEarningType = () => {
    if (this.state.bothLoad === true) {
      return <></>
    }
    if (this.state.chartType === "fees") {
      return (<div>
        <Button color="info" onClick={this.setFeesOnly}>Trading Fees Only</Button>
        <Button onClick={this.setBoth}>Both</Button>
        <Button onClick={this.setRewardOnly}>Rewards Only</Button>
      </div>)
    }
    else if (this.state.chartType === "both") {
      return (
        <div>
          <Button onClick={this.setFeesOnly}>Trading Fees Only</Button>
          <Button color="info" onClick={this.setBoth}>Both</Button>
          <Button onClick={this.setRewardOnly}>Rewards Only</Button>
        </div>
      )
    }
    else return (
      <div>
        <Button onClick={this.setFeesOnly}>Trading Fees Only</Button>
        <Button onClick={this.setBoth}>Both</Button>
        <Button color="info" onClick={this.setRewardOnly}>Rewards Only</Button>
      </div>
    )
  }

  displayUniPrice = () => {
    if (this.state.uniLoad === false) {
      return (
        <div style={{ width: "100%", margin: "0 auto" }}>

          <p style={{ color: 'white' }}>With Current UNI Price = $ {round(this.state.uniPrice + 0.0000, 2)}</p>
        </div>
      )
    }
    else {

      return <></>
    }

  }

  displaySushiPrice = () => {
    if (this.state.sushiLoad === false) {
      return (<div style={{ width: "100%", margin: "0 auto" }}>

        <p style={{ color: 'white' }}>With Current SUSHI Price = $ {round(this.state.sushiPrice + 0.0000, 2)}</p>
      </div>)
    }
    else {
      return <></>
    }

  }

  toggleNotesOpen = () => {

    if (this.state.notesOpen == false) {
      this.setState({ notesIcon: <i className="minus circle icon"></i> });
    } else {
      this.setState({ notesIcon: <i className="plus circle icon"></i> })
    }
    this.setState({ notesOpen: !this.state.notesOpen })

  };




  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7 bg-dark" fluid>
          <div className="col" style={{ textAlign: "left" }}>
            <img
              className="logohead"
              src={LiquidLogo}
              alt="Liquid Yield Logo"
            ></img>

            <div className="indexheaderdiv">
              <h2 style={{ color: "white" }}>Daily Liquidity Providers Earnings</h2>
              <div className="featurerow2">
                <div className="featureleft2">
                  <div className="centerfeature">
                    <img
                      src={Uniswap}
                      className="infoimage"
                      alt="Uniswap"
                    ></img>
                    {this.displayUniPrice()}
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
                    {this.displaySushiPrice()}
                    {this.displaySushiChart()}
                  </div>
                </div>
              </div>
              <div className="buttonrow">
                {this.displayDateRow()}
              </div>
              <div className="buttonrow">
                {this.displayEarningType()}
              </div>
            </div>



            <div className="about" style={{ color: "white" }}>
              <div className="abouticon" onClick={this.toggleNotesOpen}>
                {this.state.notesIcon}
              </div>
              <h3 className="abouticon" style={{ color: "white" }}>Chart Notes</h3>
              <Collapse isOpen={this.state.notesOpen} className="aboutcontent" style={{ color: "white" }}>
                <ul>
                  <li>
                    On 10/26/2020, Uniswap recorded a daily volume of over $2B as a result of the <a href="https://cryptoslate.com/uniswap-volumes-bump-to-2-billion-after-attack-on-defi-project-harvest-finance/">Harvest Finance exploit</a>, generating $6 million in daily trading fee revenue for LP's. This bar is cut off because the y-axis would need to be nearly doubled to fit this outlier.
                  </li>
                  <li>
                    During the first two weeks of SushiSwap's existence (08/28/2020-09/12/2020), there was a 1000x multiplier in effect for SUSHI rewards. This was reduced down to 100x on 9/12 and has been steadily decreasing ever since. During this two week window, the daily liquidity mining rewards were over $40 million. These bars are cut off because the y-axis would need to be scaled by a factor of 10 to fit them.
              </li>
                </ul>
              </Collapse>
            </div>


            <div className="indexheaderdiv">
              <h1 className="indexheader">What is Liquid Yield?</h1>
            </div>
            <p className="indexcontent">
              Liquid Yield is a service designed to educate and equip people
              with tools to maximize their yields as a liquidity provider (LP).{" "}
              <strong>
                This project has no token or monetization of any kind. Liquid
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
            <p className="indexcontent">
              A liquidity provider is a user who deposits their funds into a
              liquidity pool to facilitate trading on a decentralized exchange,
              and earns passive income on their deposit. Providing liquidity to
              a decentralized exchange is a way to put your assets to work,
              and earn a reward for doing so.
            </p>
            <p className="indexcontent">
              This is similar in concept to a user who deposits their funds to a
              bank or lending protocol such as AAVE or Compound, and earns
              interest based on the demand for borrowing those funds. The
              diagram below compares the interest earned by lenders to fees
              earned by liquidity providers. To learn more about Ethereum, DeFi,
              decentralized exchanges, and the factors affecting returns as an
              LP, check out the <a href="/education">Education Center</a>.
              <img
                src={LPComp}
                className="lpcomp"
                alt="Liquidity Provider Comparison"
              ></img>
            </p>

            <div className="indexheaderdiv" style={{ paddingTop: "30px" }}>
              <h1 className="indexheader">Liquid Yield Features</h1>
            </div>

            <div className="featurerow">
              <div className="featureleft">
                <div className="centerfeature">
                  <h3 className="indexheader">Education Center</h3>
                  <p className="indexcontent">
                    An all-encompassing resource which covers Bitcoin, Ethereum,
                    DeFi, and terms specific to liquidity providers. Regardless
                    of skill level, there should be something in the Education
                    Center to learn from.
                  </p>
                </div>
              </div>
              <div className="featureright">
                <a href="/education">
                  <img
                    src={educenter}
                    className="featureimg"
                    alt="Education Center"
                  />
                </a>
              </div>
            </div>

            <div className="featurerow">
              <div className="featureright">
                <div className="centerfeature">
                  <h3 className="indexheader">Pool Explorer</h3>
                  <p className="indexcontent">
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
                  <img
                    src={poolexplorer}
                    className="featureimg"
                    alt="Pool Explorer"
                  />
                </a>
              </div>
            </div>
            <div className="featurerow">
              <div className="featureleft">
                <div className="centerfeature">
                  <h3 className="indexheader">LP Token Value</h3>
                  <p className="indexcontent">
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
                  <img
                    src={lptoken}
                    className="featureimg"
                    alt="LP Token Value Calculator"
                  />
                </a>
              </div>
            </div>

            <div className="featurerow">
              <div className="featureright">
                <div className="centerfeature">
                  <h3 className="indexheader">Portfolio</h3>
                  <p className="indexcontent">
                    {" "}
                    The Portfolio tool tracks the performance of Uniswap and
                    SushiSwap LP tokens in your Ethereum wallet with respect to
                    USD and ETH.
                  </p>
                </div>
              </div>
              <div className="featureleft">
                <a href="/portfolio">
                  <img src={portfolio} className="featureimg" alt="Portfolio" />
                </a>
              </div>
            </div>
            <div className="featurerow">
              <div className="featureleft">
                <div className="centerfeature">
                  <h3 className="indexheader">Liquid Ether Zap</h3>
                  <p className="indexcontent">
                    {" "}
                    This Liquid Ether Zap is an interface to go directly from
                    ETH into an LP position while maintaining ~100% exposure to
                    the price of ETH. See the diagram below for the steps
                    involved. This feature is still under development.
                  </p>
                </div>
              </div>
              <div className="featureright">
                <a href="/zap">
                  <img
                    src={lezbox}
                    className="featureimg"
                    alt="Liquid Ether Zap Art"
                  />
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
