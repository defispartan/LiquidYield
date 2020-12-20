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
  Collapse,
  Container,
  Row,
  Table,
  Spinner,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import AAVE from "../assets/img/brand/aave.jpg";
import AAVEPool from "../assets/img/brand/aavepoolex.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import UniswapLogo from "../assets/img/brand/uniswap.png";
import SushiSwapLogo from "../assets/img/brand/sushiswaplogo.PNG";
import { masterchefClient } from "components/Data/MasterChefClient";
import { sushiswapClient } from "components/Data/SushiSwapClient";
import {
  GET_DERIVED_ETH,
  GET_REWARD_POOLS,
  GET_TOTAL_ALLOC,
  GET_POOL_INFO,
} from "components/Data/Query.js";
import UniCalc from "components/Data/UniCalc.js";
import SushiCalc from "components/Data/SushiCalc.js";
import { FaInfoCircle } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

let unilist = [
  ["USDT/ETH", "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852"],
  ["wBTC/ETH", "0xbb2b8038a1640196fbe3e38816f3e67cba72d940"],
  ["DAI/ETH", "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"],
  ["USDC/ETH", "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"],
  ["UNI/ETH", "0xd3d2e2692501a5c9ca623199d38826e513033a17"],
  ["LINK/ETH", "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974"],
  ["DPI/ETH", "0x4d5ef58aac27d99935e5b6b4a6778ff292059991"],
  ["AAVE/ETH", "0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f"],
  ["YFI/ETH", "0x2fdbadf3c4d5a8666bc06645b8358ab803996e28"],
  ["PICKLE/ETH", "0xdc98556ce24f007a5ef6dc1ce96322d65832a819"],
  ["SUSHI/ETH", "0xce84867c3c02b05dc570d0135103d3fb9cc19433"],
  ["SNX/ETH", "0x43ae24960e5534731fc831386c07755a2dc33d47"],
  ["sUSD/ETH", "0xf80758ab42c3b07da84053fd88804bcb6baa4b5c"],
  ["COMP/ETH", "0xcffdded873554f362ac02f8fb1f02e5ada10516f"],
  ["UMA/ETH", "0x88d97d199b9ed37c29d846d00d443de980832a22"],
  ["BAND/ETH", "0xf421c3f2e695c2d4c0765379ccace8ade4a480d9"],
  ["REN/ETH", "0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c"],
  ["CRV/ETH", "0x3da1313ae46132a397d90d95b1424a9a7e3e0fce"],
  ["renBTC/ETH", "0x81fbef4704776cc5bba0a5df3a90056d2c6900b3"],
];

let sushilist = [
  ["SUSHI/ETH", "0x795065dcc9f64b5614c407a6efdc400da6221fb0"],
  ["USDC/ETH", "0x397ff1542f962076d0bfe58ea045ffa2d347aca0"],
  ["DAI/ETH", "0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f"],
  ["wBTC/ETH", "0xceff51756c56ceffca006cd410b03ffc46dd3a58"],
  ["USDT/ETH", "0x06da0fd433c1a5d7a4faa01111c044910a184553"],
  ["YFI/ETH", "0x088ee5007c98a9677165d78dd2109ae4a3d04d0c"],
  ["sUSD/ETH", "0xf1f85b2c54a2bd284b1cf4141d64fd171bd85539"],
  ["LINK/ETH", "0xc40d16476380e4037e6b1a2594caf6a6cc8da967"],
  ["AAVE/ETH", "0xd75ea151a61d06868e31f8988d28dfe5e9df57b4"],
  ["COMP/ETH", "0x31503dcb60119a812fee820bb7042752019f2355"],
  ["SNX/ETH", "0xa1d7b2d891e3a1f9ef4bbc5be20630c2feb1c470"],
  ["UMA/ETH", "0x001b6450083e531a5a7bf310bd2c1af4247e23d4"],
  ["BAND/ETH", "0xa75f7c2f025f470355515482bde9efa8153536a8"],
  ["UNI/ETH", "0xdafd66636e2561b0284edde37e42d192f2844d40"],
  ["YAM/ETH", "0x0f82e57804d0b1f6fab2370a43dcfad3c7cb239c"],
  ["REN/ETH", "0x611cde65dea90918c0078ac0400a72b0d25b9bb1"],
  ["CRV/ETH", "0x58dc5a51fe44589beb22e8ce67720b5bc5378009"],
];

