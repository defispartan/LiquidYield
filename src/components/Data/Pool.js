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
  const [previousDayExchangeData, setPreviousDayExchangeData] = useState([]);
  const [ethPrice, setEthPrice] = useState([]);
  const [previousMonthExchangeData, setPreviousMonthExchangeData] = useState(
    []
  );
  const [previousMonthEthPrice, setPreviousMonthEthPrice] = useState([]);

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
    console.log("PREVIOUS DAY EXCHANGE DATA");
    console.log(previous.data.exchangeHistoricalDatas[0]);
    setPreviousDayExchangeData(previous.data.exchangeHistoricalDatas[0]);
  };

  const getPreviousMonthExchangeData = async (address) => {
    const utcCurrentTime = dayjs();
    const utcOneMonthBack = utcCurrentTime.subtract(30, "day");
    const previousMonth = await client.query({
      query: TICKER_24HOUR_QUERY,
      variables: {
        exchangeAddr: address,
        timestamp: utcOneMonthBack.unix(),
      },
      fetchPolicy: "cache-first",
    });
    console.log("PREVIOUS MONTH EXCHANGEDATA");
    console.log(previousMonth.data.exchangeHistoricalDatas[0]);
    setPreviousMonthExchangeData(previousMonth.data.exchangeHistoricalDatas[0]);
  };

  const getPreviousMonthEthPrice = async () => {
    const utcCurrentTime = dayjs();
    const utcOneMonthBack = utcCurrentTime.subtract(30, "day");
    const previousMonthEth = await client.query({
      query: TICKER_24HOUR_QUERY,
      variables: {
        exchangeAddr: "0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667",
        timestamp: utcOneMonthBack.unix(),
      },
      fetchPolicy: "cache-first",
    });
    console.log("PREVIOUS MONTH ETH PRICE");
    console.log(previousMonthEth.data.exchangeHistoricalDatas[0].price);
    setPreviousMonthEthPrice(
      previousMonthEth.data.exchangeHistoricalDatas[0].price
    );
  };

  function calculateLiquidity(ethp, ethv, holdingp, holdingv) {
    let calcLiquidity = ethp * ethv + holdingp * holdingv;
    return calcLiquidity;
  }

  function calculateVolume(newv, oldv) {
    let vol = newv - oldv;
    return vol;
  }

  function expectedFees(volume, liquidity) {
    let returns = ((volume * 0.003 * 30) / liquidity) * 100;
    return returns;
  }

  function calculateIL(new_eth, new_token, old_eth, old_token) {
    console.log("CALC ");
    console.log(props.exchange);
    console.log(new_eth);
    console.log(new_token);
    console.log(old_eth);
    console.log(old_token);
    let new_ratio = new_eth / new_token;
    let old_ratio = old_eth / old_token;
    let price_ratio = new_ratio / old_ratio;
    let il = (2 * Math.sqrt(price_ratio)) / (1 + price_ratio) - 1;
    return Math.abs(il) * -1 * 100;
  }

  useEffect(() => {
    getExchangeData(props.address);
    getEtherPrice();
    getPreviousExchangeData(props.address);
    getPreviousMonthExchangeData(props.address);
    getPreviousMonthEthPrice();
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
              calculateLiquidity(
                ethPrice,
                exchangeData.ethBalance,
                exchangeData.priceUSD,
                exchangeData.tokenBalance
              ),
              2
            )
          )}
      </td>
      <td style={{ textAlign: "center" }}>
        {"$" +
          numberWithCommas(
            round(
              calculateVolume(
                exchangeData.tradeVolumeUSD,
                previousDayExchangeData.tradeVolumeUSD
              ),
              2
            )
          )}
      </td>
      <td style={{ textAlign: "center" }}>
        {round(
          expectedFees(
            calculateVolume(
              exchangeData.tradeVolumeUSD,
              previousDayExchangeData.tradeVolumeUSD
            ),
            calculateLiquidity(
              ethPrice,
              exchangeData.ethBalance,
              exchangeData.priceUSD,
              exchangeData.tokenBalance
            )
          ),
          2
        ).toString() + "%"}
      </td>
      <td style={{ textAlign: "center" }}>
        {round(
          calculateIL(
            ethPrice,
            exchangeData.priceUSD,
            previousMonthEthPrice,
            previousMonthExchangeData.tokenPriceUSD
          ),
          2
        ).toString() + "%"}
      </td>
      <td style={{ textAlign: "center" }}>
        {round(
          expectedFees(
            calculateVolume(
              exchangeData.tradeVolumeUSD,
              previousDayExchangeData.tradeVolumeUSD
            ),
            calculateLiquidity(
              ethPrice,
              exchangeData.ethBalance,
              exchangeData.priceUSD,
              exchangeData.tokenBalance
            )
          ) +
            calculateIL(
              ethPrice,
              exchangeData.priceUSD,
              previousMonthEthPrice,
              previousMonthExchangeData.tokenPriceUSD
            ),
          2
        ).toString() + "%"}
      </td>
    </tr>
  );
};

export default Pool;
