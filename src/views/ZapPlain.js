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
import { Icon, Modal, Header, Button as Button2 } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import LEZHeader from "../assets/img/brand/lezheader.png";
import LEZ from "../assets/img/brand/lezwhite.png";
import AdminFooter from "../components/Footers/AdminFooter.js";

// Component for displaying blank Zap page with option to connect wallet
const ZapPlain = ({ connect, alert, setAlert }) => {
  const [alertSet, setAlertNotif] = useState(false); // Stores any errors that occur when connecting to Web3 wallet
  const [aboutOpen, setAboutOpen] = useState(false); // Toggle for About section
  const [disclaimerOpen, setDisclaimerOpen] = useState(false); // Toggle for disclaimer section
  const [aboutIcon, setAboutIcon] = useState(
    <i className="plus circle icon"></i> // Icon for About section toggle
  );
  const [disclaimerIcon, setDisclaimerIcon] = useState(
    <i className="plus circle icon"></i> // Icon for disclaimer toggle
  );

  // Display alert
  useEffect(() => {
    if (alert != null) {
      setAlertNotif(true);
    }
  });

  // Clears alert when user clicks cancel
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

  return (
    <>
      {/* Page content */}
      <Modal open={alertSet} basic size="small">
        <Header icon="exclamation circle" content="Alert" />
        <Modal.Content>
          <p className="indexcontent">{alert}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button2 basic color="red" onClick={alertCancel} inverted>
            <Icon name="remove" /> Close
          </Button2>
        </Modal.Actions>
      </Modal>
      <Container className="mt--7 bg-dark" fluid>
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
            <h4 style={{ color: "red" }}>Coming Soon</h4>
            <p className="indexcontent">
              With the recent release of{" "}
              <a href="https://medium.com/aave/the-aave-protocol-v2-f06f299cee04">
                AAVE V2
              </a>
              , new doors are opened for optimizing the performance of the zap
              and feature upgrades including native collateral swaps. The next
              step is to propose the creation of Uniswap V2 and SushiSwap
              markets. These proposals are in the works and I'll post
              information on how to participate in the AAVE governance process
              when they're ready.
            </p>
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

        <div className="about" style={{color:"white"}}>
          <div className="abouticon" onClick={toggleAboutOpen}>
            {aboutIcon}
          </div>
          <h3 className="abouticon" style={{color:"white"}}>About</h3>
          <Collapse isOpen={aboutOpen} className="aboutcontent" style={{color:"white"}}>
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
            <p className="indexcontent"> There are two main risks associated with executing this zap:</p>
            <h4 className="indexcontent">Smart Contract Risk</h4>
            <p></p>
            <h4 className="indexcontent">Liquidation Risk</h4>
            <p className="Indexcontent">
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

export default ZapPlain;
