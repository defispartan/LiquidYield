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

export const TICKER_GET_MONTH_ALL = gql`
  query pairDayData($id: [Bytes!], $date: Int!) {
    pairDayDatas(first: 1000, where: { pairAddress_in: $id, date_gt: $date }) {
      pairAddress
      date
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

export const GET_INDEX_PRICES = gql`
  query tokens {
    tokens(where:{id_in: ["0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2"]}) {
      id
      name
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

export const GET_UNI_DAY_DATA = gql`
  query dayData {
    uniswapDayDatas(
      first: 1000
      where: { date_gt: 1589792400 }
      orderBy: date
      orderDirection: desc
    ) {
      date
      dailyVolumeUSD
      id
    }
  }
`;

export const GET_SUSHI_DAY_DATA = gql`
  query dayData {
    dayDatas(
      first: 1000
      where: { date_gt: 1589792400 }
      orderBy: date
      orderDirection: desc
    ) {
      date
      volumeUSD
      id
    }
  }
`;
