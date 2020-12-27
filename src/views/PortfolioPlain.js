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
import AdminFooter from "../components/Footers/AdminFooter.js";
import PortfolioHeader from "assets/img/brand/portfolioheader.png";

const ZapPlain = ({ connect, alert, setAlert }) => {
  const [walletConnected, setConnect] = useState(false);
  const [alertSet, setAlertNotif] = useState(false);
  useEffect(() => {
    if (alert != null) {
      setAlertNotif(true);
    }
  });
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
      <Container className="mt--7 bg-dark" fluid>
        <div className="zapheader">
          <img src={PortfolioHeader} className="portcardheader"></img>
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
    </>
  );
};

export default ZapPlain;
