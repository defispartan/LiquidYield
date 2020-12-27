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
import {
  TICKER_QUERY,
  TICKER_HISTORICAL_QUERY,
  TICKER_GET_MONTH,
} from "components/Data/Query.js";
import { uniswapClient } from "components/Data/UniswapClient.js";
import UNIV2 from "assets/img/theme/uniswapv2.jpg";
import dayjs from "dayjs";

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Input: Address for Uniswap pool
// Output: Object in the following form:
// {
//      "Liquidity Pool": {}
//      "Total Liquidity (USD)": {},
//      "24h Volume (USD)": {},
//      "Estimated Fees (30d)": {},
//      "Estimated IL (30d)": {},
//      "Estimated ROI (30d)": {},
//      "Address": {}
// }
const UniCalc = async (pool, address) => {
  const result = await uniswapClient.query({
    query: TICKER_QUERY,
    variables: {
      id: address,
    },
    fetchPolicy: "cache-first",
  });
  let pair = result.data.pair;

  const utcCurrentTime = dayjs();
  let utcOneDayBack = utcCurrentTime.subtract(1, "day");
  utcOneDayBack = utcOneDayBack.unix();
  utcOneDayBack = utcOneDayBack - (utcOneDayBack % 86400);
  const previousData = await uniswapClient.query({
    query: TICKER_HISTORICAL_QUERY,
    variables: {
      id: address,
      date: utcOneDayBack,
    },
    fetchPolicy: "cache-first",
  });

  let previous = previousData.data.pairDayDatas[0];
  let monthlyAverageLiquidity = 0.0;
  let monthlyAverageVolume = 0.0;
  let dayCount = 0.0;

  let utcCurrentTime30 = dayjs();
  let utcOneMonthBack = utcCurrentTime30.subtract(30, "day");
  utcOneMonthBack = utcOneMonthBack.unix();
  utcOneMonthBack = utcOneMonthBack - (utcOneMonthBack % 86400);

  const previousMonthData = await uniswapClient.query({
    query: TICKER_GET_MONTH,
    variables: {
      id: address,
      date: utcOneMonthBack,
    },
    fetchPolicy: "cache-first",
  });
  let previousMonth = previousMonthData.data.pairDayDatas;
  previousMonth.forEach((element) => {
    dayCount += 1.0;
    monthlyAverageLiquidity =
      monthlyAverageLiquidity +
      (element.reserveUSD - monthlyAverageLiquidity) / dayCount;
    monthlyAverageVolume =
      monthlyAverageVolume +
      (element.dailyVolumeUSD - monthlyAverageVolume) / dayCount;
  });
  let fees = expectedFees(monthlyAverageVolume, monthlyAverageLiquidity);
  let il = calculateIL(pair, previousMonth[0]);
  let count = 0;
  let current = "";
  /*   while (current !== address || count < uniswaproidata.length) {
    current = uniswaproidata[count];
    count = count + 1;
  }
  if (current === address) {
    let returns = uniswaproidata[count].return_forecast;
    console.log("POOL FOUND");
    console.log(returns);
  } */
  return {
    "Liquidity Pool": (
      <Media className="align-items-center">
        <div className="avatar rounded-circle mr-3">
          <img alt="..." src={getMarketImage()} />
        </div>
        <Media>
          <span className="mb-0 text-sm">{pool}</span>
        </Media>
      </Media>
    ),
    "Total Liquidity (USD)": "$ " + numberWithCommas(round(pair.reserveUSD, 0)),
    "24h Volume (USD)":
      "$ " + numberWithCommas(round(previous.dailyVolumeUSD, 0)),
    "Estimated Fees (30d)": round(fees, 2) + " %",
    "Estimated IL (30d)": round(il, 2) + " %",
    "Estimated ROI (30d)": round(fees + il, 2) + " %",
    Address: address,
  };

  function expectedFees(volume, liquidity) {
    let returns = ((volume * 0.003 * 30) / liquidity) * 100;
    return returns;
  }

  function calculateIL(current, previous) {
    let new_eth = current.reserveUSD / 2 / current.reserve0;
    let old_eth = previous.reserveUSD / 2 / previous.reserve0;
    let new_token = current.reserveUSD / 2 / current.reserve1;
    let old_token = previous.reserveUSD / 2 / previous.reserve1;

    let new_ratio = new_eth / new_token;
    let old_ratio = old_eth / old_token;
    let price_ratio = new_ratio / old_ratio;
    let il = (2 * Math.sqrt(price_ratio)) / (1 + price_ratio) - 1;
    return Math.abs(il) * -1 * 100;
  }

  function getMarketImage() {
    return UNIV2;
  }
};

export default UniCalc;
