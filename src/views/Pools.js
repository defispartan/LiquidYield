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
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// core components
import Header from "components/Headers/Header.js";
import Pool from "components/Data/Pool.js";
import AAVE from "../assets/img/brand/aave.jpg";
import AAVEPool from "../assets/img/brand/aavepoolex.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import AAVELogo from "../assets/img/brand/aave.png";
import UniswapLogo from "../assets/img/brand/uniswap.png";
import SushiSwapLogo from "../assets/img/brand/sushiswaplogo.PNG";

class Pools extends React.Component {
  state = {
    openPool: "Uniswap",
    image: AAVE,
    imagepool: AAVEPool,
    title: UniswapLogo,
    ethPrice: 577,
    previousEthPrice: 12,
  };

  setUniswap = () => {
    this.setState({
      openPool: "Uniswap",
      image: AAVE,
      imagepool: AAVEPool,
      title: UniswapLogo,
    });
  };
  setSushiSwap = () => {
    this.setState({
      openPool: "SushiSwap",
      image: AAVE,
      imagepool: AAVEPool,
      title: SushiSwapLogo,
    });
  };
  AAVECheck = () => {
    if (this.state.openPool == "AAVE") {
      return <h2>Uniswap Market</h2>;
    } else {
      return <></>;
    }
  };

  DisplayPools = () => {
    if (this.state.openPool == "Uniswap") {
      return (
        <React.Fragment>
          <Pool
            market={this.state.openPool}
            pair={"USDT/ETH"}
            address={"0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852"}
          />
          <Pool
            market={this.state.openPool}
            pair={"WBTC/ETH"}
            address={"0xbb2b8038a1640196fbe3e38816f3e67cba72d940"}
          />
          <Pool
            market={this.state.openPool}
            pair={"DAI/ETH"}
            address={"0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"}
          />
          <Pool
            market={this.state.openPool}
            pair={"USDC/ETH"}
            address={"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"}
          />
          <Pool
            market={this.state.openPool}
            pair={"UNI/ETH"}
            address={"0xd3d2e2692501a5c9ca623199d38826e513033a17"}
          />
          <Pool
            market={this.state.openPool}
            pair={"LINK/ETH"}
            address={"0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974"}
          />
          <Pool
            market={this.state.openPool}
            pair={"DPI/ETH"}
            address={"0x4d5ef58aac27d99935e5b6b4a6778ff292059991"}
          />
          <Pool
            market={this.state.openPool}
            pair={"AAVE/ETH"}
            address={"0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f"}
          />
          <Pool
            market={this.state.openPool}
            pair={"YFI/ETH"}
            address={"0x2fdbadf3c4d5a8666bc06645b8358ab803996e28"}
          />
          <Pool
            market={this.state.openPool}
            pair={"PICKLE/ETH"}
            address={"0xdc98556ce24f007a5ef6dc1ce96322d65832a819"}
          />
          <Pool
            market={this.state.openPool}
            pair={"USDT/ETH"}
            address={"0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852"}
          />
          <Pool
            market={this.state.openPool}
            pair={"SUSHI/ETH"}
            address={"0xce84867c3c02b05dc570d0135103d3fb9cc19433"}
          />
          <Pool
            market={this.state.openPool}
            pair={"SNX/ETH"}
            address={"0x43ae24960e5534731fc831386c07755a2dc33d47"}
          />
          <Pool
            market={this.state.openPool}
            pair={"sUSD/ETH"}
            address={"0xf80758ab42c3b07da84053fd88804bcb6baa4b5c"}
          />
          <Pool
            market={this.state.openPool}
            pair={"COMP/ETH"}
            address={"0xcffdded873554f362ac02f8fb1f02e5ada10516f"}
          />
          <Pool
            market={this.state.openPool}
            pair={"UMA/ETH"}
            address={"0x88d97d199b9ed37c29d846d00d443de980832a22"}
          />
          <Pool
            market={this.state.openPool}
            pair={"BAND/ETH"}
            address={"0xf421c3f2e695c2d4c0765379ccace8ade4a480d9"}
          />
          <Pool
            market={this.state.openPool}
            pair={"REN/ETH"}
            address={"0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c"}
          />{" "}
          <Pool
            market={this.state.openPool}
            pair={"CRV/ETH"}
            address={"0x3da1313ae46132a397d90d95b1424a9a7e3e0fce"}
          />
          <Pool
            market={this.state.openPool}
            pair={"renBTC/ETH"}
            address={"0x81fbef4704776cc5bba0a5df3a90056d2c6900b3"}
          />
        </React.Fragment>
      );
    } else if (this.state.openPool == "SushiSwap") {
      return (
        <React.Fragment>
          <Pool
            market={this.state.openPool}
            exchange={"USDT/ETH"}
            address={"0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852"}
          />
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
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
            backgroundImage: `url(${this.state.image})`,
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
              <Card className="shadow">
                <CardHeader className="border-0">
                  <img
                    src={this.state.title}
                    alt="Market Header"
                    className="tableheaderimg"
                  ></img>
                  {this.AAVECheck()}
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Liquidity Pool</th>
                      <th scope="col">Total Liquidity (USD)</th>
                      <th scope="col">24h Volume (USD)</th>
                      <th scope="col">Expected Fees (30d)</th>
                      <th scope="col">Expected Impermanent Loss (30d)</th>
                      <th scope="col">Expected ROI (30d)</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>{this.DisplayPools()}</tbody>
                </Table>
              </Card>
              <div className="data"></div>
              <Card className="data">
                Data From <a href="https://thegraph.com/">The Graph</a> and{" "}
                <a href="https://uniswaproi.com">UniswapROI</a>
              </Card>
            </div>
          </Row>
          <AdminFooter />
        </Container>
      </>
    );
  }
}

export default Pools;
