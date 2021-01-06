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
import { Card, Button, Container } from "reactstrap";
// core components
import { Icon, Modal, Header, Button as Button2 } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import AdminFooter from "../components/Footers/AdminFooter.js";
import PortfolioHeader from "assets/img/brand/portfolioheader.png";

// Component which basically just diplays a Connect wallet button
const ZapPlain = ({ connect, alert, setAlert }) => {
  const [alertSet, setAlertNotif] = useState(false); // Display alert if there was an error connecting to Web3 wallet

  useEffect(() => {
    if (alert != null) {
      setAlertNotif(true);
    }
  }, [alert]);

  // Clears alert
  const alertCancel = () => {
    setAlertNotif(false);
    setAlert(null);
  };

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

      <div className="wrapper">
        <Container className="mt--7 bg-dark" fluid>
          <div className="zapheader">
            <img
              src={PortfolioHeader}
              className="portcardheader"
              alt="Portfolio Header"
            ></img>
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
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default ZapPlain;
