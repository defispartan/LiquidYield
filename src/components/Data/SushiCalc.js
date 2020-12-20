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
// }
const SushiCalc = async (pool, address) => {
  let rewards = 0;
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

  let utcCurrentTime30 = dayjs();
  let utcOneMonthBack = utcCurrentTime30.subtract(30, "day");
  utcOneMonthBack = utcOneMonthBack.unix();
  utcOneMonthBack = utcOneMonthBack - (utcOneMonthBack % 86400);
  const previousMonthData = await sushiswapClient.query({
    query: TICKER_HISTORICAL_QUERY,
    variables: {
      id: address,
      date: utcOneMonthBack,
    },
    fetchPolicy: "cache-first",
  });
  let previousMonth = previousMonthData;

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
    "24h Volume (USD)": "$ " + numberWithCommas(round(previous.volumeUSD, 0)),
    "Estimated Fees (30d)": round(
      expectedFees(pair.reserveUSD, previous.volumeUSD),
      2
    ),
    "Estimated IL (30d)": round(calculateIL(pair, previous), 2) + " %",
    "Estimated Sushi Rewards (30d)": round(rewards, 2) + " %",
    "Estimated ROI (30d)":
      round(
        expectedFees(previous.volumeUSD, pair.reserveUSD) +
          calculateIL(pair, previous) +
          rewards,
        2
      ) + " %",
  };

  const [client, setClient] = useState(sushiswapClient);
  const [rewardLoad, setRewardLoad] = useState(true);
  const [pairData, setPairData] = useState([]);
  const [previousDayPairData, setPreviousDayPairData] = useState([]);
  const [previousMonthPairData, setPreviousMonthPairData] = useState([]);
  const [reward, setReward] = useState(0.0);

  const getPairData = async (address) => {
    const result = await client.query({
      query: SUSHI_TICKER_QUERY,
      variables: {
        id: address,
      },
      fetchPolicy: "cache-first",
    });
    let pair = result.data.pair;
    setPairData(result.data.pair);
  };

  const getPreviousPairData = async (address) => {
    const utcCurrentTime = dayjs();
    let utcOneDayBack = utcCurrentTime.subtract(1, "day");
    utcOneDayBack = utcOneDayBack.unix();
    utcOneDayBack = utcOneDayBack - (utcOneDayBack % 86400);
    const previous = await client.query({
      query: SUSHI_TICKER_HISTORICAL_QUERY,
      variables: {
        id: address,
        date: utcOneDayBack,
      },
      fetchPolicy: "cache-first",
    });
    setPreviousDayPairData(previous.data.pairDayDatas[0]);
  };

  const getPreviousMonthPairData = async (address) => {
    const utcCurrentTime = dayjs();
    let utcOneMonthBack = utcCurrentTime.subtract(30, "day");
    utcOneMonthBack = utcOneMonthBack.unix();
    utcOneMonthBack = utcOneMonthBack - (utcOneMonthBack % 86400);
    const previousMonth = await client.query({
      query: SUSHI_TICKER_HISTORICAL_QUERY,
      variables: {
        id: address,
        date: utcOneMonthBack,
      },
      fetchPolicy: "cache-first",
    });
    setPreviousMonthPairData(previousMonth.data.pairDayDatas[0]);
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
    if (Object.keys(props.poolRewards).length != 0) {
      setRewardLoad(false);
    }
    if (props.address in props.poolRewards) {
      setReward(props.poolRewards[props.address]);
    }
  }

  function displayRewards() {
    if (rewardLoad == true) {
      return "CALCULATING";
    } else {
      return round(reward.toString(), 2) + " %";
    }
  }

  useEffect(() => {
    getPairData(props.address);
    getPreviousPairData(props.address);
    getPreviousMonthPairData(props.address);
    getRewards();
  }, [props.poolRewards]);

  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <div className="avatar rounded-circle mr-3">
            <img alt="..." src={getMarketImage()} />
          </div>
          <Media>
            <span className="mb-0 text-sm">{props.pair}</span>
          </Media>
        </Media>
      </th>
      <td style={{ textAlign: "center" }}>
        {"$" + numberWithCommas(round(pairData.reserveUSD, 2))}
      </td>
      <td style={{ textAlign: "center" }}>
        {"$" + numberWithCommas(round(previousDayPairData.volumeUSD, 2))}
      </td>
      <td style={{ textAlign: "center" }}>
        {round(
          expectedFees(previousDayPairData.volumeUSD, pairData.reserveUSD),
          2
        ).toString() + " %"}
      </td>
      <td style={{ textAlign: "center" }}>
        {round(calculateIL(pairData, previousMonthPairData).toString(), 2) +
          " %"}
      </td>
      <td style={{ textAlign: "center" }}>{displayRewards()}</td>
      <td style={{ textAlign: "center" }}>
        {round(
          expectedFees(previousDayPairData.volumeUSD, pairData.reserveUSD) +
            calculateIL(pairData, previousMonthPairData) +
            reward,
          2
        ).toString() + " %"}
      </td>
    </tr>
  );
};

{
}

export default SushiCalc;
