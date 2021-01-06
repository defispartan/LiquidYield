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

// reactstrap components
import { Card, Collapse, Button, Container, Row, Alert } from "reactstrap";
import LEZHeader from "assets/img/brand/LEZHeader.png";
import LEZ from "assets/img/brand/LEZ.png";
// core components
import { Dropdown, Input, Label } from "semantic-ui-react";
import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import AdminFooter from "../components/Footers/AdminFooter.js";
import { newContextComponents } from "@drizzle/react-components";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData } = newContextComponents;

const ZapConnect = ({ disconnect }) => {
  const [zapMode, setZapMode] = useState("simple");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ethInput, setEthInput] = useState(null);
  const [poolSelect, setPoolSelect] = useState(null);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [aboutIcon, setAboutIcon] = useState(
    <i className="plus circle icon"></i>
  );
  const [disclaimerIcon, setDisclaimerIcon] = useState(
    <i className="plus circle icon"></i>
  );

  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);
  const networkMap = {
    1: "Mainnet",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    42: "Kovan",
  };

  const onExecute = () => {};
  const toggleAboutOpen = () => {
    if (aboutOpen == false) {
      setAboutIcon(<i className="minus circle icon"></i>);
    } else {
      setAboutIcon(<i className="plus circle icon"></i>);
    }
    setAboutOpen(!aboutOpen);
  };
  const toggleDisclaimerOpen = () => {
    if (disclaimerOpen == false) {
      setDisclaimerIcon(<i className="minus circle icon"></i>);
    } else {
      setDisclaimerIcon(<i className="plus circle icon"></i>);
    }
    setDisclaimerOpen(!disclaimerOpen);
  };

  const setSimpleMode = () => {
    setZapMode("simple");
  };
  const setAdvancedMode = () => {
    setZapMode("advanced");
  };
  const displayOutput = () => {
    if (poolSelect != null && ethInput != null) {
      let ethIn = parseFloat(ethInput);
      ethIn = ethIn / 2.0;
      return (
        <div>
          <h2>Output</h2>
          <div className="buttonrow">
            <Button>
              {ethIn} a{poolSelect}
            </Button>
            <Button>{ethIn} aETH</Button>
          </div>
          <h2>Estimated Gas Cost</h2>
          <p style={{ marginBottom: "30px" }}>
            3750000 gas @ 20.5 gwei = $3.54
          </p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const poolOptions = [
    {
      key: "dai",
      value: "UNI-V1 ETH/DAI",
      image: {
        avatar: true,
        src: "https://cdn.worldvectorlogo.com/logos/dai-2.svg",
      },

      text: "UNI-V1 ETH/DAI",
    },
    {
      key: "lend",
      value: "UNI-V1 ETH/LEND",
      image: {
        avatar: true,
        src: "https://cdn.worldvectorlogo.com/logos/ethlend.svg",
      },
      text: "UNI-V1 ETH/LEND",
    },
    {
      key: "link",
      value: "UNI-V1 ETH/LINK",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/chainlink-link-logo.png",
      },
      text: "UNI-V1 ETH/LINK",
    },
    {
      key: "mkr",
      value: "UNI-V1 ETH/MKR",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/maker-mkr-logo.png",
      },
      text: "UNI-V1 ETH/MKR",
    },
    {
      key: "seth",
      value: "UNI-V1 ETH/sETH",
      image: {
        avatar: true,
        src: "https://blog.synthetix.io/content/images/2019/01/SNX_300x300.png",
      },
      text: "UNI-V1 ETH/sETH",
    },
    {
      key: "usdc",
      value: "UNI-V1 ETH/USDC",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      },
      text: "UNI-V1 ETH/USDC",
    },
  ];

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  const getPool = (e, data) => {
    setPoolSelect(data.value);
  };

  const getInput = (e, data) => {
    setEthInput(data.value);
  };

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <div className="zapheader">
          <img src={LEZHeader} className="poolexplorer"></img>

          <div
            className="buttonrow"
            style={{
              textAlign: "center",
              width: "50%",
              margin: "0 auto",
              minWidth: "300px",
            }}
          >
            {/*             <Button
              onClick={setSimpleMode}
              className={"simple" === zapMode ? "selected" : ""}
            >
              Simple
            </Button>
            <Button
              onClick={setAdvancedMode}
              className={"advanced" === zapMode ? "selected" : ""}
            >
              Advanced
            </Button> */}
            <h4
              style={{
                color: "red",
              }}
            >
              Coming Soon
            </h4>
            <p>
              With the recent release of{" "}
              <a href="https://medium.com/aave/the-aave-protocol-v2-f06f299cee04">
                AAVE V2
              </a>
              , new doors are opened for optimizing the performance of the zap
              and feature upgrades including native collateral swaps. The next
              step is to propose the creation of Uniswap V2 and SushiSwap
              markets. These proposals are in the works and I'll post
              information on how to particpate in the AAVE governance process
              when they're ready.
            </p>
          </div>
        </div>
        <Card body className="zap">
          <h2 style={{ marginTop: "30px" }}>Select Pool</h2>
          <div className="poolselect">
            <Dropdown
              placeholder="Select Pool"
              fluid
              search
              selection
              options={poolOptions}
              width="50%"
              onChange={getPool}
            />
          </div>
          <h2>Input</h2>
          <div className="ethinput">
            <Input
              className="ethinputbox"
              label={<Label>ETH</Label>}
              labelPosition="right"
              placeholder="0.0"
              onChange={getInput}
            />
          </div>
          {displayOutput()}
          <Button className="connectbutton" onClick={onExecute} color="primary">
            Execute Zap
          </Button>
        </Card>
        <Card className="walletdetails">
          <h4>Network:</h4> <p>{networkMap[state.web3.networkId]}</p>
          <h4>Wallet:</h4> <p>{state.accounts[0]}</p>
          <h4>Balance:</h4>{" "}
          <p>
            {round(
              state.accountBalances[state.accounts[0]] / 1000000000000000000,
              5
            )}{" "}
            ETH
          </p>
          <Button className="wallet" onClick={() => disconnect()}>
            Disconnect Wallet
          </Button>
        </Card>
        <div className="about">
          <div className="abouticon" onClick={toggleAboutOpen}>
            {aboutIcon}
          </div>
          <h3 className="abouticon">About</h3>
          <Collapse isOpen={aboutOpen} className="aboutcontent">
            The Liquid Ether Zap allows you to go from ETH into a liquidity pool
            while maintaining ~100% exposure to the price of ETH with the click
            of a button. Below is an example for the Uniswap ETH/DAI pair, for a
            more detailed explanation see <a href="/education#lez">here</a>.
            <img
              src={LEZ}
              alt="Liquid Ether Zap Diagram"
              className="indexlez"
            ></img>
          </Collapse>
        </div>
        <div className="disclaimer">
          <div className="disclaimericon" onClick={toggleDisclaimerOpen}>
            {disclaimerIcon}
          </div>
          <h3 className="disclaimericon">Disclaimer</h3>

          <Collapse isOpen={disclaimerOpen} className="disclaimercontent">
            <p> There are two main risks associated with executing this zap:</p>
            <h4>Smart Contract Risk</h4>
            <p></p>
            <h4>Liquidation Risk</h4>
            <p>
              This zap involves borrowing DAI against the value of your newly
              minted Uniswap liquidity tokens. It's important to note that your
              borrowing position can be liquidated if the value of borrowed DAI
              exceeds the liquidation threshold for the liquidity tokens. You
              can track the health factor of your borrowing position on the{" "}
              <a href="https://app.aave.com/dashboard/borrowings">
                Aave Borrowings Dashboard{" "}
              </a>{" "}
              . Be sure to keep enough assets deposited to keep your Health
              Factor above 1. A fantastic way to do this is by using an
              automated tool called <a href="https://9000.hal.xyz">HAL</a>. By
              using the Aave Recipe on HAL, you can have it notify you by email,
              Discord, Slack, Telegram, or Twitter when your Health Factor
              crosses a certain threshold.
            </p>
          </Collapse>
        </div>
        <AdminFooter />
      </Container>
    </>
  );
};

export default ZapConnect;