function sortByColumn(a, colIndex, reverse) {
  if (reverse == true) {
    a.sort(sortFunction).reverse();
  } else {
    a.sort(sortFunction);
  }

  function sortFunction(a, b) {
    if (a[colIndex] === b[colIndex]) {
      return 0;
    } else {
      if (a[colIndex].charAt(0) == "$") {
        return parseInt(a[colIndex].substring(2).replace(/,/g, "")) <
          parseInt(b[colIndex].substring(2).replace(/,/g, ""))
          ? -1
          : 1;
      } else if (a[colIndex.charAt(-1) == "%"]) {
        return parseFloat(a[colIndex].substring(-2)) <
          parseFloat(b[colIndex].substring(-2))
          ? -1
          : 1;
      } else {
        return a[colIndex] < b[colIndex] ? -1 : 1;
      }
    }
  }
  return a;
}

class NewPools extends React.Component {
  state = {
    openPool: "Uniswap",
    imagepool: AAVEPool,
    title: UniswapLogo,
    poolRewards: {},
    unidata: [{}],
    sushidata: [{}],
    data: [{}],
    activeColumn: -1,
    lastActiveColumn: 0,
    toggle: false,
    sushiToolTip: false,
    roiToolTip: false,
    loadingUni: false,
    loadingSushi: false,
    infoIcon: <i className="plus circle icon"></i>,
    infoOpen: false,
  };

