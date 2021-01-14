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
  TICKER_GET_MONTH_ALL
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

function sum(array) {
    var num = 0;
    for (var i = 0, l = array.length; i < l; i++) num += array[i];
    return num;
}

function calcMean(array) {
    return sum(array) / array.length;
}

function variance(array) {
    var mean = calcMean(array);
    return calcMean(array.map(function(num) {
        return Math.pow(num - mean, 2);
    }));
}

function standardDeviation(array) {
    return Math.sqrt(variance(array));
}

const sumArrayValues = (values) => {
    return values.reduce((p, c) => p + c, 0)
  }
  
// Sorts an array while applying custom weights to each element
const weightedAverage = (factorsArray, weightsArray) => {
    return sumArrayValues(factorsArray.map((factor, index) => factor * weightsArray[index])) / sumArrayValues(weightsArray)
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
const UniCalcNew = async (unilist) => {
 
  /* const result = await uniswapClient.query({
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
*/
  let utcCurrentTime30 = dayjs();
  let utcOneMonthBack = utcCurrentTime30.subtract(30, "day");
  utcOneMonthBack = utcOneMonthBack.unix();
  utcOneMonthBack = utcOneMonthBack - (utcOneMonthBack % 86400); 
  let addressList = []
  unilist.forEach((element) => {addressList.push(element[1])})
  const previousMonthData = await uniswapClient.query({
    query: TICKER_GET_MONTH_ALL,
    variables: {
      id: addressList,
      date: utcOneMonthBack,
    },
    fetchPolicy: "cache-first",
  });
  const uniDataArray = previousMonthData.data.pairDayDatas
  // Sort data array by pair address then date
  uniDataArray.sort((a,b) => {
      if(a.pairAddress > b.pairAddress){
          return 1
      }
      else if(a.pairAddress > b.pairAddress){
          return -1
      }
      else if(a.pairAddress === b.pairAddress){
          (a.date > b.date) ? 1 : -1
      }
  })
  // Sort list of pool names/addresses by address
  unilist.sort((a,b) => (a[1] > b[1]) ? 1: -1)
  let pairCount = 0
  let uniDataArrayCount = 0
  let finalArray = []
  let appendObject = {}
  // Loop through each pair. O(n) where n = length of pair list
  while(pairCount < unilist.length){
      // Get each pair corresponding to this entry in one loop. O(n) where n = length of uniDataArray
      let feeData = []
      let priceRatios = []
      while(uniDataArrayCount < uniDataArray.length && uniDataArray[uniDataArrayCount].pairAddress === unilist[pairCount][1]){
          feeData.push([uniDataArray[uniDataArrayCount].dailyVolumeUSD,uniDataArray[uniDataArrayCount].reserveUSD])
          priceRatios.push(uniDataArray[uniDataArrayCount].reserve0 / uniDataArray[uniDataArrayCount].reserve1)
          uniDataArrayCount = uniDataArrayCount + 1
      }
      // Remove the last element because the last day only has partial volume data  
      feeData.pop()
      priceRatios.pop()
      //let sd = standardDeviation(priceRatios) / calcMean(priceRatios)
      //console.log(unilist[pairCount][0])
      //console.log("NORMALIZED SD")
      //console.log(sd)
      let ratioIter = 0
      let priceRatioComp = []
      while(ratioIter < priceRatios.length-1){
          let ratio = priceRatios[ratioIter] / priceRatios[ratioIter+1]

          priceRatioComp.push(calculateIL(ratio))
          ratioIter = ratioIter + 1
      }
      let meanDailyIL = calcMean(priceRatioComp)
      let dailyFees = []
      feeData.forEach((element)=>{
          dailyFees.push(calculateFees(element[0],element[1]))
      })
      let weightsArray = new Array(dailyFees.length)
      let iter = 0
      while(iter < weightsArray.length){
          if(weightsArray.length - iter <= 7){
              weightsArray[iter] = 2
          }
          else{
              weightsArray[iter] = 1
          }
          iter = iter + 1
      }
      let fees = weightedAverage(dailyFees, weightsArray)
      
        appendObject = {
            "Liquidity Pool": unilist[pairCount][0],
            "Total Liquidity": "$ " + numberWithCommas(round(uniDataArray[uniDataArrayCount-1].reserveUSD, 0)),
            "24h Volume": "$ " + numberWithCommas(round(uniDataArray[uniDataArrayCount-2].dailyVolumeUSD, 0)),
            "Estimated Fees (30d)": round(fees*30, 2) + "%",
            "Estimated IL (30d)": round(meanDailyIL*30, 2) + "%",
            "Estimated ROI (7d/30d/1y)": round((fees+meanDailyIL)*7, 2) + "% / " + round((fees+meanDailyIL)*30, 2) + "% / " + round((fees+meanDailyIL)*365, 2) + "%",
            Address: unilist[pairCount][1]
        }
    finalArray.push(appendObject)
      pairCount = pairCount + 1
  }
  console.log("FINISHED CALCULATING")
  console.log(finalArray)
  /* 
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
  let current = ""; */
  /*   while (current !== address || count < uniswaproidata.length) {
    current = uniswaproidata[count];
    count = count + 1;
  }
  if (current === address) {
    let returns = uniswaproidata[count].return_forecast;
    console.log("POOL FOUND");
    console.log(returns);
  } */
  return finalArray
/*     "Liquidity Pool": pool,
    "Total Liquidity": "$ " + numberWithCommas(round(pair.reserveUSD, 0)),
    "24h Volume": "$ " + numberWithCommas(round(previous.dailyVolumeUSD, 0)),
    "Estimated Fees (30d)": round(fees, 2) + " %",
    "Estimated IL (30d)": round(il, 2) + " %",
    "Estimated ROI (30d)": round(fees + il, 2) + " %",
    Address: address, */
  //};

  function calculateFees(volume, liquidity) {
    let returns = ((volume * 0.003) / liquidity) * 100;
    return returns;
  }

  function calculateIL(price_ratio) {
    let il = (2 * Math.sqrt(price_ratio)) / (1 + price_ratio) - 1;
    return Math.abs(il) * -1 * 100;
  }

  function getMarketImage() {
    return UNIV2;
  }
};

export default UniCalcNew;
