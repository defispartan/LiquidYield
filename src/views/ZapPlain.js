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
import {
  Dropdown,
  Input,
  Label,
  Icon,
  Modal,
  Header,
  Button as Button2,
} from "semantic-ui-react";
import React, { useState, useEffect } from "react";

const ZapPlain = ({ connect, alert, setAlert }) => {
  const [walletConnected, setConnect] = useState(false);
  const [zapMode, setZapMode] = useState("simple");
  const [alertSet, setAlertNotif] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [aboutIcon, setAboutIcon] = useState(
    <i className="plus circle icon"></i>
  );
  const [disclaimerIcon, setDisclaimerIcon] = useState(
    <i className="plus circle icon"></i>
  );
  useEffect(() => {
    if (alert != null) {
      setAlertNotif(true);
    }
  });
  const alertCancel = () => {
    setAlertNotif(false);
    setAlert(null);
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

  const setSimpleMode = () => {
    setZapMode("simple");
  };
  const setAdvancedMode = () => {
    setZapMode("advanced");
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

  return (
    <>
      {/* Page content */}
      <Modal open={alertSet} basic size="small">
        <Header icon="exclamation circle" content="Alert" />
        <Modal.Content>
          <p>{alert}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button2 basic color="red" onClick={alertCancel} inverted>
            <Icon name="remove" /> Close
          </Button2>
        </Modal.Actions>
      </Modal>
      <Container className="mt--7" fluid>
        <div className="zapheader">
          <h1>
            Liquid Ether Zap <i className="bolt icon text-yellow" />
          </h1>
          <div className="buttonrow">
            <Button
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
            </Button>
          </div>
        </div>
        <Card body className="zap">
          <Button
            className="connectbutton"
            onClick={() => connect()}
            color="primary"
          >
            Connect Wallet
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

export default ZapPlain;