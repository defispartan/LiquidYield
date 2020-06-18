import gql from "graphql-tag";

export const TICKER_QUERY = gql`
  query exchange($id: String!) {
    exchange(id: $id) {
      id
      tokenAddress
      tokenName
      tokenSymbol
      price
      priceUSD
      tokenBalance
      ethBalance
      tradeVolumeEth
      tradeVolumeToken
      tradeVolumeUSD
      tokenBalance
      totalTxsCount
    }
  }
`;

export const TICKER_24HOUR_QUERY = gql`
  query exchangeHistoricalDatas($timestamp: Int!, $exchangeAddr: String!) {
    exchangeHistoricalDatas(
      where: { timestamp_lt: $timestamp, exchangeAddress: $exchangeAddr }
      first: 1
      orderBy: tradeVolumeEth
      orderDirection: desc
    ) {
      id
      timestamp
      exchangeAddress
      tradeVolumeEth
      tradeVolumeToken
      tradeVolumeUSD
      tokenPriceUSD
      price
      ethBalance
      totalTxsCount
    }
  }
`;
