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
  Media,
  Row,
  Table,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Icon, Button as Button2 } from "semantic-ui-react";
// core components
import Header from "components/Headers/Header.js";
import AAVE from "../assets/img/brand/aave.jpg";
import AAVEPool from "../assets/img/brand/aavepoolex.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import UniswapLogo from "../assets/img/brand/uniswap.png";
import SushiSwapLogo from "../assets/img/brand/sushiswaplogo.png";
import UNIV2 from "assets/img/theme/uniswapv2.jpg";
import SUSHI from "assets/img/brand/sushilogo.jpg";
import { FaInfoCircle } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import dayjs from "dayjs";




// Takes in table data, column index, and whether reverse toggle is set
// Sorts table data by a specified column in place
function sortByColumn(a, colIndex, reverse) {
  if (reverse === true) {
    a.sort(sortFunction).reverse();
  } else {
    a.sort(sortFunction);
  }

  // Custom sort function for table elements (Ignores $ and % where applicable)
  function sortFunction(a, b) {
    if (a[colIndex] === b[colIndex]) {
      return 0;
    } else {
      if (a[colIndex].charAt(0) === "$") {
        return parseInt(a[colIndex].substring(2).replace(/,/g, "")) <
          parseInt(b[colIndex].substring(2).replace(/,/g, ""))
          ? -1
          : 1;
      } else if (a[colIndex].charAt(a[colIndex].length - 1) === "%") {
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

// React throws a fit when using localStorage with booleans for some reason
// This is to make sure Boolean values are stored coorectly
function loadBoolParse(val) {
  if (val === "true" || val === true) {
    return true;
  } else if (val === "false" || val === false) {
    return false;
  } else {
    return true;
  }
}

// Round float to a specified decimal place
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

// Functional component representing the Pool Explorer
// Data is no longer calculated in this component, that is handled in Admin.js and passed as props
const NewPools = (props) => {
  const [openPool, setOpenPool] = useState("Uniswap"); // Which protocol is open
  const [imagePool, setImagePool] = useState(AAVEPool); // What is the pool icon for the open protocol
  const [title, setTitle] = useState(UniswapLogo); // What is the header image for the open protocol

  //const [uniData, setUniData] = useState(props.uniData); // Uniswap pool data
  //const [uniData, setUniData] = useState([{}])
  const [uniData, setUniData] = useState(JSON.parse(localStorage.getItem('uniData')) || [{}])
  const [sushiData, setSushiData] = useState(props.sushiData); // SushiSwap pool data
  //const [sushiData, setUniData] = useState(JSON.parse(localStorage.getItem('sushiData')) || [{}])
  const [data, setData] = useState([{}]); // Data for the open protocol
  const [activeColumn, setActiveColumn] = useState(-1); // Which column was last clicked (used for reverse toggle)
  const [lastActiveColumn, setLastActiveColumn] = useState(0); // Which column was last clicked (used for reverse toggle)
  const [toggle, setToggle] = useState(false); // Reverse toggle for pool table
  const [sushiToolTip, setSushiToolTip] = useState(false);
  const [roiToolTip, setRoiToolTip] = useState(false);
  const [loadingUni, setLoadingUni] = useState(loadBoolParse(props.loadingUni)); // Has Uniswap pool data loaded yet?
  const [loadingSushi, setLoadingSushi] = useState(
    loadBoolParse(props.loadingSushi) // Has SushiSwap pool data loaded yet?
  );
  const [infoIcon, setInfoIcon] = useState(
    <i className="plus circle icon"></i>
  );
  const [infoOpen, setInfoOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState([
    "Name Placeholder",
    "Content",
  ]);
  const [errorActive, setErrorActive] = useState(props.errorActive)
  const [errorMessage, setErrorMessage] = useState(props.errorMessage)
  // Closes the modal box
  const handleSetModal = () => {
    setModal(false);
  };

  // Sets data to the currently open protocol
  useEffect(() => {
    if (openPool === "Uniswap") {
      setData(uniData);
    }
    if (openPool === "SushiSwap") {
      setData(sushiData);
    }
  }, []);

  // Handles when Uni or Sushi loading props get modified
  useEffect(() => {
    if (props.loadingUni === true) {
      setLoadingUni(props.loadingUni);
    } else if (props.loadingUni === false) {
      setUniData(props.uniData);
      if (openPool === "Uniswap") {
        setData(props.uniData);
      }
      setLoadingUni(props.loadingUni);
    }
    if (props.loadingSushi === true) {
      setLoadingSushi(props.loadingSushi);
    } else if (props.loadingSushi === false) {
      setSushiData(props.sushiData);
      if (openPool === "SushiSwap") {
        setData(props.sushiData)
      }
      setLoadingSushi(props.loadingSushi);
    }
  }, [props.loadingUni, props.loadingSushi]);

  useEffect(() => {
    setErrorActive(props.errorActive)
    setErrorMessage(props.errorMessage)
  }, [props.errorActive, props.errorMessage])

  // Handles clicking on column header for sorting
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

  // Handles clicking on individual row in pool table
  const handleRowClick = (key) => {
    if (modal === false) {
      let poolName = key["Liquidity Pool"];
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

  // Set active protocol to Uniswap
  const setUniswap = () => {
    setOpenPool("Uniswap");
    setImagePool(AAVEPool);
    setTitle(UniswapLogo);
    setToggle(false);
    setActiveColumn(-1);
    setLastActiveColumn(0);
    setData(uniData);
  };

  // Set active protocol to SushiSwap
  const setSushiSwap = () => {
    setOpenPool("SushiSwap");
    setImagePool(AAVEPool);
    setTitle(SushiSwapLogo);
    setToggle(false);
    setActiveColumn(-1);
    setLastActiveColumn(0);
    setData(sushiData);
  };

  // Manually trigger pool data refresh
  const triggerRefresh = () => {
    props.triggerRefresh();
  };

  const triggerAlertClose = () => {
    props.closeAlert()
  }

  // Returns a tooltip to get more info on specific columns
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

  // Displays a spinner if pool data is still loading
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

  const getMarketImage = () => {
    if (openPool === "Uniswap") {
      return UNIV2;
    } else if (openPool === "SushiSwap") {
      return SUSHI;
    } else {
      return null;
    }
  };


  // Displays button to manually refresh pools with time of last update
  const displayRefresh = () => {
    if (
      (loadingUni === false && openPool === "Uniswap") ||
      (loadingSushi === false && openPool === "SushiSwap")
    ) {
      return (
        <div className="porttable" style={{ paddingBottom: "20px" }}>
          <Button onClick={triggerRefresh}>Refresh Data</Button>
          <p style={{ display: "inline-block" }}>
            {" "}
            Last Refresh:{" "}
            {round(dayjs().diff(dayjs(props.lastRefreshPool)) / 60000, 0)}{" "}
            minutes ago
          </p>
        </div>
      );
    } else return <></>;
  };

  // If we have pool data, display it in a Table
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
                  if (title != "Estimated ROI (7d/30d/1y)") {
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
                  }
                  else {
                    return (
                      <th
                        key={key}
                        onClick={() => handleClick(title, key)}
                        scope="col"
                        data-label={title}
                        className="tableHeader"
                      >
                        <p style={{ display: "inline", cursor: "pointer" }}>
                          Estimated ROI (7d/<strong>30d</strong>/1y)
                      </p>
                        {getTooltip(title)}
                        <p style={{ cursor: "pointer", display: "inline" }}>
                          {activeColumn === key ? (toggle ? " ↓" : " ↑") : ""}
                        </p>
                      </th>
                    )
                  }
                } else {
                  return null;
                }
              })}
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
                    if (entry === "Liquidity Pool") {
                      return (
                        <td scope="row" key={key} data-label={entry}>
                          <Media className="align-items-center">
                            <div className="avatar rounded-circle mr-3">
                              <img alt="..." src={getMarketImage()} />
                            </div>
                            <Media>
                              <span className="mb-0 text-sm"><p>{row[entry]}</p></span>
                            </Media>
                          </Media>
                        </td>
                      );
                    }
                    else if (entry === "Estimated ROI (7d/30d/1y)") {
                      let roi = row[entry]
                      roi = roi.split("/")
                      let roitag = <p>{roi[0]}/<strong>{roi[1]}</strong>/{roi[2]}</p>

                      return (
                        <td scope="row" key={key} data-label={entry}>
                          {roitag}
                        </td>
                      );
                    }
                    else if (entry !== "Address") {
                      return (
                        <td scope="row" key={key} data-label={entry}>
                          <p>  {row[entry]}</p>
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
      <Modal isOpen={errorActive} centered={true}>
        <Header icon="exclamation circle" content="Alert" />
        <ModalHeader>{"Error"}</ModalHeader>
        <ModalBody>
          {errorMessage}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={triggerAlertClose}>
            <Icon name="remove" /> Close
          </Button>
        </ModalFooter>
      </Modal>
      <Header />
      <Header />
      {/* Page content */}
      <Container
        className="mt--7 bg-dark"
        fluid
      /*  style={{
         backgroundImage: `url(${AAVE})`,
         height: "100%",
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
       }} */
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
        {displayRefresh()}
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
            <h3 className="info" style={{ color: "white" }}>Want a pool added? DM me on Twitter <a href="https://twitter.com/defispartan">@DeFiSpartan</a> and I'll make it happen!</h3>
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
                  Estimated by taking the average daily fees for the previous 30 days with a 2x weighting for the last 7 days.
                </p>
                <h3>Impermanent Loss:</h3>
                <p>
                  Estimated by taking the average price ratio divergence for the last 30 days and plugging it into the IL curve found{" "}
                  <a style={{ color: "white" }} href="/education#il">
                    here
                  </a>
                  .
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
          </div>
        </Row>
        <AdminFooter />
      </Container>
    </>
  );
};

export default NewPools;
