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
import {uniPoolOptions, sushiPoolOptions} from "components/Data/Lists.js"

const LPValue = (props) => {
  // Info for all Uniswap pools which can be searched by name


  const [market, setMarket] = useState("Uniswap"); // Which protocol is selected
  const [title, setTitle] = useState(UniswapLogo); // Image for open protoocl
  const [client, setClient] = useState(uniswapClient); // Which client should be used to fetch data from TheGraph
  const [option, setOption] = useState("Name"); // Search by name or address
  const [pool, setPool] = useState(null); // What pool is selected
  const [poolOptions, setPoolOptions] = useState(uniPoolOptions); // Stores pool options for open protocol
  const [inputAmount, setInputAmount] = useState(null); // Stores LP Token Amount
  const [usdValue, setUsdValue] = useState(null);
  const [reserves, setReserves] = useState(null);
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
  const setName = () => {
    setOption("Name");
  };
  const setAddress = () => {
    setOption("Address");
  };

  const getPool = (e, data) => {
    setPool(data.value);
  };

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

  const displayPoolSelect = () => {
    if (option === "Name") {
      return (
        <Dropdown
          fluid
          search
          selection
          options={poolOptions}
          width="50%"
          onChange={getPool}
        />
      );
    } else {
      return (
        <Input className="ethinputbox" placeholder="" onChange={getPool} />
      );
    }
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
          <h2 style={{ marginTop: "30px" }}>Holdings</h2>
          <div className="buttonrow">
            <p>
              {reserves[0]} {reserves[1]}
            </p>
            <p>
              {reserves[2]} {reserves[3]}
            </p>
          </div>
          <h2>USD Value</h2>
          <p style={{ marginBottom: "30px" }}>${round(usdValue, 2)}</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const displayButtons = () => {
    if(market === 'Uniswap'){
      return(
        <React.Fragment>
        <Button color="info" onClick={setUniswap}>Uniswap</Button>
        <Button onClick={setSushiSwap}>SushiSwap</Button>
        </React.Fragment>
      );
    }
    else if(market === 'SushiSwap'){
      return (
        <React.Fragment>
        <Button onClick={setUniswap}>Uniswap</Button>
        <Button color="info" onClick={setSushiSwap}>SushiSwap</Button>
        </React.Fragment>
    );
    }

  }

  const displayInputTypeButtons = () => {
    if(option === "Name"){
    return (
      <React.Fragment>

      <Button color="info" onClick={setName}>By Name</Button>

      <Button onClick={setAddress}>By Contract Address</Button>
      </React.Fragment>
    )
    }
    else{
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
        <div className="buttonrow">
          {displayButtons()}
        </div>
        {/* Table */}
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
        <AdminFooter />
      </Container>
    </>
  );
};

export default LPValue;
