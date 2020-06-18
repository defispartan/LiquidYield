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
/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Media } from "reactstrap";
import { TICKER_QUERY, TICKER_24HOUR_QUERY } from "components/Data/Query.js";
import { client } from "components/Data/Client.js";
import dayjs from "dayjs";
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Pool = (props) => {
  const [exchangeData, setExchangeData] = useState([]);
  const [previousExchangeData, setPreviousExchangeData] = useState([]);
  const [ethPrice, setEthPrice] = useState([]);

  const getExchangeData = async (address) => {
    const result = await client.query({
      query: TICKER_QUERY,
      variables: {
        id: address,
      },
      fetchPolicy: "cache-first",
    });
    let exchange = result.data.exchange;
    console.log("EXCHANGE DATA");
    console.log(exchange);
    setExchangeData(result.data.exchange);
  };

  const getEtherPrice = async () => {
    let daiResult = await client.query({
      query: TICKER_QUERY,
      variables: {
        id: "0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667",
      },
      fetchPolicy: "cache-first",
    });
    daiResult = daiResult ? parseFloat(daiResult.data.exchange.price) : 0;
    setEthPrice(daiResult);
    console.log("ETHPRICE");
    console.log(daiResult);
  };

  const getPreviousExchangeData = async (address) => {
    const utcCurrentTime = dayjs();
    const utcOneDayBack = utcCurrentTime.subtract(1, "day");
    const previous = await client.query({
      query: TICKER_24HOUR_QUERY,
      variables: {
        exchangeAddr: address,
        timestamp: utcOneDayBack.unix(),
      },
      fetchPolicy: "cache-first",
    });
    console.log("PREVIOUS");
    console.log(previous.data.exchangeHistoricalDatas[0]);
    setPreviousExchangeData(previous.data.exchangeHistoricalDatas[0]);
  };

  useEffect(() => {
    getExchangeData(props.address);
    getEtherPrice();
    getPreviousExchangeData(props.address);
  }, []);

  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <div className="avatar rounded-circle mr-3">
            <img alt="..." src={require("assets/img/theme/uniswapv1.jpg")} />
          </div>
          <Media>
            <span className="mb-0 text-sm">{props.exchange}</span>
          </Media>
        </Media>
      </th>
      <td style={{ textAlign: "center" }}>
        {"$" +
          numberWithCommas(
            round(
              ethPrice * exchangeData.ethBalance +
                exchangeData.tokenBalance * exchangeData.priceUSD,
              2
            )
          )}
      </td>
      <td style={{ textAlign: "center" }}>
        {"$" +
          numberWithCommas(
            round(
              exchangeData.tradeVolumeUSD - previousExchangeData.tradeVolumeUSD,
              2
            )
          )}
      </td>
      <td style={{ textAlign: "center" }}>Coming Soon</td>
      <td style={{ textAlign: "center" }}>Coming Soon</td>
      <td style={{ textAlign: "center" }}>Coming Soon</td>
    </tr>
  );
};

export default Pool;
