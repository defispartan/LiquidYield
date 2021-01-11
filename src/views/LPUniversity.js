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


import React, { useState, useEffect } from "react";
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
import LPValueImg from "../assets/img/brand/lpuniversity.png";
import UniswapLogo from "../assets/img/brand/uniswap.png";
import SushiSwapLogo from "../assets/img/brand/sushiswaplogo.png";

const LPUniversity = (props) => {


 
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <div className="zapheader">
          <img
            src={LPValueImg}
            className="poolexplorer"
            alt="LP Token Value"
          ></img>
        </div>
        <div className="buttonrow">
          <Button>Level 1</Button>
          <Button>level 2</Button>
          <Button>Level 3</Button>
          <Button>Level 4</Button>
        </div>
        {/* Table */}
       
        <AdminFooter />
      </Container>
    </>
  );
};

export default LPUniversity;
