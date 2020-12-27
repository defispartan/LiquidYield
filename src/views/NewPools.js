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
  CardHeader,
  Collapse,
  Container,
  Row,
  Table,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import AAVE from "../assets/img/brand/aave.jpg";
import AAVEPool from "../assets/img/brand/aavepoolex.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import UniswapLogo from "../assets/img/brand/uniswap.png";
import SushiSwapLogo from "../assets/img/brand/sushiswaplogo.png";

import { FaInfoCircle } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

function sortByColumn(a, colIndex, reverse) {
  if (reverse === true) {
    a.sort(sortFunction).reverse();
  } else {
    a.sort(sortFunction);
  }

  function sortFunction(a, b) {
    if (a[colIndex] === b[colIndex]) {
      return 0;
    } else {
      if (a[colIndex].charAt(0) === "$") {
        return parseInt(a[colIndex].substring(2).replace(/,/g, "")) <
          parseInt(b[colIndex].substring(2).replace(/,/g, ""))
          ? -1
          : 1;
      } else if (a[colIndex.charAt(-1) === "%"]) {
        return parseFloat(a[colIndex].substring(-2)) <
          parseFloat(b[colIndex].substring(-2))
          ? -1
          : 1;
      } else {
        return a[colIndex] < b[colIndex] ? -1 : 1;
      }
    }
  }
  return a;
}

