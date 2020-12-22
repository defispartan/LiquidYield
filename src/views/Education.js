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
import { Container, Row, Button } from "reactstrap";

import Uniswap from "assets/img/brand/uniswap.png";
import Aave from "assets/img/brand/aave.png";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Header from "components/Headers/Header.js";
import Web3 from "assets/img/brand/web3.PNG";
import LEZ from "assets/img/brand/LEZ.png";

class Scenarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <div className="infoheader" style={{ textAlign: "center" }}>
            <h1>Education Center</h1>
          </div>

          <div className="buttonrow">
            <a href="javascript:document.getElementById('ethereum').scrollIntoView(true);">
              <Button>Ethereum</Button>
            </a>
            <a href="javascript:document.getElementById('defi').scrollIntoView(true);">
              <Button>DeFi</Button>
            </a>
            <a href="javascript:document.getElementById('dex').scrollIntoView(true);">
              <Button>Decentralized Exchanges</Button>
            </a>

            <a href="javascript:document.getElementById('uniswap').scrollIntoView(true);">
              <Button>Uniswap</Button>
            </a>

            <a href="javascript:document.getElementById('sushiswap').scrollIntoView(true);">
              <Button>SushiSwap</Button>
            </a>

            <a href="javascript:document.getElementById('fees').scrollIntoView(true);">
              <Button>Fees</Button>
            </a>

            <a href="javascript:document.getElementById('il').scrollIntoView(true);">
              <Button>Impermanent Loss</Button>
            </a>

            <a href="javascript:document.getElementById('lm').scrollIntoView(true);">
              <Button>Liquidity Mining</Button>
            </a>

            <a href="javascript:document.getElementById('pe').scrollIntoView(true);">
              <Button>Price Exposure</Button>
            </a>

            <a href="javascript:document.getElementById('apr').scrollIntoView(true);">
              <Button>APR, APY, and ROI</Button>
            </a>

            <a href="javascript:document.getElementById('aave').scrollIntoView(true);">
              <Button>AAVE</Button>
            </a>
          </div>
          <h1 className="infoheader" id="ethereum">
            Ethereum
          </h1>
          <div className="edu">
            <p className="educontent">
              To understand Ethereum we must first take a step back and explore
              it's predecessor, Bitcoin.
            </p>
            <p className="educontent">
              In 2008, Satoshi Nakamoto wrote the Bitcoin whitepaper. The key
              innovation of this white paper is a consensus algorithm which
              secures a global, decentralized ledger of payments. The Bitcoin
              ledger is replicated across all participants which enforces{" "}
              <strong>immutability</strong> in the network. Immutability means
              that transaction on the Bitcoin network are irreversible, and that
              the supply of Bitcoin is not controlled by a single entity. If you
              hold the private key to a wallet cotaining 1 Bitcoin, NO ONE can
              modify the Bitcoin ledger and take your Bitcoin away, and NO
              ENTITY can create new Bitcoins and devalue your holdings outside
              of the 21 million supply cap set forth in the Bitcoin whitepaper.
            </p>
            <p className="educontent">
              Bitcoin is a revolutionary technology, but the underlying network
              serves a single purpose: to facilitate the transaction of Bitcoin.
              Ethereum is an extension of the Bitcoin distributed ledger with an
              infinitely broader scope of potential applications.{" "}
              <strong>
                Ethereum is a blockchain built on the foundation of
                programmability
              </strong>
              . Ethereum can be thought of as a global computer, where the
              current state, and execution of code is shared by all network
              participants. This means that any idea, agreement, or application
              that can be expressed in code can be verifiably executed and
              stored on the Ethereum blockchain. Over the last 5 years,
              developers have been rapidly innovating and turning this vision of
              a building decentralized web on Ethereum into a tangible reality.
            </p>
            <p className="educontent">
              The environment of applications (dApps) built on the blockchain is
              commonly referred to as <strong>Web3</strong>. The features of
              Web3 that make it so revolutionary are:
              <ul>
                <li>Seamless integration of a global payment network</li>
                <li>
                  Permisionless: There is no government or entity which can
                  prevent you from interacting with Web3. Anyone with an
                  internet connection is on a level playing field.
                </li>
                <li>
                  Censorship resistant: Once a dApp is deployed it will exist
                  forever on the blockchain. The same guarantees of immutability
                  discussed with Bitcoin apply to all interactions with Web3.
                </li>
                <li>
                  No Down Time: The decentralized nature of dApps means there is
                  no single point of failure.{" "}
                </li>
              </ul>
            </p>
          </div>
          <img src={Web3} alt="Web3" className="web"></img>
          <h1 className="infoheader" id="defi">
            DeFi
          </h1>
          <div className="edu">
            <p className="educontent">
              An experimental form of finance that does not rely on central
              financial intermediaries such as brokerages, exchanges, or banks,
              and instead utilizes smart contracts on blockchains, the most
              common being Ethereum. DeFi platforms allow people to lend or
              borrow funds from others, speculate on price movements on a range
              of assets using derivatives, trade cryptocurrencies, insure
              against risks, and earn interest in a savings-like account. Some
              DeFi applications promote high interest rates, with some providers
              offering triple-digit interest rates, but are subject to high
              risk. As of October 2020, over $11 billion was deposited in
              various decentralized finance protocols, which represents more
              than a tenfold growth during the course of 2020.
            </p>
            <p className="educontent">
              DeFi revolves around applications known as DApps (decentralized
              applications) that perform financial functions on digital ledgers
              called blockchains, a technology that was invented for Bitcoin but
              has since caught on more broadly. Rather than transactions being
              with and through a centralised intermediary such as a
              cryptocurrency exchange, transactions are directly between
              participants, mediated by smart contract programs. DApps are
              typically accessed through a Web3 enabled browser extension or
              application, such as MetaMask. Many of these DApps can connect and
              work together to create complex financial services. For example,
              stablecoin holders can commit assets to a liquidity pool. Others
              can borrow from this pool, by contributing additional collateral,
              typically more than the amount of the loan. The protocol
              automatically adjusts interest rates based upon the
              moment-to-moment demand for the asset.
            </p>
          </div>
          <h1 className="infoheader" id="dex">
            Decentralized Exchanges
          </h1>
          <div className="edu">
            <p className="educontent">
              A decentralized exchange (or DEX for short) is a peer-to-peer
              exchange that allows users to buy and sell cryptocurrency and
              other assets without a central intermediary involved.
              Decentralized exchanges differ from centralized exchanges as they
              enable users to remain in control of their funds by operating
              their critical functions on the blockchain: they leverage the
              technology behind cryptocurrencies themselves to enable a safer
              and more transparent trading. It solves the main limitations faced
              by cryptocurrency markets, since there is no single point of
              failure, aligning them with what has made the blockchain
              technology so powerful in the first place. Most decentralized
              exchanges are not fully decentralized, but semi-decentralized
              (full decentralization is today more of an ideal, due to
              limitations listed hereunder). In most cases, servers
              (centralized) still host order books (among other features) but do
              not hold private keys. Another central aspect is that
              decentralized exchanges present the characteristics, benefits and
              limitations, of their underlying blockchain. For more info on the
              differences between centralized and decentralized exchanges, check
              out this{" "}
              <a href="https://consensys.net/blog/news/decentralized-exchanges-overview-benefits-and-advantages-over-centralized-exchanges/">
                article
              </a>{" "}
              from Consensys.
            </p>
          </div>

          <h1 className="infoheader" id="uniswap">
            Uniswap
          </h1>
          <div className="edu">
            <p className="educontent">
              Uniswap is an on-chain system of smart contracts on the Ethereum
              blockchain, implementing an automated liquidity protocol based on
              a “constant product formula.” In V1 of the protocol, each pair on
              the protocol stores pooled reserves of two assets, and provides
              liquidity for those two assets, maintaining the invariant that the
              product of the reserves cannot decrease. Traders pay a
              30-basis-point fee on trades, which goes to liquidity providers.
              V2 is a new implementation based on the same formula, with several
              new highly desirable features. Most significantly, it enables the
              creation of arbitrary ERC20/ERC20 pairs, rather than supporting
              only pairs between ERC20 and ETH. It also provides a hardened
              price oracle that accumulates the relative price of the two assets
              at the beginning of each block. This allows other contracts on
              Ethereum to estimate the time-weighted average price for the two
              assets over arbitrary intervals. Finally, it enables “flash swaps”
              where users can receive assets freely and use them elsewhere on
              the chain, only paying for (or returning) those assets at the end
              of the transaction.
            </p>
          </div>

          <h1 className="infoheader" id="sushiswap">
            SushiSwap
          </h1>
          <div className="edu">
            <p className="educontent"></p>
          </div>

          <h1 className="infoheader" id="fees">
            Fees
          </h1>
          <div className="edu">
            <p className="educontent"></p>
          </div>

          <h1 className="infoheader" id="il">
            Impermanent Loss
          </h1>
          <div className="edu">
            <p className="educontent">
              The difference between holding tokens in an automated market maker
              (AMM) and holding them in your wallet. It occurs when the price of
              tokens inside an AMM diverge in any direction. The more
              divergence, the greater the impermanent loss. The loss is
              “impermanent” because as long as the relative prices of tokens in
              the AMM return to their original state when you entered the AMM,
              the loss disappears and you earn 100% of the trading fees.
              However, this is rarely the case. More often than not, impermanent
              loss becomes permanent, eating into your trade income or leaving
              you with negative returns.
            </p>
          </div>

          <h1 className="infoheader" id="lm">
            Liquidity Mining
          </h1>
          <div className="edu">
            <p className="educontent">
              Liquidity mining is the act of supplying liquidity to a protocol
              to earn provider fees, and additional incentives, including but
              not limited to governance tokens. In the example of SushiSwap,
              LP's for SushiSwap pools will be rewarded with SUSHI tokens over
              time. The amount of tokens earned is proportional to the amount of
              liquidity provided.
            </p>
          </div>
          <h1 className="infoheader" id="pe">
            Price Exposure
          </h1>
          <div className="edu">
            <p className="educontent"></p>
          </div>
          <h1 className="infoheader" id="apr">
            APR, APY, and ROI
          </h1>
          <div className="edu">
            <p className="educontent">
              These three terms are often misunderstand, and you will see them
              used incorectly on a variety of platforms. To maximize your
              returns as an investor it's important to understand their
              differences. Here is a formal definition for each, with an
              additional comment on how they relate to liquidity providers:
            </p>
            <ul>
              <li>
                <p className="educontent">
                  <strong>APY</strong>: A normalized representation of an
                  interest rate, based on a compounding period of one year. APY
                  figures allow a reasonable, single-point comparison of
                  different offerings with varying compounding schedules.
                  However, it does not account for the possibility of account
                  fees affecting the net gain. APY reflects interest paid on
                  interest (<strong>compounding interest</strong>), thus APY
                  will always be greater than or equal to APR. More info on this
                  term can be found{" "}
                  <a href="https://en.m.wikipedia.org/wiki/Annual_percentage_yield">
                    here
                  </a>
                  .
                </p>
              </li>

              <li>
                <p className="educontent">
                  <strong>APR</strong>: An annual percentage rate is the annual
                  rate charged for borrowing or earned through an investment.
                  APR is expressed as a percentage that represents the actual
                  yearly cost of funds over the term of a loan. More info on
                  this term can be found.{" "}
                  <a href="https://en.m.wikipedia.org/wiki/Annual_percentage_rate">
                    here
                  </a>
                  .
                </p>
              </li>
              <li>
                <p className="educontent">
                  <strong>ROI</strong>: A performance measure used to evaluate
                  the efficiency of an investment or compare the efficiency of a
                  number of different investments. ROI tries to directly measure
                  the amount of return on a particular investment, relative to
                  the investment's cost. To calculate ROI, the benefit (or
                  return) of an investment is divided by the cost of the
                  investment. The result is expressed as a percentage or a
                  ratio. More info on this term can be found{" "}
                  <a href="https://www.investopedia.com/terms/r/returnoninvestment.asp">
                    here
                  </a>
                  .
                </p>
              </li>
            </ul>
            <p className="educontent">
              If you recall the steps involved in calculating LP returns,
              predicting this value into the future requires an estimation of
              the pool liquidity, pool volume, pool rewards, and divergence of
              price ratio between assets. Getting an accurate estimate for these
              values on an <strong>annual</strong> level is not reasonable. It
              is for this reason that I have chosen to omit APR and APY from the{" "}
              <a href="/pools">Pool Explorer</a>, and have opted for more
              reasonable metrics of weekly and monthly ROI. In the future I plan
              to improve the strategies for estimating pool metrics, and will
              provide backtested confidence levels for these calculations.
            </p>
          </div>
          <h1 className="infoheader" id="aave">
            AAVE and the Liquid Ether Zap
          </h1>
          <div className="edu">
            <p className="educontent"></p>
          </div>
          <AdminFooter />
        </Container>
      </>
    );
  }
}

export default Scenarios;
