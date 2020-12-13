import gql from "graphql-tag";

export const TICKER_QUERY = gql`
  query pair($id: ID!) {
    pair(id: $id) {
      id
      token1Price
      reserve0
      reserve1
      reserveUSD
    }
  }
`;

export const TICKER_HISTORICAL_QUERY = gql`
  query pairDayData($id: Bytes!, $date: Int!) {
    pairDayDatas(where: { pairAddress: $id, date: $date }) {
      id
      reserve0
      reserve1
      reserveUSD
      dailyVolumeUSD
    }
  }
`;