const NewPools = (props) => {
  const [openPool, setOpenPool] = useState("Uniswap");
  const [imagePool, setImagePool] = useState(AAVEPool);
  const [title, setTitle] = useState(UniswapLogo);
  const [poolRewards, setPoolRewards] = useState({});
  const [uniData, setUniData] = useState([{}]);
  const [sushiData, setSushiData] = useState([{}]);
  const [data, setData] = useState([{}]);
  const [activeColumn, setActiveColumn] = useState(-1);
  const [lastActiveColumn, setLastActiveColumn] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [sushiToolTip, setSushiToolTip] = useState(false);
  const [roiToolTip, setRoiToolTip] = useState(false);
  const [loadingUni, setLoadingUni] = useState(props.loadingUni);
  const [loadingSushi, setLoadingSushi] = useState(props.loadingSushi);
  const [infoIcon, setInfoIcon] = useState(
    <i className="plus circle icon"></i>
  );
  const [infoOpen, setInfoOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState([
    "Name Placeholder",
    "Content",
  ]);

  const handleSetModal = () => {
    setModal(false);
  };

  useEffect(() => {
    setUniData(props.uniData);
    if (openPool === "Uniswap") {
      setData(uniData);
    }
    setLoadingUni(props.loadingUni);
    setSushiData(props.sushiData);
    if (openPool === "SushiSwap") {
      setData(sushiData);
    }
    setLoadingSushi(props.loadingSushi);
  }, [props.loadingUni, props.loadingSushi, props.uniData, props.sushiData]);

  const handleClick = (title, key) => {
    if (activeColumn === key) {
      setToggle(!toggle);
      setActiveColumn(key);
      sortByColumn(data, title, toggle);
    } else {
      setActiveColumn(key);
      sortByColumn(data, title, false);
    }
  };

  const handleRowClick = (key) => {
    if (modal === false) {
      let poolName =
        key["Liquidity Pool"].props.children[1].props.children.props.children;
      let secondAsset = poolName.split("/")[0];
      poolName = openPool + " " + poolName;
      let poolAddress = key["Address"];
      let apyvisionlink = "https://apy.vision/#/pools/" + poolAddress;
      let body = (
        <div className="modalbody">
          <p>
            For more in-depth analytics on {poolName}, get the APY.vision
            breakdown{" "}
            <a href={apyvisionlink} target="_blank">
              here
            </a>
            .
          </p>
          <p>
            To add liquidity to this pool, use{" "}
            <a href="https://zapper.fi/invest" target="_blank">
              Zapper.fi
            </a>{" "}
            to invest with ETH, {secondAsset}, or a variety of stablecoins.
          </p>
        </div>
      );
      let content = [poolName, body];
      setModalContent(content);
      setModal(true);
    }
  };

  const setUniswap = () => {
    setOpenPool("Uniswap");
    setImagePool(AAVEPool);
    setTitle(UniswapLogo);
    setToggle(false);
    setActiveColumn(-1);
    setLastActiveColumn(0);
    setData(uniData);
  };
  const setSushiSwap = () => {
    setOpenPool("SushiSwap");
    setImagePool(AAVEPool);
    setTitle(SushiSwapLogo);
    setToggle(false);
    setActiveColumn(-1);
    setLastActiveColumn(0);
    setData(sushiData);
  };

  const getTooltip = (title) => {
    if (title === "Estimated ROI (30d)") {
      return (
        <></>
        /*         <React.Fragment>
          <FaInfoCircle data-tip data-for="roitip" />
          <ReactTooltip id="roitip" place="top" type="info" effect="float">
            Why is 30d ROI the only metric shown, where is APR? The short answer
            is that the margin error for APR estimates is to great that I feel
            30 days is the maximum period for which these estimates are
            applicable. For more info on this visit the{" "}
            <a href="/education#apy">APR, APY, and ROI section</a> in the
            education center.
          </ReactTooltip>
        </React.Fragment> */
      );
    } else if (title === "Estimated Sushi Rewards (30d)") {
      return (
        <React.Fragment>
          <FaInfoCircle data-tip data-for="sushitip" />
          <ReactTooltip id="sushitip" place="top" type="info" effect="float">
            Sushi rewards are subject to a vesting schedule. 1/3 of Sushi is
            available immediately and 2/3 is locked for 6 months.
          </ReactTooltip>
        </React.Fragment>
      );
    } else {
      return <></>;
    }
  };

  const loadingSpin = () => {
    if (
      (openPool === "Uniswap" && loadingUni === true) ||
      (openPool === "SushiSwap" && loadingSushi === true)
    ) {
      return (
        <div className="loady" style={{ textAlign: "center" }}>
          <div className="spinny">
            <Spinner style={{ width: "5em", height: "5em" }} color="white" />
          </div>
          <p style={{ color: "white", paddingTop: "50px" }}>
            Note: Loading may take a minute, especially for SushiSwap where pool
            rewards are being calculated as well.
          </p>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const handleInfoClick = () => {
    if (infoOpen === false) {
      setInfoIcon(<i className="minus circle icon"></i>);
    } else {
      setInfoIcon(<i className="plus circle icon"></i>);
    }
    setInfoOpen(!infoOpen);
  };

  const displayPools = () => {
    if (
      (loadingUni === false && openPool === "Uniswap") ||
      (loadingSushi === false && openPool === "SushiSwap")
    ) {
      return (
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              {Object.keys(data[0]).map((title, key) => {
                if (title !== "Address") {
                  return (
                    <th
                      key={key}
                      onClick={() => handleClick(title, key)}
                      scope="col"
                      data-label={title}
                      className="tableHeader"
                    >
                      <p style={{ display: "inline", cursor: "pointer" }}>
                        {title + " "}
                      </p>
                      {getTooltip(title)}
                      <p style={{ cursor: "pointer", display: "inline" }}>
                        {activeColumn === key ? (toggle ? " ↓" : " ↑") : ""}
                      </p>
                    </th>
                  );
                } else {
                  return null;
                }
              })}

              {/*               <th scope="col">Liquidity Pool</th>
              <th scope="col">Total Liquidity (USD)</th>
              <th scope="col">24h Volume (USD)</th>
              <th scope="col">Estimated Fees (30d)</th>
              <th scope="col">Estimated Impermanent Loss (30d)</th>
              <th scope="col">Estimated ROI (30d)</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((row, key) => {
              return (
                <tr
                  key={key}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(row)}
                >
                  {Object.keys(row).map(function (entry, key) {
                    if (entry !== "Address") {
                      return (
                        <td scope="row" key={key} data-label={entry}>
                          {row[entry]}
                        </td>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container
        className="mt--7"
        fluid
        style={{
          backgroundImage: `url(${AAVE})`,
          height: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="zapheader">
          <img
            src={imagePool}
            className="poolexplorer"
            alt="Pool Explorer"
          ></img>
        </div>
        <div className="buttonrow">
          <Button onClick={setUniswap}>Uniswap</Button>

          <Button onClick={setSushiSwap}>SushiSwap</Button>
        </div>
        {/* Table */}
        <Row>
          <div className="col">
            {/*               <a href="/education">
                Why is 30d ROI the only metric shown, where is APR?
              </a> */}
            <Card className="shadow">
              <CardHeader className="border-0">
                <img
                  src={title}
                  alt="Market Header"
                  className="tableheaderimg"
                ></img>
              </CardHeader>

              {displayPools()}
            </Card>
            {loadingSpin()}
            <Modal isOpen={modal} centered={true}>
              <ModalHeader>{modalContent[0]}</ModalHeader>
              <ModalBody>{modalContent[1]}</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={handleSetModal}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
            <div className="info">
              <div className="infoicon" onClick={handleInfoClick}>
                {infoIcon}
              </div>
              <h3 className="infoicon">How are these values calculated?</h3>
              <Collapse isOpen={infoOpen} className="infocontent">
                <h3>Liquidity:</h3>
                <p>Current USD value of assets locked in the pool.</p>
                <h3>Volume:</h3>
                <p>
                  Total value of assets swapped in the pool over the last 24
                  hours.
                </p>
                <h3>Fees:</h3>
                <p>
                  Estimated by taking the average daily return over the last 30
                  days and multiplying by 30. The average daily return is
                  calculated by averaging (volume * trading fees percentage /
                  pool liquidity).
                </p>
                <h3>Impermanent Loss:</h3>
                <p>
                  Estimated by taking the price divergence for the two assets in
                  the pool over the last 30 days, and plugging this value into
                  the IL curve described{" "}
                  <a style={{ color: "white" }} href="/education#il">
                    here
                  </a>
                  . Estimations for this value could be improved upon by
                  factoring in volatility on a rolling 30 day windows. For now,
                  this calculation just predicts that the next month price
                  divergence will be equal to the previous month.
                </p>
                <h3>Sushi Rewards:</h3>
                <p>
                  Calculated using the current Sushi emission rate for the given
                  pool, the price of Sushi, and the amount of liquidity staked
                  in the Masterchef contract. The full calculation is described{" "}
                  <a
                    style={{ color: "white" }}
                    href="https://github.com/sushiswap/sushi-data/pull/7"
                  >
                    here
                  </a>
                  .
                </p>
                <h3>ROI:</h3>
                <p>
                  The ROI is simply the combination of fees, impermanent loss,
                  and liquidity mining rewards. Note: ROI is with respect to the
                  LP Tokens (50% exposed to price of ETH and 50% exposed to
                  another asset). I would strongly recommend reading{" "}
                  <a href="/education#apy" style={{ color: "white" }}>
                    this section
                  </a>{" "}
                  to understand exactly what this percentage means.
                </p>
              </Collapse>
            </div>
            {/*               <Card className="data">
                Data From <a href="https://thegraph.com/">The Graph</a> and{" "}
                <a href="https://uniswaproi.com">UniswapROI</a>
              </Card> */}
          </div>
        </Row>
        <AdminFooter />
      </Container>
    </>
  );
};

export default NewPools;
