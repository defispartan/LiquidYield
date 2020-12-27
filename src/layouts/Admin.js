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
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
import axios from "axios";
// core components
import NewPools from "views/NewPools.js";
import Sidebar from "components/Sidebar/Sidebar.js";
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

import routes from "routes.js";

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

let uniaddresslist = [
  "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
  "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
  "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
  "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
  "0xd3d2e2692501a5c9ca623199d38826e513033a17",
  "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974",
  "0x4d5ef58aac27d99935e5b6b4a6778ff292059991",
  "0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f",
  "0x2fdbadf3c4d5a8666bc06645b8358ab803996e28",
  "0xdc98556ce24f007a5ef6dc1ce96322d65832a819",
  "0xce84867c3c02b05dc570d0135103d3fb9cc19433",
  "0x43ae24960e5534731fc831386c07755a2dc33d47",
  "0xf80758ab42c3b07da84053fd88804bcb6baa4b5c",
  "0xcffdded873554f362ac02f8fb1f02e5ada10516f",
  "0x88d97d199b9ed37c29d846d00d443de980832a22",
  "0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c",
  "0x3da1313ae46132a397d90d95b1424a9a7e3e0fce",
  "0x81fbef4704776cc5bba0a5df3a90056d2c6900b3",
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

class Admin extends React.Component {
  state = {
    uniData: [{}],
    sushiData: [{}],
    loadingUni: true,
    loadingSushi: true,
  };

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  async componentDidMount() {
    /* const uniswaproikey = process.env.REACT_APP_uniswaproiapikey;
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://api.uniswaproi.com/all_pools_returns",
      {
        params: { api_key: uniswaproikey },
      }
    );
    let uniswaproidata = [];
    if (response.status === "ok") {
      uniswaproidata = response.data;
      console.log("Uniswap ROI Data Fetched");
    } */
    let uniArray = [];
    let sushiArray = [];
    this.setState({ loadingUni: true });
    this.setState({ loadingSushi: true });
    await this.asyncForEach(unilist, async (element) => {
      let newObj = await UniCalc(element[0], element[1]);
      uniArray.push(newObj);
    });
    this.setState({ uniData: uniArray });
    this.setState({ loadingUni: false });

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
    });
    let rewards = pool30ROI;
    await this.asyncForEach(sushilist, async (element) => {
      let newObj = await SushiCalc(element[0], element[1], rewards);
      sushiArray.push(newObj);
    });
    this.setState({ sushiData: sushiArray });
    this.setState({ loadingSushi: false });
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.path === "/pools") {
        return (
          <Route
            path={prop.path}
            key={key}
            render={(props) => (
              <NewPools
                {...props}
                uniData={this.state.uniData}
                sushiData={this.state.sushiData}
                loadingUni={this.state.loadingUni}
                loadingSushi={this.state.loadingSushi}
              />
            )}
          />
        );
      } else if (prop.layout === "admin") {
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/index",
            imgSrc: require("assets/img/brand/liquidyieldblue.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/index" />
          </Switch>
        </div>
      </>
    );
  }
}

export default Admin;
