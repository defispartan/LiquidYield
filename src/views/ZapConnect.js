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
import { Card, Collapse, Button, Container, Row } from "reactstrap";
// core components
import { Dropdown, Input, Label } from "semantic-ui-react";
import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData } = newContextComponents;

const ZapConnect = ({ disconnect }) => {
  const [aboutOpen, setAboutOpen] = useState(false);
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
  console.log("DRIZZLE STATE");
  console.log(state);
  const onExecute = () => {
    console.log("Execute transaction");
  };
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

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <div className="zapheader">
          <h1>
            Liquid Ether Zap <i class="bolt icon text-yellow" />
          </h1>
        </div>
        <Card body className="zap">
          <div className="walletdetails">
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
          </div>

          <div className="poolselect">
            <Dropdown
              placeholder="Select Pool"
              fluid
              search
              selection
              options={poolOptions}
              width="50%"
            />
          </div>
          <div className="ethinput">
            <Input
              className="ethinputbox"
              label={<Label>ETH</Label>}
              labelPosition="right"
              placeholder="0.0"
            />
          </div>

          <Button className="connectbutton" onClick={onExecute} color="primary">
            Execute Zap
          </Button>
        </Card>

        <div className="about">
          <div className="abouticon" onClick={toggleAboutOpen}>
            {aboutIcon}
          </div>
          <h3 className="abouticon">About</h3>
          <Collapse isOpen={aboutOpen} className="aboutcontent">
            About content
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
      </Container>
    </>
  );
};

export default ZapConnect;
