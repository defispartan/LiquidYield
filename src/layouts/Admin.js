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
import PortfolioHome from "views/PortfolioHome.js";
import ZapHome from "views/ZapHome.js";
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
import UniCalcNew from "components/Data/UniCalcNew.js"
import SushiCalc from "components/Data/SushiCalc.js";
import drizzleOptions from "../drizzleOptions.js";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import routes from "routes.js";
import dayjs from "dayjs";
import {unilist, sushilist} from "components/Data/Lists.js"
const { DrizzleProvider } = drizzleReactHooks;



class Admin extends React.Component {
  state = {
    uniData: JSON.parse(localStorage.getItem("uniData")) || [{}],
    sushiData: JSON.parse(localStorage.getItem("sushiData")) || [{}],
    loadingUni: localStorage.getItem("loadingUni") || true,
    loadingSushi: localStorage.getItem("loadingSushi") || true,
    //loadingUni: true,
    //loadingSushi: true,
    walletConnected: localStorage.getItem("wallet") || false,
    lastRefreshPool: localStorage.getItem("lastRefreshPool") || null,
  };

  setWalletConnect = (status) => {
    this.setState({ walletConnected: status });
    localStorage.setItem("wallet", status);
  };

  connectWallet = () => {
    this.setState({ walletConnected: true });
    localStorage.setItem("wallet", true);
  };

  triggerRefresh = () => {
    //if (this.state.loadingSushi === true || this.state.loadingUni === true) {

    this.setState({ loadingUni: true });
    this.setState({ loadingSushi: true });

    this.fetchUni();
    this.fetchSushi();
    //}
  };

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async fetchUni() {
    let uniArray = await UniCalcNew(unilist);
    
    //let uniArray = [];
    //await this.asyncForEach(unilist, async (element) => {
    //  let newObj = await UniCalc(element[0], element[1]);
    //  uniArray.push(newObj);
    //});

    this.setState({ uniData: uniArray });
    localStorage.setItem("uniData", JSON.stringify(uniArray));
    this.setState({ loadingUni: false });
    this.setState({ lastRefreshPool: dayjs().format() });
    localStorage.setItem("lastRefreshPool", dayjs().format());
    localStorage.setItem("loadingUni", false);
  }

  async fetchSushi() {
    let sushiArray = [];

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
    localStorage.setItem("sushiData", JSON.stringify(sushiArray));
    this.setState({ loadingSushi: false });
    this.setState({ lastRefreshPool: dayjs().format() });
    localStorage.setItem("lastRefreshPool", dayjs().format());
    localStorage.setItem("loadingSushi", false);
  }

  async componentDidMount() {
    if (this.state.loadingUni === true) {
      this.fetchUni();
    }
    if (this.state.loadingSushi === true) {
      this.fetchSushi();
    }
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.path === "/portfolio") {
        return (
          <Route
            path={prop.path}
            key={key}
            render={(props) => (
              <PortfolioHome
                {...props}
                setWalletConnect={this.setWalletConnect}
                connectWallet={this.connectWallet}
                walletConnected={this.state.walletConnected}
              />
            )}
          />
        );
      } else if (prop.path === "/zap") {
        return (
          <Route
            path={prop.path}
            key={key}
            render={(props) => (
              <ZapHome
                {...props}
                setWalletConnect={this.setWalletConnect}
                connectWallet={this.connectWallet}
                walletConnected={this.state.walletConnected}
              />
            )}
          />
        );
      } else if (prop.path === "/pools") {
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
                lastRefreshPool={this.state.lastRefreshPool}
                triggerRefresh={this.triggerRefresh}
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
