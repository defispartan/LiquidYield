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
import {
  Card,
  CardHeader,
  Collapse,
  Table,
  Button,
  Container,
  Row,
  Media,
  Alert,
  Spinner,
} from "reactstrap";
import PortfolioHeader from "assets/img/brand/portfolioheader.png";

// core components
import { Dropdown, Input, Label } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import AdminFooter from "../components/Footers/AdminFooter.js";
import { newContextComponents } from "@drizzle/react-components";
import UniswapLogo from "../assets/img/brand/uniswap.png";
import SushiSwapLogo from "../assets/img/brand/sushiswaplogowhite.png";
import UNIV2 from "assets/img/theme/uniswapv2.jpg";
import { FaInfoCircle } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import dayjs from "dayjs";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData } = newContextComponents;

const PortfolioConnect = ({ disconnect }) => {
  const [uniLoading, setUniLoading] = useState(true);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("portfolioData")) || [{}]
  );
  const [currentAddress, setCurrentAddress] = useState(
    localStorage.getItem("currentAddress") || ""
  );
  const [lastRefresh, setLastRefresh] = useState(
    localStorage.getItem("lastRefresh") || null
  );
  const [activeUniColumn, setActiveUniColumn] = useState(-1);
  const [lastActiveUniColumn, setLastActiveUniColumn] = useState(0);
  const [uniToggle, setUniToggle] = useState(false);
  const [message, setMessage] = useState("");
  const [showWalletDetails, setShowWalletDetails] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [ethToggle, setETHToggle] = useState(false);
  const [dataSaved, setDataSaved] = useState(
    localStorage.getItem("dataSaved") || false
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

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const calculateUniHoldings = (uniData) => {
    console.log("Calculating UNI holdings");
    let holdingsArray = [];
    uniData.forEach((element) => {
      if (element.uniswap_version === "v2") {
        let current =
          element.operations_details[element.operations_details.length - 1];
        if (current.value_taken_out_usd > 10) {
          let currentObj = {
            "Liquidity Pool": element.pair_name,

            "Current Value":
              "$ " + numberWithCommas(round(current.value_taken_out_usd, 2)),
            "Value Invested":
              "$ " + numberWithCommas(round(current.value_old_price_usd, 2)),
            "ROI of LP Position": round(current.roi_net_usd * 100, 2) + " %",
            "ROI of Holding Assets":
              round(current.roi_of_price_usd * 100, 2) + " %",
            "ROI of LP Position vs Holding Assets":
              round(current.roi_uniswap_usd * 100, 2) + " %",
          };
          holdingsArray.push(currentObj);
        }
      }
    });
    if (holdingsArray.length === 0) {
      holdingsArray.push({});
    }
    return holdingsArray;
  };

  const setDataSave = (holdings) => {
    console.log("SETTING PORTFOLIO DATA SAVE");
    console.log(holdings);
    localStorage.setItem("portfolioData", JSON.stringify(holdings));
    localStorage.setItem("dataSaved", true);
    setLastRefresh(dayjs().format());
    localStorage.setItem("lastRefresh", dayjs().format());
    console.log("Setting last refresh time to " + dayjs().format());
    setDataSaved(true);
  };

  async function fetchData() {
    console.log("fetching data");
    const uniswaproikey = process.env.REACT_APP_uniswaproiapikey;
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    const response = await axios.post(
      "https://api.uniswaproi.com/run_analysis",
      {
        api_key: uniswaproikey,
        address: state.accounts[0],
        //address: "0xc72525ab51a96cabe5d810125a08a4fb36740b07", // Test account
      }
    );
    console.log("Called analysis");
    console.log(response);
    if (response.data.status === "failed") {
      console.log(response.data.reason);
    } else {
      let req_id = response.data.request_id;

      let status = "failed";
      let analysis = {};
      while (status !== "ok") {
        analysis = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.uniswaproi.com/retrieve_analysis",
          {
            params: {
              api_key: uniswaproikey,
              request_id: req_id,
            },
          }
        );
        status = analysis.data.status;
        if (status === "ok") {
          console.log("Got the data");
          let uniswapPortfolioData = analysis.data.data.analysis;
          let holdings = calculateUniHoldings(uniswapPortfolioData);
          if (Object.keys(holdings[0]).length === 0) {
            setMessage(
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "white" }}>
                  There are no active Uniswap LP positions for this address
                </p>
              </div>
            );
          } else {
            setMessage(<React.Fragment></React.Fragment>);
          }
          setData(holdings);
          setDataSave(holdings);
          setUniLoading(false);
          setRefresh(false);
          setCurrentAddress(state.accounts[0]);
        } else {
          await timeout(10000);
        }
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("currentAddress", currentAddress);
  }, [currentAddress]);

  useEffect(() => {
    if (refresh === true) {
      setDataSaved(false);
      setUniLoading(true);
      fetchData();
      localStorage.setItem("dataSaved", false);
      console.log("REFRESH SET");
      console.log(localStorage.getItem("dataSaved"));
    }
  }, [refresh]);

  useEffect(() => {
    if (dataSaved === false) {
      fetchData();
      setRefresh(false);
    } else {
      // If data is saved, set the message which checks for empty portfolio, set loading to false, and check if currentAddress is equal to wallet address
      if (currentAddress !== state.accounts[0]) {
        setMessage(
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "white", paddingTop: "20px" }}>
              Wallet address changed, re-running analysis
            </p>
          </div>
        );
        fetchData();
      } else {
        setUniLoading(false);
        if (Object.keys(data[0]).length === 0) {
          setMessage(
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "white" }}>
                There are no active Uniswap LP positions for this address
              </p>
            </div>
          );
        } else {
          setMessage(<React.Fragment></React.Fragment>);
        }
      }
    }
  }, []);

  const uniLoadingSpin = () => {
    if (uniLoading === true) {
      return (
        <div className="newspinny">
          <Spinner
            style={{ width: "5em", height: "5em", paddingBottom: "20px" }}
            color="white"
          />
        </div>
      );
    }
  };

  const handleUniClick = (title, key) => {
    if (activeUniColumn === key) {
      setUniToggle(!uniToggle);
      setActiveUniColumn(key);
      sortByColumn(data, title, uniToggle);
    } else {
      setActiveUniColumn(key);
      sortByColumn(data, title, false);
    }
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

  const toggleWalletDetails = () => {
    setShowWalletDetails(!showWalletDetails);
  };

  const triggerRefresh = () => {
    setRefresh(true);
    setMessage(
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <p style={{ color: "white" }}>Refreshing portfolio data</p>
      </div>
    );
  };

  const displayRefresh = () => {
    console.log("LAST REFRESH");
    console.log(lastRefresh);
    console.log(dayjs(lastRefresh));
    if (refresh === false) {
      return (
        <div className="porttable">
          <Button onClick={triggerRefresh}>Refresh Data</Button>
          <p style={{ display: "inline-block" }}>
            {" "}
            Last Refresh: {round(
              dayjs().diff(dayjs(lastRefresh)) / 60000,
              0
            )}{" "}
            minutes ago
          </p>
        </div>
      );
    }
  };

  const displayETHToggle = () => {
    if (refresh === false) {
      return <p style={{ color: "white" }}>TOGGLE</p>;
    } else {
      return <></>;
    }
  };

  const displayMessage = () => {
    return message;
  };

  const displayWalletDetails = () => {
    if (showWalletDetails) {
      return (
        <Card className="portwalletdetails">
          <div className="walleticon" onClick={toggleWalletDetails}>
            <h4 className="inlinetext" style={{ paddingRight: "5px" }}>
              Hide Panel
            </h4>
            <i className="inlinetext minus circle icon"></i>
          </div>
          <div>
            <h4 className="inlinetext">Network:</h4>{" "}
            <p className="inlinetext">{networkMap[state.web3.networkId]}</p>
          </div>
          <div>
            {" "}
            <h4 className="inlinetext">Wallet:</h4>{" "}
            <p className="inlinetext">{state.accounts[0]}</p>
          </div>
          <div>
            <h4 className="inlinetext">Balance:</h4>{" "}
            <p className="inlinetext">
              {round(
                state.accountBalances[state.accounts[0]] / 1000000000000000000,
                5
              )}{" "}
              ETH
            </p>
          </div>

          <Button className="wallet" onClick={() => disconnect()}>
            Disconnect Wallet
          </Button>
        </Card>
      );
    } else {
      return (
        <Card className="smallerportwalletdetails">
          <div onClick={toggleWalletDetails}>
            <h4 className="inlinetext" style={{ paddingRight: "5px" }}>
              Show Panel
            </h4>
            <i className="inlinetext plus circle icon"></i>
          </div>
        </Card>
      );
    }
  };
  const displayUniTable = () => {
    if (uniLoading === false) {
      return (
        <React.Fragment>
          <Card className="shadow">
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  {Object.keys(data[0]).map((title, key) => {
                    return (
                      <th
                        key={key}
                        onClick={() => handleUniClick(title, key)}
                        scope="col"
                        data-label={title}
                        className="tableHeader"
                      >
                        <p style={{ display: "inline", cursor: "pointer" }}>
                          {title + " "}
                        </p>
                        {getTooltip(title)}
                        <p style={{ cursor: "pointer", display: "inline" }}>
                          {activeUniColumn === key
                            ? uniToggle
                              ? " ↓"
                              : " ↑"
                            : ""}
                        </p>
                      </th>
                    );
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
                    <tr key={key}>
                      {Object.keys(row).map(function (entry, key) {
                        if (entry !== "Liquidity Pool") {
                          return (
                            <td scope="row" key={key} data-label={entry}>
                              {row[entry]}
                            </td>
                          );
                        } else {
                          return (
                            <td scope="row" key={key} data-label={entry}>
                              <Media className="align-items-center">
                                <div className="avatar rounded-circle mr-3">
                                  <img alt="..." src={UNIV2} />
                                </div>
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {row[entry]}
                                  </span>
                                </Media>
                              </Media>
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </React.Fragment>
      );
    }
  };

  return (
    <>
      {/* Page content */}
      <Container className="mt--7 bg-dark" fluid>
        <div className="zapheader">
          <img src={PortfolioHeader} className="portcardheader"></img>
        </div>
        {displayRefresh()}
        {displayETHToggle()}
        <div className="unipanel">
          <img
            src={UniswapLogo}
            alt="Uniswap Header"
            className="portcardimg"
          ></img>
          {displayUniTable()}
          {uniLoadingSpin()}
          {displayMessage()}
        </div>

        <div className="sushipanel">
          <img
            src={SushiSwapLogo}
            className="uniswap"
            alt="SushiSwap Header"
            className="portcardimg"
          ></img>
          <p style={{ color: "white" }}>Coming Soon</p>
        </div>

        {displayWalletDetails()}
        <Card className="data">
          Data from the <a href="https://www.uniswaproi.com/#">UniswapROI</a>{" "}
          API
        </Card>

        <AdminFooter />
      </Container>
    </>
  );
};

export default PortfolioConnect;
