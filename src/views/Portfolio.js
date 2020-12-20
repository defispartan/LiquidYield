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
// reactstrap components
import { Card, Container, Row, Table } from "reactstrap";

import Uniswap from "assets/img/brand/uniswap.png";
import Aave from "assets/img/brand/aave.png";

import Header from "components/Headers/Header.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <div className="data"></div>
          <h2 style={{ textAlign: "center" }}>Coming Soon...</h2>
          {/*           <Card className="data">
            Portfolio information from{" "}
            <a href="https://uniswaproi.com">UniswapROI</a>
          </Card> 
          <AdminFooter />
          */}
        </Container>
      </>
    );
  }
}

export default Portfolio;
