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
import React, { useState } from "react";
// reactstrap components
import {
  Badge,
  Button,

  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import { sushiswapClient } from "components/Data/SushiSwapClient.js";
import { uniswapClient } from "components/Data/UniswapClient.js";
import { UNILP, SUSHILP } from "components/Data/Query.js";
import { Dropdown, Input } from "semantic-ui-react";
// core components
import Header from "components/Headers/Header.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
import LPValueImg from "../assets/img/brand/lptokenvalue.png";
import UniswapLogo from "../assets/img/brand/uniswap.png";
import SushiSwapLogo from "../assets/img/brand/sushiswaplogo.png";
import { uniPoolOptions, sushiPoolOptions, balancerPoolOptions } from "components/Data/Lists.js"
import { balancerClient } from "components/Data/balancerClient.js"
import BalancerLogo from "../assets/img/brand/balancer.png"
import DateRangePicker from '@wojtekmaj/react-daterange-picker'


const LPValue = (props) => {
  // Info for all Uniswap pools which can be searched by name


  const [market, setMarket] = useState(null); // Which protocol is selected
  const [title, setTitle] = useState(null); // Image for open protoocl
  const [client, setClient] = useState(null); // Which client should be used to fetch data from TheGraph
  const [option, setOption] = useState("Name"); // Search by name or address
  const [pool, setPool] = useState(null); // What pool is selected
  const [poolOptions, setPoolOptions] = useState(null); // Stores pool options for open protocol
  const [inputAmount, setInputAmount] = useState(null); // Stores LP Token Amount and input mode {USD, ETH}
  const [mode, setMode] = useState(null);  // {Historical, Current, Scenario} 
  const [usdValue, setUsdValue] = useState(null); // Array with current value for pair in [USD, ETH]
  const [reserves, setReserves] = useState(null); // Array of underlying token holdings for a given LP token
  const [dateRange, setDateRange] = useState(null) // Date range for historical mode
  const [loading, setLoading] = useState(false); // Is data actively being fetched

  const setUniswap = () => {
    setMarket("Uniswap");
    setClient(uniswapClient);
    setTitle(UniswapLogo);
    setPool(null);
    setPoolOptions(uniPoolOptions);
    setUsdValue(null);
    setReserves(null);
  };
  const setSushiSwap = () => {
    setMarket("SushiSwap");
    setClient(sushiswapClient);
    setTitle(SushiSwapLogo);
    setPool(null);
    setPoolOptions(sushiPoolOptions);
    setUsdValue(null);
    setReserves(null);
  };
  const setBalancer = () => {
    setMarket("Balancer");
    setClient(balancerClient);
    setTitle(BalancerLogo);
    setPool(null);
    setPoolOptions(balancerPoolOptions);
    setUsdValue(null);
    setReserves(null);
  };


  const setName = () => {
    setOption("Name");
  };
  const setHistorical = () => {
    setMode('historical')
  }
  const setCurrent = () => {
    setMode('current')
  }
  const setScenario = () => {
    setMode('scenario')
  }

  const setAddress = () => {
    setOption("Address");
  };

  const getPool = (e, data) => {
    setPool(data.value);
  };

  const getRange = (e, data) => {
    setDateRange(data)
    console.log("DATE RANGE SET ")
    console.log(e)
  }

  const getInput = (e, data) => {
    setInputAmount(data.value);
  };

  // Given a protocol, and LP token amount, get the value from TheGraph
  const calculateValue = async () => {
    if (pool != null && inputAmount != null) {
      setUsdValue(null);
      setReserves(null);
      setLoading(true);
      if (market === "Uniswap") {
        const result = await client.query({
          query: UNILP,
          variables: {
            id: pool,
          },
          fetchPolicy: "cache-first",
        });

        let pair = result.data.pair;
        let percent = inputAmount / parseFloat(pair.totalSupply);
        setUsdValue(parseFloat(pair.reserveUSD) * percent);
        let output = [
          pair.reserve0 * percent,
          pair.token0.name,
          pair.reserve1 * percent,
          pair.token1.name,
        ];
        setReserves(output);
        setLoading(false);
      } else if (market === "SushiSwap") {
        const result = await client.query({
          query: SUSHILP,
          variables: {
            id: pool,
          },
          fetchPolicy: "cache-first",
        });
        let pair = result.data.pair;
        let percent = inputAmount / parseFloat(pair.totalSupply);
        setUsdValue(parseFloat(pair.reserveUSD) * percent);
        let output = [
          pair.reserve0 * percent,
          pair.token0.name,
          pair.reserve1 * percent,
          pair.token1.name,
        ];
        setReserves(output);
        setLoading(false);
      }
    }
  };



  const displayPoolSelectButtons = () => {
    if (option === "Name") {
      return (
        <div>

          <div className="buttonrow">
            <Button color="info" onClick={setName}>Search By Name</Button>
            <Button onClick={setAddress}>Search By Address</Button>
          </div>
          <div className="buttonrow">
            <Dropdown
              fluid
              search
              selection
              options={poolOptions}
              width="50%"
              onChange={getPool}

            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="buttonrow">
            <Button onClick={setName}>Search By Name</Button>
            <Button color="info" onClick={setAddress}>Search By Address</Button>


          </div>
          <div className="buttonrow">

            <Input className="ethinput" placeholder={pool} onChange={getPool} />
          </div>
        </div>
      );
    }
  }

  const displayPoolSelect = () => {
    return (
      <div>
        {displayPlatformSelect()}


        <div className="buttonrow">
          <div style={{ display: "inline" }}>
            <span className="lpNum">3</span>
            {"       "}<p style={{ color: "white", display: "inline" }}>Select A Liquidity Pool</p>
          </div>
        </div>

        {displayPoolSelectButtons()}







      </div>
    )
  };

  const loadingSpin = () => {
    if (loading === true) {
      return (
        <div className="spinny">
          <Spinner style={{ width: "3em", height: "3em" }} color="primary" />
        </div>
      );
    } else {
      return <></>;
    }
  };

  const displayOutput = () => {
    if (usdValue != null && reserves != null) {
      return (
        <div>
          <h2 style={{ marginTop: "60px", color: "white" }}>Holdings</h2>
          <div className="buttonrow">
            <p style={{ color: "white" }}>
              {reserves[0]} {reserves[1]}
            </p>
            <p style={{ color: "white" }}>
              {reserves[2]} {reserves[3]}
            </p>
          </div>
          <h2 style={{ color: "white" }}>USD Value</h2>
          <p style={{ marginBottom: "30px", color: "white" }}>${round(usdValue, 2)}</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const displayPlatformButtons = () => {
    if (market === 'Uniswap') {
      return (
        <React.Fragment>
          <Button color="info" onClick={setUniswap}>Uniswap</Button>
          <Button onClick={setSushiSwap}>SushiSwap</Button>
          <Button onClick={setBalancer}>Balancer</Button>
        </React.Fragment>
      );
    }
    else if (market === 'SushiSwap') {
      return (
        <React.Fragment>
          <Button onClick={setUniswap}>Uniswap</Button>
          <Button color="info" onClick={setSushiSwap}>SushiSwap</Button>
          <Button onClick={setBalancer}>Balancer</Button>
        </React.Fragment>
      );
    }
    else if (market === 'Balancer') {
      return (
        <React.Fragment>
          <Button onClick={setUniswap}>Uniswap</Button>
          <Button onClick={setSushiSwap}>SushiSwap</Button>
          <Button color="info" onClick={setBalancer}>Balancer</Button>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          <Button onClick={setUniswap}>Uniswap</Button>
          <Button onClick={setSushiSwap}>SushiSwap</Button>
          <Button onClick={setBalancer}>Balancer</Button>
        </React.Fragment>
      );
    }

  }

  const displayModeButtons = () => {

    if (mode === 'historical') {
      return (
        <React.Fragment>
          <Button color="info" onClick={setHistorical}>Historical</Button>
          <Button onClick={setCurrent}>Current</Button>
          <Button onClick={setScenario}>Scenario</Button>
        </React.Fragment>
      );
    }
    else if (mode === 'current') {
      return (
        <React.Fragment>
          <Button onClick={setHistorical}>Historical</Button>
          <Button color="info" onClick={setCurrent}>Current</Button>
          <Button onClick={setScenario}>Scenario</Button>
        </React.Fragment>
      );
    }
    else if (mode === 'scenario') {
      return (
        <React.Fragment>
          <Button onClick={setHistorical}>Historical</Button>
          <Button onClick={setCurrent}>Current</Button>
          <Button color="info" onClick={setScenario}>Scenario</Button>
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <Button onClick={setHistorical}>Historical</Button>
          <Button onClick={setCurrent}>Current</Button>
          <Button onClick={setScenario}>Scenario</Button>
        </React.Fragment>
      )
    }

  }

  const displayInputTypeButtons = () => {
    if (option === "Name") {
      return (
        <React.Fragment>

          <Button color="info" onClick={setName}>By Name</Button>

          <Button onClick={setAddress}>By Contract Address</Button>
        </React.Fragment>
      )
    }
    else {
      return (

        <React.Fragment>

          <Button onClick={setName}>By Name</Button>

          <Button color="info" onClick={setAddress}>By Contract Address</Button>
        </React.Fragment>
      )
    }
  }

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  const displayModeSelect = () => {

    return (
      <div>

        <div className="buttonrow">
          <div style={{ display: "inline" }}>
            <span className="lpNum">1</span>
            {"       "}<p style={{ color: "white", display: "inline" }}>Select A Mode</p>
          </div>
        </div>
        <div className="buttonrow">
          {displayModeButtons()}

        </div>
      </div>
    )
  }

  const displayPlatformSelect = () => {
    return (<div>
      {displayModeSelect()}
      <div className="buttonrow">
        <div style={{ display: "inline" }}>
          <span className="lpNum">2</span>
          {"       "}<p style={{ color: "white", display: "inline" }}>Select An Exchange</p>
        </div>
      </div>
      <div className="buttonrow">
        {displayPlatformButtons()}

      </div>

    </div>)
  }



  const displayMode = () => {
    if (mode === 'historical') {
      return (
        <div>
          {displayPoolSelect()}
          <div className="buttonrow">
            <div style={{ display: "inline" }}>
              <span className="lpNum">4</span>
              {"       "}<p style={{ color: "white", display: "inline" }}>Select a Date Range</p>
            </div>
          </div>
          <div className="buttonrow">

            <DateRangePicker style={{ color: "white" }} onChange={getRange} className="ethinput" />


          </div>
          <div className="buttonrow">

            <Button
              className="ethinputbox"
              onClick={calculateValue}
              color="primary"
            >
              Get Value
            </Button>
            {loadingSpin()}
            {displayOutput()}
          </div>
        </div>
      )
    }
    else if (mode === 'current') {

      return (
        <div>
          {displayPoolSelect()}
          <div className="buttonrow">
            <div style={{ display: "inline" }}>
              <span className="lpNum">4</span>
              {"       "}<p style={{ color: "white", display: "inline" }}>Select an LP Token Amount</p>
            </div>
          </div>
          <div className="buttonrow">
            <div className="ethinput">
              <Input
                className="ethinputbox"
                placeholder="0.0"
                onChange={getInput}
              />
            </div>

          </div>
          <div className="buttonrow">

            <Button
              className="ethinputbox"
              onClick={calculateValue}
              color="primary"
            >
              Get Value
            </Button>
            {loadingSpin()}
            {displayOutput()}
          </div>
        </div>
      )

    }

    else {

    }
  }

  const displayModule = () => {
    if (mode === null) {
      return (
        displayModeSelect())
    }
    else if (market === null) {

      return (
        displayPlatformSelect())


    }
    else if (pool === null) {
      return (
        displayPoolSelect()
      )
    }
    else {
      return (

        displayMode()
      )
    }



    return (
      <div>

        <div className="buttonrow">
          {displayModeSelect()}

        </div>
        <div className="buttonrow">
          {displayPlatformSelect()}
        </div>
        <div className="buttonrow">
          {displayPoolSelect()}
        </div>
        <div className="buttonrow">
          {displayMode(mode)}
        </div>
        <Row>
          <div className="col">
            <Card className="zap">
              <CardHeader className="border-0">
                <img
                  src={title}
                  alt="Market Header"
                  className="lpcardheader"
                ></img>
              </CardHeader>
              <CardBody>
                <div className="buttonrow">
                  {displayInputTypeButtons()}

                </div>
                <h2>Select Pool</h2>
                <div className="poolselect">{displayPoolSelect()}</div>
                <h2>LP Token Amount</h2>
                <div className="ethinput">
                  <Input
                    className="ethinputbox"
                    placeholder="0.0"
                    onChange={getInput}
                  />
                </div>
                <Button
                  className="connectbutton"
                  onClick={calculateValue}
                  color="primary"
                >
                  Get Value
            </Button>
                {loadingSpin()}
                {displayOutput()}
              </CardBody>
            </Card>
            <div className="data"></div>
            {/*             <Card className="data">
          Data From <a href="https://thegraph.com/">The Graph</a>
        </Card> */}
          </div>
        </Row>
      </div>
    )
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 bg-dark" fluid>
        <div className="zapheader">
          <img
            src={LPValueImg}
            className="poolexplorer"
            alt="LP Token Value"
          ></img>
        </div>
        {displayModule()}

        <AdminFooter />
      </Container>
    </>
  );
};

export default LPValue;
