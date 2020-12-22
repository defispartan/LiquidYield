import gql from "graphql-tag";

export const TICKER_QUERY = gql`
  query pair($id: ID!) {
    pair(id: $id) {
      id
      token1Price
      reserve0
      reserve1
      reserveUSD
      volumeUSD
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

export const TICKER_GET_MONTH = gql`
  query pairDayData($id: Bytes!, $date: Int!) {
    pairDayDatas(where: { pairAddress: $id, date_gt: $date }) {
      id
      reserve0
      reserve1
      reserveUSD
      dailyVolumeUSD
    }
  }
`;

export const SUSHI_GET_MONTH = gql`
  query pairDayData($id: Bytes!, $date: Int!) {
    pairDayDatas(where: { pair: $id, date_gt: $date }) {
      id
      reserve0
      reserve1
      reserveUSD
      volumeUSD
    }
  }
`;

export const SUSHI_TICKER_QUERY = gql`
  query pair($id: ID!) {
    pair(id: $id) {
      id
      token1Price
      reserve0
      reserve1
      reserveUSD
      volumeUSD
    }
  }
`;

export const SUSHI_TICKER_HISTORICAL_QUERY = gql`
  query pairDayData($id: Bytes!, $date: Int!) {
    pairDayDatas(where: { pair: $id, date: $date }) {
      id
      reserve0
      reserve1
      reserveUSD
      volumeUSD
    }
  }
`;

export const SUSHILP = gql`
  query pair($id: ID!) {
    pair(id: $id) {
      token0 {
        name
      }
      token1 {
        name
      }
      totalSupply
      reserveUSD
      reserve0
      reserve1
    }
  }
`;

export const UNILP = gql`
  query pair($id: ID!) {
    pair(id: $id) {
      token0 {
        name
      }
      token1 {
        name
      }
      totalSupply
      reserveUSD
      reserve0
      reserve1
    }
  }
`;

export const GET_DERIVED_ETH = gql`
  query token($id: ID!) {
    token(id: $id) {
      id
      derivedETH
    }
  }
`;

export const GET_REWARD_POOLS = gql`
  query pools {
    pools(where: { allocPoint_gt: 0 }) {
      id
      pair
      slpBalance
      allocPoint
    }
  }
`;

export const GET_TOTAL_ALLOC = gql`
  query totalalloc {
    masterChefs {
      id
      totalAllocPoint
    }
  }
`;

export const GET_POOL_INFO = gql`
  query poolinfo($id: ID!) {
    pair(id: $id) {
      id
      totalSupply
      reserveETH
    }
  }
`;
