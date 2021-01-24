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

import UniCalcNew from "components/Data/UniCalcNew.js"
import SushiCalcNew from "components/Data/SushiCalcNew.js";
import drizzleOptions from "../drizzleOptions.js";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import routes from "routes.js";
import dayjs from "dayjs";
import { unilist, sushilist } from "components/Data/Lists.js"
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
    errorActive: false,
    errorMessage: ""
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
    let [status, response] = await UniCalcNew(unilist);

    if (status === false) {

      this.setState({ uniData: response });
      localStorage.setItem("uniData", JSON.stringify(response));
      this.setState({ loadingUni: false });
      this.setState({ lastRefreshPool: dayjs().format() });
      localStorage.setItem("lastRefreshPool", dayjs().format());
      localStorage.setItem("loadingUni", false);
    }
    else {

      this.setState({ loadingUni: false });
      localStorage.setItem("loadingUni", false);
      this.setState({ errorActive: true, errorMessage: response })
    }


  }

  async fetchSushi() {

    let [status, response] = await SushiCalcNew(sushilist);
    if (status === false) {

      this.setState({ sushiData: response });
      localStorage.setItem("sushiData", JSON.stringify(response));
      this.setState({ loadingSushi: false });
      this.setState({ lastRefreshPool: dayjs().format() });
      localStorage.setItem("lastRefreshPool", dayjs().format());
      localStorage.setItem("loadingSushi", false);
    }
    else {

      this.setState({ loadingSushi: false });
      localStorage.setItem("loadingSushi", false);
      this.setState({ errorActive: true, errorMessage: response })
    }


  }

  async componentDidMount() {
    if (this.state.loadingUni === true) {
      this.fetchUni();
    }
    if (this.state.loadingSushi === true) {
      this.fetchSushi();
    }
  }

  closeError = () => {
    this.setState({ errorActive: false, errorMessage: null })
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
                errorActive={this.state.errorActive}
                errorMessage={this.state.errorMessage}
                closeAlert={this.closeError}
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