  handleClick(title, key) {
    if (this.state.activeColumn === key) {
      let toggle = !this.state.toggle;
      this.setState({
        toggle: toggle,
        activeColumn: key,
        rows: sortByColumn(this.state.data, title, toggle),
      });
    } else {
      this.setState({
        activeColumn: key,
        rows: sortByColumn(this.state.data, title, false),
      });
    }
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async componentDidMount() {
    let uniArray = [];
    let sushiArray = [];
    this.setState({ loadingUni: true });
    this.setState({ loadingSushi: true });
    await this.asyncForEach(unilist, async (element) => {
      let newObj = await UniCalc(element[0], element[1]);
      uniArray.push(newObj);
    });
    this.state.unidata = uniArray;
    this.setState({ loadingUni: false });
    if (this.state.openPool == "Uniswap") {
      this.setState({ data: this.state.unidata });
    }
    await this.asyncForEach(sushilist, async (element) => {
      let newObj = await SushiCalc(element[0], element[1]);
      sushiArray.push(newObj);
    });
    this.state.sushidata = sushiArray;
    this.setState({ loadingSushi: false });
    if (this.state.openPool == "SushiSwap") {
      this.setState({ data: this.state.sushidata });
    }
  }

  setUniswap = () => {
    this.setState({
      openPool: "Uniswap",
      imagepool: AAVEPool,
      title: UniswapLogo,
      toggle: false,
      activeColumn: -1,
      lastActiveColumn: 0,
      data: this.state.unidata,
    });
  };
  setSushiSwap = () => {
    this.setState({
      openPool: "SushiSwap",
      imagepool: AAVEPool,
      title: SushiSwapLogo,
      toggle: false,
      activeColumn: -1,
      lastActiveColumn: 0,
      data: this.state.sushidata,
    });
  };

  displayNotes = () => {
    if (this.state.openPool == "Uniswap") {
      return <></>;
    } else if (this.state.openPool == "SushiSwap") {
      return <></>;
    } else {
      return <></>;
    }
  };

  getTooltip = (title) => {
    if (title == "Estimated ROI (30d)") {
      return (
        <></>
        /*         <React.Fragment>
          <FaInfoCircle data-tip data-for="roitip" />
          <ReactTooltip id="roitip" place="top" type="info" effect="float">
            Why is 30d ROI the only metric shown, where is APR? The short answer
            is that the margin error for APR estimates is to great that I feel
            30 days is the maximum period for which these estimates are
            applicable. For more info on this visit the{" "}
            <a href="/education#apr">APR, APY, and ROI section</a> in the
            education center.
          </ReactTooltip>
        </React.Fragment> */
      );
    } else if (title == "Estimated Sushi Rewards (30d)") {
      return (
        <React.Fragment>
          <FaInfoCircle data-tip data-for="sushitip" />
          <ReactTooltip id="sushitip" place="top" type="info" effect="float">
            Sushi rewards are subject to a vesting schedule. 1/3 of Sushi is
            available immediately and 2/3 is locked for 6 months.
          </ReactTooltip>
        </React.Fragment>
      );
    } else {
      return <></>;
    }
  };

  loadingSpin = () => {
    if (
      (this.state.openPool == "Uniswap" && this.state.loadingUni == true) ||
      (this.state.openPool == "SushiSwap" && this.state.loadingSushi == true)
    ) {
      return (
        <div className="spinny">
          <Spinner style={{ width: "5em", height: "5em" }} color="white" />
        </div>
      );
    } else {
      return <></>;
    }
  };

  handleInfoClick = () => {
    if (this.state.infoOpen == false) {
      this.setState({ infoIcon: <i className="minus circle icon"></i> });
    } else {
      this.setState({ infoIcon: <i className="plus circle icon"></i> });
    }
    this.setState({ infoOpen: !this.state.infoOpen });
  };

  displayPools = () => {
    if (
      (this.state.loadingUni == false && this.state.openPool == "Uniswap") ||
      (this.state.loadingSushi == false && this.state.openPool == "SushiSwap")
    ) {
      return (
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              {Object.keys(this.state.data[0]).map((title, key) => {
                return (
                  <th
                    key={key}
                    onClick={() => this.handleClick(title, key)}
                    scope="col"
                    data-label={title}
                  >
                    {title + " "}
                    {this.getTooltip(title)}
                    {this.state.activeColumn === key
                      ? this.state.toggle
                        ? " ↓"
                        : " ↑"
                      : ""}
                  </th>
                );
              })}

              {/*               <th scope="col">Liquidity Pool</th>
              <th scope="col">Total Liquidity (USD)</th>
              <th scope="col">24h Volume (USD)</th>
              <th scope="col">Estimated Fees (30d)</th>
              <th scope="col">Estimated Impermanent Loss (30d)</th>
              <th scope="col">Estimated ROI (30d)</th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function (row, key) {
              return (
                <tr key={key}>
                  {Object.keys(row).map(function (entry, key) {
                    return (
                      <td scope="row" key={key} data-label={entry}>
                        {row[entry]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else {
      return <></>;
    }
  };
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container
          className="mt--7"
          fluid
          style={{
            backgroundImage: `url(${AAVE})`,
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="zapheader">
            <img
              src={this.state.imagepool}
              className="poolexplorer"
              alt="Pool Explorer"
            ></img>
          </div>
          <div className="buttonrow">
            <Button onClick={this.setUniswap}>Uniswap</Button>

            <Button onClick={this.setSushiSwap}>SushiSwap</Button>
          </div>
          {/* Table */}
          <Row>
            <div className="col">
              {/*               <a href="/education">
                Why is 30d ROI the only metric shown, where is APR?
              </a> */}
              <Card className="shadow">
                <CardHeader className="border-0">
                  <img
                    src={this.state.title}
                    alt="Market Header"
                    className="tableheaderimg"
                  ></img>
                  {this.displayNotes()}
                </CardHeader>

                {this.displayPools()}
              </Card>
              {this.loadingSpin()}
              <div className="info">
                <div className="infoicon" onClick={this.handleInfoClick}>
                  {this.state.infoIcon}
                </div>
                <h3 className="infoicon">How are these values calculated?</h3>
                <Collapse isOpen={this.state.infoOpen} className="infocontent">
                  <h3>Liquidity:</h3>
                  <p>Current USD value of assets locked in the pool.</p>
                  <h3>Volume:</h3>
                  <p>
                    Total value of assets swapped in the pool over the last 24
                    hours.
                  </p>
                  <h3>Fees:</h3>
                  <p>
                    Estimated by taking the average daily return over the last
                    30 days and multiplying by 30. The average daily return is
                    calculated by averaging the volume * 0.003 (0.3% trading fee
                    paid to liquidity providers) / pool liquidity for the day.
                  </p>
                  <h3>Impermanent Loss:</h3>
                  <p>
                    Estimated by taking the price divergence for the two assets
                    in the pool over the last 30 days, and plugging this value
                    into the IL curve described <a href="/education#il">here</a>
                  </p>
                  <h3>Sushi Rewards:</h3>
                  <p>
                    Calculated using the current Sushi emission rate for the
                    given pool, the price of Sushi, and the amount of liquidity
                    staked in the Masterchef contract. The full calculation is
                    described{" "}
                    <a href="https://github.com/sushiswap/sushi-data/pull/7">
                      here
                    </a>
                    .
                  </p>
                  <h3>ROI:</h3>
                  <p>
                    The ROI is simply the combination of fees, impermanent loss,
                    and liquidity mining rewards.
                  </p>
                </Collapse>
              </div>
              {/*               <Card className="data">
                Data From <a href="https://thegraph.com/">The Graph</a> and{" "}
                <a href="https://uniswaproi.com">UniswapROI</a>
              </Card> */}
            </div>
          </Row>
          <AdminFooter />
        </Container>
      </>
    );
  }
}

export default NewPools;
