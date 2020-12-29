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
  SUSHI_TICKER_QUERY,
  SUSHI_TICKER_HISTORICAL_QUERY,
  SUSHI_GET_MONTH,
} from "components/Data/Query.js";
import { sushiswapClient } from "components/Data/SushiSwapClient.js";
import SUSHI from "assets/img/theme/chef.PNG";
import dayjs from "dayjs";

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Input: Address for SushiSwap pool
// Output: Object in the following form:
// {
//      "Liquidity Pool": {}
//      "Total Liquidity (USD)": {},
//      "24h Volume (USD)": {},
//      "Estimated Fees (30d)": {},
//      "Estimated IL (30d)": {},
//      "Estimated Sushi Rewards (30d)": {},
//      "Estimated ROI (30d)": {},
//      "Address": {}
// }
const SushiCalc = async (pool, address, rewards) => {
  if (address in rewards) {
    let reward = rewards[address];
  } else {
    let reward = 0;
  }

  const result = await sushiswapClient.query({
    query: SUSHI_TICKER_QUERY,
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
  const previousData = await sushiswapClient.query({
    query: SUSHI_TICKER_HISTORICAL_QUERY,
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
  const previousMonthData = await sushiswapClient.query({
    query: SUSHI_GET_MONTH,
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
      (element.volumeUSD - monthlyAverageVolume) / dayCount;
  });
  let fees = expectedFees(monthlyAverageVolume, monthlyAverageLiquidity);
  let il = calculateIL(pair, previousMonth[0]);

  return {
    "Liquidity Pool": pool,
    "Total Liquidity": "$ " + numberWithCommas(round(pair.reserveUSD, 0)),
    "24h Volume": "$ " + numberWithCommas(round(previous.volumeUSD, 0)),
    "Estimated Fees (30d)": round(fees, 2) + " %",
    "Estimated IL (30d)": round(il, 2) + " %",
    "Estimated Sushi Rewards (30d)": round(reward, 2) + " %",
    "Estimated ROI (30d)": round(fees + il + reward, 2) + " %",
    Address: address,
  };

  function expectedFees(volume, liquidity) {
    let returns = ((volume * 0.0025 * 30) / liquidity) * 100;
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
    return SUSHI;
  }
  function getRewards() {
    if (Object.keys(rewards).length != 0) {
      setRewardLoad(false);
    }
    if (props.address in rewards) {
      setReward(rewards[props.address]);
    }
  }
};

export default SushiCalc;
