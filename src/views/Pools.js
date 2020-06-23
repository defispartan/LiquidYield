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
import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Pool from "components/Data/Pool.js";
class Pools extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Aave Uniswap Market Pool Explorer</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Liquidity Pool</th>
                      <th scope="col">Total Liquidity (USD)</th>
                      <th scope="col">24h Volume (USD)</th>
                      <th scope="col">Expected Fees (30d)</th>
                      <th scope="col">Expected Impermanent Loss (30d)</th>
                      <th scope="col">Expected ROI (30d)</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <Pool
                      exchange={"DAI/ETH"}
                      address={"0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667"}
                    />
                    <Pool
                      exchange={"LEND/ETH"}
                      address={"0xcaa7e4656f6a2b59f5f99c745f91ab26d1210dce"}
                    />
                    <Pool
                      exchange={"LINK/ETH"}
                      address={"0xf173214c720f58e03e194085b1db28b50acdeead"}
                    />
                    <Pool
                      exchange={"MKR/ETH"}
                      address={"0x2c4bd064b998838076fa341a83d007fc2fa50957"}
                    />
                    <Pool
                      exchange={"sETH/ETH"}
                      address={"0xe9cf7887b93150d4f2da7dfc6d502b216438f244"}
                    />
                    <Pool
                      exchange={"USDC/ETH"}
                      address={"0x97dec872013f6b5fb443861090ad931542878126"}
                    />
                  </tbody>
                </Table>
              </Card>
              <p className="tablefooter" style={{ marginTop: "30px" }}>
                * This data is populated from the{" "}
                <a href="https://thegraph.com/explorer/subgraph/ianlapham/uniswap">
                  Uniswap V1 Subgraph
                </a>
                . The only pools which are displayed are the pools currently
                available on the{" "}
                <a href="https://app.aave.com/?pool=Uniswap">
                  Aave Uniswap Market
                </a>
                .
              </p>
              <p className="tablefooter">
                ** Expected fees are calculated by projecting outward trends in
                Volume and Liquidity on different time-scales.
              </p>
              <p className="tablefooter">
                *** Impermanent loss is calculated by using previous 30 day
                price ratios plugged into the Uniswap bonding curve to estimate
                stake reduction vs HODLing.{" "}
              </p>{" "}
              <p className="tablefooter">
                **** Expected ROI is simply the difference between fees and
                impermanent loss
              </p>
              <p className="tablefooter">
                ***** As mentioned on the home page, there are a variety of
                factors which influence the returns of liquidity pools, as a
                result these numbers should be treated as rough estimations.
                I'll be working to incorporate more advanced methods to provide
                better estimations in the future. In the meantime I would
                suggest cross-referencing these values with estimations from{" "}
                <a href="https://www.uniswaproi.com/">UniswapROI</a> and{" "}
                <a href="https://pools.fyi/#/">Pools.fyi</a> before making
                investment decisions.
              </p>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Pools;
