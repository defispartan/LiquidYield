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
import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import { sushiswapClient } from "components/Data/SushiSwapClient.js";
import { uniswapClient } from "components/Data/UniswapClient.js";
import { UNILP, SUSHILP } from "components/Data/Query.js";
import { Dropdown, Input } from "semantic-ui-react";
// core components
import Header from "components/Headers/Header.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
import LPValueImg from "../assets/img/brand/lptokenvalue.png";
import UniswapLogo from "../assets/img/brand/uniswap.png";
import SushiSwapLogo from "../assets/img/brand/sushiswaplogo.png";

const LPValue = (props) => {
  // Info for all Uniswap pools which can be searched by name
  const uniPoolOptions = [
    {
      key: "usdt",
      value: "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=008",
      },

      text: "UNI-V2 USDT/ETH",
    },
    {
      key: "wbtc",
      value: "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg?v=002",
      },
      text: "UNI-V2 wBTC/ETH",
    },
    {
      key: "dai",
      value: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
      image: {
        avatar: true,
        src: "https://cdn.worldvectorlogo.com/logos/dai-2.svg",
      },
      text: "UNI-V2 DAI/ETH",
    },
    {
      key: "usdc",
      value: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=002",
      },
      text: "UNI-V2 USDC/ETH",
    },
    {
      key: "uni",
      value: "0xd3d2e2692501a5c9ca623199d38826e513033a17",
      image: {
        avatar: true,
        src:
          "https://research.binance.com/static/images/projects/uniswap/logo.png",
      },
      text: "UNI-V2 UNI/ETH",
    },
    {
      key: "dpi",
      value: "0x4d5ef58aac27d99935e5b6b4a6778ff292059991",
      image: {
        avatar: true,
        src:
          "https://assets.coingecko.com/coins/images/12465/large/defi_pulse_index_set.png?1600051053",
      },
      text: "UNI-V2 DPI/ETH",
    },
    {
      key: "yfi",
      value: "0x2fdbadf3c4d5a8666bc06645b8358ab803996e28",
      image: {
        avatar: true,
        src:
          "https://cryptotips.eu/wp-content/uploads/2020/09/yearn-finance-review.png",
      },
      text: "UNI-V2 YFI/ETH",
    },
    {
      key: "link",
      value: "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=002",
      },
      text: "UNI-V2 LINK/ETH",
    },
    {
      key: "aave",
      value: "0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f",
      image: {
        avatar: true,
        src:
          "https://assets.coingecko.com/coins/images/12645/large/AAVE.png?1601374110",
      },
      text: "UNI-V2 AAVE/ETH",
    },
    {
      key: "pickle",
      value: "0xdc98556ce24f007a5ef6dc1ce96322d65832a819",
      image: {
        avatar: true,
        src:
          "https://gblobscdn.gitbook.com/spaces%2F-MI-yJcvm6yA8baawmo4%2Favatar-1602721451378.png?alt=media",
      },
      text: "UNI-V2 PICKLE/ETH",
    },
    {
      key: "sushi",
      value: "0xce84867c3c02b05dc570d0135103d3fb9cc19433",
      image: {
        avatar: true,
        src:
          "https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png?1606986688",
      },
      text: "UNI-V2 SUSHI/ETH",
    },
    {
      key: "snx",
      value: "0x43ae24960e5534731fc831386c07755a2dc33d47",
      image: {
        avatar: true,
        src:
          "https://cryptologos.cc/logos/synthetix-network-token-snx-logo.svg?v=002",
      },
      text: "UNI-V2 SNX/ETH",
    },
    {
      key: "sUSD",
      value: "0xf80758ab42c3b07da84053fd88804bcb6baa4b5c",
      image: {
        avatar: true,
        src:
          "https://assets.coingecko.com/coins/images/5013/large/sUSD.png?1562212426",
      },
      text: "UNI-V2 sUSD/ETH",
    },
    {
      key: "comp",
      value: "0xcffdded873554f362ac02f8fb1f02e5ada10516f",
      image: {
        avatar: true,
        src:
          "https://assets.coingecko.com/coins/images/10775/large/COMP.png?1592625425",
      },
      text: "UNI-V2 COMP/ETH",
    },
    {
      key: "uma",
      value: "0x88d97d199b9ed37c29d846d00d443de980832a22",
      image: {
        avatar: true,
        src: "https://umaproject.org/assets/images/UMA_square_red_logo.png",
      },
      text: "UNI-V2 UMA/ETH",
    },
    {
      key: "band",
      value: "0xf421c3f2e695c2d4c0765379ccace8ade4a480d9",
      image: {
        avatar: true,
        src: "https://icodrops.com/wp-content/uploads/2019/09/band_logo.jpg",
      },
      text: "UNI-V2 BAND/ETH",
    },
    {
      key: "ren",
      value: "0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c",
      image: {
        avatar: true,
        src:
          "https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/m5ym1sxf1pjucikut6kk",
      },
      text: "UNI-V2 REN/ETH",
    },
    {
      key: "crv",
      value: "0x3da1313ae46132a397d90d95b1424a9a7e3e0fce",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/curve-dao-token-crv-logo.png",
      },
      text: "UNI-V2 CRV/ETH",
    },
  ];

  // Info for all SushiSwap pools which can be searched by name
  const sushiPoolOptions = [
    {
      key: "usdt",
      value: "0x06da0fd433c1a5d7a4faa01111c044910a184553",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=008",
      },

      text: "SLP USDT/ETH",
    },
    {
      key: "wbtc",
      value: "0xceff51756c56ceffca006cd410b03ffc46dd3a58",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg?v=002",
      },
      text: "SLP wBTC/ETH",
    },
    {
      key: "dai",
      value: "0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f",
      image: {
        avatar: true,
        src: "https://cdn.worldvectorlogo.com/logos/dai-2.svg",
      },
      text: "SLP DAI/ETH",
    },
    {
      key: "usdc",
      value: "0x397ff1542f962076d0bfe58ea045ffa2d347aca0",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=002",
      },
      text: "SLP USDC/ETH",
    },
    {
      key: "uni",
      value: "0xdafd66636e2561b0284edde37e42d192f2844d40",
      image: {
        avatar: true,
        src:
          "https://research.binance.com/static/images/projects/uniswap/logo.png",
      },
      text: "SLP UNI/ETH",
    },
    {
      key: "yfi",
      value: "0x088ee5007c98a9677165d78dd2109ae4a3d04d0c",
      image: {
        avatar: true,
        src:
          "https://cryptotips.eu/wp-content/uploads/2020/09/yearn-finance-review.png",
      },
      text: "SLP YFI/ETH",
    },
    {
      key: "link",
      value: "0xc40d16476380e4037e6b1a2594caf6a6cc8da967",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=002",
      },
      text: "SLP LINK/ETH",
    },
    {
      key: "aave",
      value: "0xd75ea151a61d06868e31f8988d28dfe5e9df57b4",
      image: {
        avatar: true,
        src:
          "https://assets.coingecko.com/coins/images/12645/large/AAVE.png?1601374110",
      },
      text: "SLP AAVE/ETH",
    },
    {
      key: "sushi",
      value: "0x795065dcc9f64b5614c407a6efdc400da6221fb0",
      image: {
        avatar: true,
        src:
          "https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png?1606986688",
      },
      text: "SLP SUSHI/ETH",
    },
    {
      key: "snx",
      value: "0xa1d7b2d891e3a1f9ef4bbc5be20630c2feb1c470",
      image: {
        avatar: true,
        src:
          "https://cryptologos.cc/logos/synthetix-network-token-snx-logo.svg?v=002",
      },
      text: "SLP SNX/ETH",
    },
    {
      key: "sUSD",
      value: "0xf1f85b2c54a2bd284b1cf4141d64fd171bd85539",
      image: {
        avatar: true,
        src:
          "https://assets.coingecko.com/coins/images/5013/large/sUSD.png?1562212426",
      },
      text: "SLP sUSD/ETH",
    },
    {
      key: "comp",
      value: "0x31503dcb60119a812fee820bb7042752019f2355",
      image: {
        avatar: true,
        src:
          "https://assets.coingecko.com/coins/images/10775/large/COMP.png?1592625425",
      },
      text: "SLP COMP/ETH",
    },
    {
      key: "uma",
      value: "0x001b6450083e531a5a7bf310bd2c1af4247e23d4",
      image: {
        avatar: true,
        src: "https://umaproject.org/assets/images/UMA_square_red_logo.png",
      },
      text: "SLP UMA/ETH",
    },
    {
      key: "band",
      value: "0xa75f7c2f025f470355515482bde9efa8153536a8",
      image: {
        avatar: true,
        src: "https://icodrops.com/wp-content/uploads/2019/09/band_logo.jpg",
      },
      text: "SLP BAND/ETH",
    },
    {
      key: "ren",
      value: "0x611cde65dea90918c0078ac0400a72b0d25b9bb1",
      image: {
        avatar: true,
        src:
          "https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/m5ym1sxf1pjucikut6kk",
      },
      text: "SLP REN/ETH",
    },
    {
      key: "crv",
      value: "0x58dc5a51fe44589beb22e8ce67720b5bc5378009",
      image: {
        avatar: true,
        src: "https://cryptologos.cc/logos/curve-dao-token-crv-logo.png",
      },
      text: "SLP CRV/ETH",
    },
    {
      key: "cover",
      value: "0xe7689b2c21242e07870aaa0ffee1ec11833d5e24",
      image: {
        avatar: true,
        src: "https://www.coverprotocol.com/img/token.png",
      },
      text: "SLP COVER/ETH",
    },
  ];

  const [market, setMarket] = useState("Uniswap"); // Which protocol is selected
  const [title, setTitle] = useState(UniswapLogo); // Image for open protoocl
  const [client, setClient] = useState(uniswapClient); // Which client should be used to fetch data from TheGraph
  const [option, setOption] = useState("Name"); // Search by name or address
  const [pool, setPool] = useState(null); // What pool is selected
  const [poolOptions, setPoolOptions] = useState(uniPoolOptions); // Stores pool options for open protocol
  const [inputAmount, setInputAmount] = useState(null); // Stores LP Token Amount
  const [usdValue, setUsdValue] = useState(null);
  const [reserves, setReserves] = useState(null);
  const [loading, setLoading] = useState(false); // Is data actively being fetched

  const setUniswap = () => {
    setMarket("Uniswap");
    setClient(uniswapClient);
    setTitle(UniswapLogo);
    setPool(null);
    setPoolOptions(uniPoolOptions);
    setUsdValue(null);
    setReserves(null);
  };
  const setSushiSwap = () => {
    setMarket("SushiSwap");
    setClient(sushiswapClient);
    setTitle(SushiSwapLogo);
    setPool(null);
    setPoolOptions(sushiPoolOptions);
    setUsdValue(null);
    setReserves(null);
  };
  const setName = () => {
    setOption("Name");
  };
  const setAddress = () => {
    setOption("Address");
  };

  const getPool = (e, data) => {
    setPool(data.value);
  };

  const getInput = (e, data) => {
    setInputAmount(data.value);
  };

  // Given a protocol, and LP token amount, get the value from TheGraph
  const calculateValue = async () => {
    if (pool != null && inputAmount != null) {
      setUsdValue(null);
      setReserves(null);
      setLoading(true);
      if (market === "Uniswap") {
        const result = await client.query({
          query: UNILP,
          variables: {
            id: pool,
          },
          fetchPolicy: "cache-first",
        });

        let pair = result.data.pair;
        let percent = inputAmount / parseFloat(pair.totalSupply);
        setUsdValue(parseFloat(pair.reserveUSD) * percent);
        let output = [
          pair.reserve0 * percent,
          pair.token0.name,
          pair.reserve1 * percent,
          pair.token1.name,
        ];
        setReserves(output);
        setLoading(false);
      } else if (market === "SushiSwap") {
        const result = await client.query({
          query: SUSHILP,
          variables: {
            id: pool,
          },
          fetchPolicy: "cache-first",
        });
        let pair = result.data.pair;
        let percent = inputAmount / parseFloat(pair.totalSupply);
        setUsdValue(parseFloat(pair.reserveUSD) * percent);
        let output = [
          pair.reserve0 * percent,
          pair.token0.name,
          pair.reserve1 * percent,
          pair.token1.name,
        ];
        setReserves(output);
        setLoading(false);
      }
    }
  };

  const displayPoolSelect = () => {
    if (option === "Name") {
      return (
        <Dropdown
          fluid
          search
          selection
          options={poolOptions}
          width="50%"
          onChange={getPool}
        />
      );
    } else {
      return (
        <Input className="ethinputbox" placeholder="" onChange={getPool} />
      );
    }
  };

  const loadingSpin = () => {
    if (loading === true) {
      return (
        <div className="spinny">
          <Spinner style={{ width: "3em", height: "3em" }} color="primary" />
        </div>
      );
    } else {
      return <></>;
    }
  };

  const displayOutput = () => {
    if (usdValue != null && reserves != null) {
      return (
        <div>
          <h2 style={{ marginTop: "30px" }}>Holdings</h2>
          <div className="buttonrow">
            <p>
              {reserves[0]} {reserves[1]}
            </p>
            <p>
              {reserves[2]} {reserves[3]}
            </p>
          </div>
          <h2>USD Value</h2>
          <p style={{ marginBottom: "30px" }}>${round(usdValue, 2)}</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const displayButtons = () => {
    if(market === 'Uniswap'){
      return(
        <React.Fragment>
        <Button color="info" onClick={setUniswap}>Uniswap</Button>
        <Button onClick={setSushiSwap}>SushiSwap</Button>
        </React.Fragment>
      );
    }
    else if(market === 'SushiSwap'){
      return (
        <React.Fragment>
        <Button onClick={setUniswap}>Uniswap</Button>
        <Button color="info" onClick={setSushiSwap}>SushiSwap</Button>
        </React.Fragment>
    );
    }

  }

  const displayInputTypeButtons = () => {
    if(option === "Name"){
    return (
      <React.Fragment>

      <Button color="info" onClick={setName}>By Name</Button>

      <Button onClick={setAddress}>By Contract Address</Button>
      </React.Fragment>
    )
    }
    else{
      return (

        <React.Fragment>

      <Button onClick={setName}>By Name</Button>

      <Button color="info" onClick={setAddress}>By Contract Address</Button>
      </React.Fragment>
        )
    }
  }

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 bg-dark" fluid>
        <div className="zapheader">
          <img
            src={LPValueImg}
            className="poolexplorer"
            alt="LP Token Value"
          ></img>
        </div>
        <div className="buttonrow">
          {displayButtons()}
        </div>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="zap">
              <CardHeader className="border-0">
                <img
                  src={title}
                  alt="Market Header"
                  className="lpcardheader"
                ></img>
              </CardHeader>
              <CardBody>
                <div className="buttonrow">
                  {displayInputTypeButtons()}

                </div>
                <h2>Select Pool</h2>
                <div className="poolselect">{displayPoolSelect()}</div>
                <h2>LP Token Amount</h2>
                <div className="ethinput">
                  <Input
                    className="ethinputbox"
                    placeholder="0.0"
                    onChange={getInput}
                  />
                </div>
                <Button
                  className="connectbutton"
                  onClick={calculateValue}
                  color="primary"
                >
                  Get Value
                </Button>
                {loadingSpin()}
                {displayOutput()}
              </CardBody>
            </Card>
            <div className="data"></div>
            {/*             <Card className="data">
              Data From <a href="https://thegraph.com/">The Graph</a>
            </Card> */}
          </div>
        </Row>
        <AdminFooter />
      </Container>
    </>
  );
};

export default LPValue;
