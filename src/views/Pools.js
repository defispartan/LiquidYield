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
// core components
import Header from "components/Headers/Header.js";
import UniPool from "components/Data/UniPool.js";
import SushiPool from "components/Data/SushiPool.js";
import AAVE from "../assets/img/brand/aave.jpg";
import AAVEPool from "../assets/img/brand/aavepoolex.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import AAVELogo from "../assets/img/brand/aave.png";
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
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class Pools extends React.Component {
  state = {
    openPool: "Uniswap",
    image: AAVE,
    imagepool: AAVEPool,
    title: UniswapLogo,
    poolRewards: {},
  };

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async componentDidMount() {
    const blocksPerDay = 6500;
    const sushi = await sushiswapClient.query({
      query: GET_DERIVED_ETH,
      variables: {
        id: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
      },
    });
    const derivedETH = sushi.data.token.derivedETH;
    const poolResult = await masterchefClient.query({
      query: GET_REWARD_POOLS,
      fetchPolicy: "cache-first",
    });
    const pools = poolResult.data.pools;
    const allocResult = await masterchefClient.query({
      query: GET_TOTAL_ALLOC,
      fetchPolicy: "cache-first",
    });
    const totalAlloc = allocResult.data.masterChefs[0].totalAllocPoint;
    let pool30ROI = {};
    await this.asyncForEach(pools, async (entry) => {
      const poolInfo = await sushiswapClient.query({
        query: GET_POOL_INFO,
        variables: {
          id: entry.pair,
        },
        fetchPolicy: "cache-first",
      });
      if (poolInfo.data.pair != null) {
        let totalSupply = poolInfo.data.pair.totalSupply;
        let totalValueETH = poolInfo.data.pair.reserveETH;
        let sushiPerBlock = 100 - 100 * (entry.allocPoint / totalAlloc);
        let thirtyDayROI =
          (100 *
            (derivedETH *
              blocksPerDay *
              sushiPerBlock *
              3 *
              30 *
              (entry.allocPoint / totalAlloc))) /
          (totalValueETH * (entry.slpBalance / totalSupply));

        pool30ROI[entry.pair] = thirtyDayROI;
      }
    }).then(this.setState({ poolRewards: pool30ROI }));
  }

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
          <UniPool
            market={this.state.openPool}
            pair={"USDT/ETH"}
            address={"0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"wBTC/ETH"}
            address={"0xbb2b8038a1640196fbe3e38816f3e67cba72d940"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"DAI/ETH"}
            address={"0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"USDC/ETH"}
            address={"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"UNI/ETH"}
            address={"0xd3d2e2692501a5c9ca623199d38826e513033a17"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"LINK/ETH"}
            address={"0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"DPI/ETH"}
            address={"0x4d5ef58aac27d99935e5b6b4a6778ff292059991"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"AAVE/ETH"}
            address={"0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"YFI/ETH"}
            address={"0x2fdbadf3c4d5a8666bc06645b8358ab803996e28"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"PICKLE/ETH"}
            address={"0xdc98556ce24f007a5ef6dc1ce96322d65832a819"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"USDT/ETH"}
            address={"0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"SUSHI/ETH"}
            address={"0xce84867c3c02b05dc570d0135103d3fb9cc19433"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"SNX/ETH"}
            address={"0x43ae24960e5534731fc831386c07755a2dc33d47"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"sUSD/ETH"}
            address={"0xf80758ab42c3b07da84053fd88804bcb6baa4b5c"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"COMP/ETH"}
            address={"0xcffdded873554f362ac02f8fb1f02e5ada10516f"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"UMA/ETH"}
            address={"0x88d97d199b9ed37c29d846d00d443de980832a22"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"BAND/ETH"}
            address={"0xf421c3f2e695c2d4c0765379ccace8ade4a480d9"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"REN/ETH"}
            address={"0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c"}
          />{" "}
          <UniPool
            market={this.state.openPool}
            pair={"CRV/ETH"}
            address={"0x3da1313ae46132a397d90d95b1424a9a7e3e0fce"}
          />
          <UniPool
            market={this.state.openPool}
            pair={"renBTC/ETH"}
            address={"0x81fbef4704776cc5bba0a5df3a90056d2c6900b3"}
          />
        </React.Fragment>
      );
    } else if (this.state.openPool == "SushiSwap") {
      return (
        <React.Fragment>
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"SUSHI/ETH"}
            address={"0x795065dcc9f64b5614c407a6efdc400da6221fb0"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"USDC/ETH"}
            address={"0x397ff1542f962076d0bfe58ea045ffa2d347aca0"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"DAI/ETH"}
            address={"0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"wBTC/ETH"}
            address={"0xceff51756c56ceffca006cd410b03ffc46dd3a58"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"USDT/ETH"}
            address={"0x06da0fd433c1a5d7a4faa01111c044910a184553"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"YFI/ETH"}
            address={"0x088ee5007c98a9677165d78dd2109ae4a3d04d0c"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"sUSD/ETH"}
            address={"0xf1f85b2c54a2bd284b1cf4141d64fd171bd85539"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"LINK/ETH"}
            address={"0xc40d16476380e4037e6b1a2594caf6a6cc8da967"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"AAVE/ETH"}
            address={"0xd75ea151a61d06868e31f8988d28dfe5e9df57b4"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"COMP/ETH"}
            address={"0x31503dcb60119a812fee820bb7042752019f2355"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"SNX/ETH"}
            address={"0xa1d7b2d891e3a1f9ef4bbc5be20630c2feb1c470"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"UMA/ETH"}
            address={"0x001b6450083e531a5a7bf310bd2c1af4247e23d4"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"BAND/ETH"}
            address={"0xa75f7c2f025f470355515482bde9efa8153536a8"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"UNI/ETH"}
            address={"0xdafd66636e2561b0284edde37e42d192f2844d40"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"YAM/ETH"}
            address={"0x0f82e57804d0b1f6fab2370a43dcfad3c7cb239c"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"REN/ETH"}
            address={"0x611cde65dea90918c0078ac0400a72b0d25b9bb1"}
          />
          <SushiPool
            poolRewards={this.state.poolRewards}
            market={this.state.openPool}
            pair={"CRV/ETH"}
            address={"0x58dc5a51fe44589beb22e8ce67720b5bc5378009"}
          />
        </React.Fragment>
      );
    } else {
      return (
        <tr>
          <td scope="col">Loading</td>
          <td scope="col">Loading</td>
          <td scope="col">Loading</td>
          <td scope="col">Loading</td>
          <td scope="col">Loading</td>
          <td scope="col">Loading</td>
          <td scope="col" />
        </tr>
      );
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
