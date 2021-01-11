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
import EduHeader from "assets/img/brand/educenterheader.png"
import Aave from "assets/img/brand/aave.png";
import Ethereum from "assets/img/brand/ethereum.png";
import Uniswap from "assets/img/brand/uniswap.png";
import SushiNew from "assets/img/brand/sushinew.png";
import Ghost from "assets/img/brand/ghost.jpg";
import LEZ from "assets/img/brand/lezwhite.png";
import lpreturns from "assets/img/brand/lpreturns.PNG";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Header from "components/Headers/Header.js";
import Web3 from "assets/img/brand/web3.PNG";
import Bitcoin from "assets/img/brand/bitcoin.png";
import Factors from "assets/img/theme/factors.png";
import Utility from "assets/img/brand/utility.jpg";

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
        <Container className="mt--7 bg-dark" fluid>
        <div className="zapheader">
          <img
            src={EduHeader}
            className="poolexplorer"
            alt="Education Center"
          ></img>
        </div>

          <div className="buttonrow">
            <a href="javascript:document.getElementById('bitcoin').scrollIntoView(true);">
              <Button>Bitcoin</Button>
            </a>
            <a href="javascript:document.getElementById('ethereum').scrollIntoView(true);">
              <Button>
                Ethereum <i className="star icon yellow"></i>
              </Button>
            </a>
            <a href="javascript:document.getElementById('defi').scrollIntoView(true);">
              <Button>DeFi</Button>
            </a>
            <a href="javascript:document.getElementById('start').scrollIntoView(true);">
              <Button>
                Getting Started <i className="star icon yellow"></i>
              </Button>
            </a>
            <a href="javascript:document.getElementById('risk').scrollIntoView(true);">
              <Button>Risks</Button>
            </a>

            <a href="javascript:document.getElementById('dex').scrollIntoView(true);">
              <Button>Decentralized Exchanges</Button>
            </a>
            <a href="javascript:document.getElementById('lp').scrollIntoView(true);">
              <Button>
                Liquidity Provider <i className="star icon yellow"></i>
              </Button>
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

            <a href="javascript:document.getElementById('apy').scrollIntoView(true);">
              <Button>
                APY, APR, and ROI <i className="star icon yellow"></i>
              </Button>
            </a>

            <a href="javascript:document.getElementById('aave').scrollIntoView(true);">
              <Button>AAVE</Button>
            </a>

            <a href="javascript:document.getElementById('governance').scrollIntoView(true);">
              <Button>Governance</Button>
            </a>

            <a href="javascript:document.getElementById('lez').scrollIntoView(true);">
              <Button>The Liquid Ether Zap</Button>
            </a>
          </div>

          <div className="jump">
            <a href="javascript:document.getElementById('top').scrollIntoView(true);">
              <Button>Back To Top ↑</Button>
            </a>
          </div>

          <h2 className="infoheader" id="bitcoin">
            Bitcoin{" "}
            <img src={Bitcoin} alt="Bitcoin Logo" className="infoimage"></img>
          </h2>
          <div className="edu">
            <p className="educontent">
              Bitcoin is a cryptocurrency invented in 2008 by an unknown person
              or group of people using the name Satoshi Nakamoto, and
              implemented as an open-source software in 2009. Bitcoin is a
              decentralized digital currency without a central bank or single
              administrator that can be sent from user to user on the
              peer-to-peer bitcoin network without the need for intermediaries.
              Transactions are verified by network nodes through cryptography
              and recorded in a public distributed ledger called a blockchain.
              Bitcoins are created as a reward for a process known as mining.
              They can be exchanged for other currencies, products, and
              services.
            </p>

            <p className="educontent">
              The key innovation of the Bitcoin whitepaper is a consensus
              algorithm which secures a global, decentralized ledger of
              payments. The Bitcoin ledger is replicated across all
              participants, which enforces <strong>immutability</strong> in the
              network. Immutability means that transactions on the Bitcoin
              network are irreversible, and that the supply of Bitcoin is not
              controlled by a single entity. If you hold the private key to a
              wallet containing one Bitcoin, NO ONE can modify the Bitcoin ledger
              and take your Bitcoin away, and NO ONE can create new Bitcoins and
              de-value your holdings outside of the 21 million Bitcoin supply
              cap set forth in the whitepaper. In this way Bitcoin acts as a
              digital store of value with a finite supply. There is a strong
              case to be made that Bitcoin is a logical hedge against fiat
              inflation, given it's similarities to Gold and the increasingly
              digital presence of money.
            </p>
          </div>
          <h2 className="infoheader" id="ethereum">
            Ethereum{" "}
            <img src={Ethereum} alt="Ethereum Logo" className="infoimage"></img>
          </h2>
          <div className="edu">
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
              current state and execution of code is shared by all network
              participants. This means that any idea, agreement, or application
              that can be expressed in code can be verifiably executed and
              stored on the Ethereum blockchain.
            </p>
            <p className="educontent">
              The environment of applications (dApps) built on the blockchain is
              commonly referred to as <strong>Web3</strong>. The features of
              Web3 that make it so revolutionary are:
              <ul style={{ paddingTop: "20px" }}>
                <li>Seamless integration of a global payment network</li>
                <li>
                  Permissionless: There is no government or entity which can
                  prevent you from interacting with Web3. Anyone with an
                  internet connection is on a level playing field.
                </li>
                <li>
                  Censorship Resistant: Once a dApp is deployed, it will exist
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
          <h2 className="infoheader" id="defi">
            DeFi
          </h2>
          <div className="edu">
            <p className="educontent">
              DeFi (or decentralized finance) is an experimental form of finance
              that does not rely on central financial intermediaries such as
              brokerages, exchanges, or banks. DeFi instead utilizes smart
              contracts on blockchains, the most common being Ethereum. DeFi
              platforms allow people to lend or borrow funds from others,
              speculate on price movements on a range of assets using
              derivatives, trade cryptocurrencies, insure against risks, or earn
              interest in a savings-like account just to name a few. Some DeFi
              applications promote high interest rates, with some providers
              offering triple-digit interest rates, but are subject to high risk
              and volatility. As of October 2020, over $11 billion was deposited
              in various decentralized finance protocols, which represents more
              than a tenfold growth during the course of 2020.
            </p>
            <p className="educontent">
              DeFi revolves around applications (dApps) that perform financial
              functions on blockchains. Rather than transactions being with and
              through a centralized intermediary such as a cryptocurrency
              exchange, transactions are directly between participants, mediated
              by smart contract programs. DApps are typically accessed through a
              Web3 enabled browser extension or application, such as MetaMask.
              Many of these dApps can connect and work together to create
              synergistic financial services. This phenomena is known as{" "}
              <strong>composability</strong>, and is a stark contrast to the
              fragmented infrastructure of the modern banking system. The
              composability of DeFi protocols has opened the door for new forms
              of financial products, and has created a "sandbox" for financial
              innovation which has never previously existed. The Liquid Ether
              Zap is an example of a product which is the direct result of DeFi
              composability.
            </p>
          </div>

          <h2 className="infoheader" id="start">
            Getting Started
          </h2>
          <div className="edu">
            <p className="educontent">
              This section is very generalized and opinionated. The advice that I
              give here is <strong>not</strong> financial advice and should not
              be interpreted as such. These are just some thoughts and resources
              that you may find useful when starting out with cryptocurrency.
            </p>
            <p>
              The first step in engaging with cryptocurrency is to understand
              cryptocurrency wallets. The following guide will teach you about
              all of the different kinds of wallets, and give you an
              introduction on best practices for keeping wallets secure:
              <a href="https://collectiveshift.com.au/kc/storage-wallets/">
                {" "}All About Cryptocurrency Wallets
              </a>
              .
            </p>
            <p className="educontent">
              I would break down the content in this guide into two parts:
              <ul style={{ paddingTop: "20px" }}>
                <li>
                  <strong>On Ramps: </strong>
                  This is where you will actually purchase cryptocurrency with
                  your native currency. Some of the most popular on-ramps are{" "}
                  <a href="https://www.coinbase.com/">Coinbase</a> and{" "}
                  <a href="https://www.binance.com/">Binance</a>. If you are on
                  a mobile device I would personally recommend{" "}
                  <a href="https://www.argent.xyz/">Argent</a> because of it's
                  simple interface and direct integration with DeFi
                  applications.
                </li>
                <li>
                  <strong>Storage: </strong>
                  It is not recommended to store your cryptocurrency on an
                  exchange (see{" "}
                  <a href="https://selfkey.org/list-of-cryptocurrency-exchange-hacks/">
                    here
                  </a>{" "}
                  for a list of reasons why). For long term storage it is best
                  to use a hardware wallet such as a{" "}
                  <a href="https://www.ledger.com/">Ledger</a> or{" "}
                  <a href="https://trezor.io/">Trezor</a>. For interacting with
                  DeFi applications, it is also recommended to have a separate
                  browser wallet called{" "}
                  <a href="https://metamask.io/">MetaMask</a> where you can
                  quickly interact with dApps and send coins to other wallets.
                </li>
              </ul>
            </p>
            <p>
              Once you own cryptocurrency and have your tokens secured on a
              hardware wallet, take some time to give yourself a pat on the back.
              You're officially ahead of the curve and on your way to living
              bankless. After you're all set up with wallets it's time to learn
              about and interact with blockchain projects. This website is a
              great place to learn about a few specific protocols, but if you're
              looking for more general sources of information check out{" "}
              <a href="https://newsletter.banklesshq.com/p/-guide-1-starting-with-bankless">
                Bankless
              </a>
              .
            </p>
          </div>

          <h2 className="infoheader" id="risk">
            Risks
          </h2>
          <div className="edu">
            <p className="educontent">
              The permissionless nature of cryptocurrency means that there's no
              central authority which can revert transactions. This means that
              it is <strong>crucial</strong> to take the security of your
              cryptocurrency wallets and blockchain interactions seriously. The
              first thing you must understand is how cryptocurrency wallets
              work. If you haven't read the{" "}
              <a href="https://collectiveshift.com.au/kc/storage-wallets/">
                All About Cryptocurrency Wallets
              </a>{" "}
              guide I would strongly encourage you to do that now. This should
              hopefully teach you the importance of keeping your private keys
              safe. Once you understand how wallets work it's important to
              understand the ways in which hackers will try to exploit you. The
              <a href="https://collectiveshift.com.au/knowledge-centre/how-to-identify-avoid-crypto-scams/">
                {" "}
                How to Identify and Avoid Crypto Scams
              </a>{" "}
              guide is another resource that is crucial to read-through and
              understand.
            </p>
            <p>
              Once you understand the risks associated with wallet security,
              it's time to turn to protocol security. The experimental and
              open-source nature of DeFi means that hacks are a pretty common
              occurrence. There are a few things that you can do to protect
              yourself from these hacks:
              <ul style={{ paddingTop: "20px" }}>
                <li>
                  <strong>Buy Insurance</strong>: Protocols such as{" "}
                  <a href="https://www.coverprotocol.com/">Cover</a> allow you
                  to buy insurance for your deposits in the event that a
                  protocol is hacked.
                </li>
                <li>
                  <strong>Do Your Own Research</strong>: Some factors to
                  consider before interacting with a protocol are the age, value
                  locked, complexity, contract upgradability, and most
                  importantly the security audits which have been conducted.{" "}
                </li>
              </ul>
            </p>
          </div>

          <h2 className="infoheader" id="dex">
            Decentralized Exchanges
          </h2>
          <div className="edu">
            <p className="educontent">
              A decentralized exchange (DEX) is a peer-to-peer exchange that
              allows users to buy and sell cryptocurrency and other assets
              without a central intermediary involved. Decentralized exchanges
              differ from centralized exchanges as they enable users to remain
              in control of their funds by operating their critical functions on
              the blockchain: they leverage the technology behind
              cryptocurrencies themselves to enable a safer and more transparent
              trading. It solves the main limitations faced by cryptocurrency
              markets, since there is no single point of failure, aligning them
              with what has made the blockchain technology so powerful in the
              first place. Most decentralized exchanges are not fully
              decentralized, but semi-decentralized (full decentralization is
              today more of an ideal, due to limitations listed hereunder). In
              most cases, servers (centralized) still host order books (among
              other features) but do not hold private keys. Another central
              aspect is that decentralized exchanges present the
              characteristics, benefits, and limitations, of their underlying
              blockchain. For more info on the differences between centralized
              and decentralized exchanges, check out this{" "}
              <a href="https://consensys.net/blog/news/decentralized-exchanges-overview-benefits-and-advantages-over-centralized-exchanges/">
                article
              </a>{" "}
              from Consensys.
            </p>
          </div>
          <h2 className="infoheader" id="lp">
            Liquidity Provider
          </h2>
          <div className="edu">
            <p className="educontent">
              A liquidity provider is a user or institution who funds a
              liquidity pool with crypto assets they own to facilitate trading
              on the platform and earn passive income on their deposit.
              Liquidity pools are leveraged by the decentralized exchanges that
              use automated market maker-based systems to allow trading of
              illiquid trading pairs with limited slippage. Instead of using
              traditional order book-based trading systems, such exchanges use
              funds that are held for every asset in every trading pair to allow
              trades to be executed. While trading illiquid trading pairs on
              order book-based exchanges could lead to suffering from great
              slippage and the inability to execute trades, the advantage of
              liquidity providers is that trades can always be executed as long
              as the liquidity pools are big enough. For this reason, liquidity
              providers are seen as <strong>trade facilitators</strong> and paid
              with the transaction fees paid for the trades that they enabled.
              How much liquidity providers are paid is based on the percentage
              of the liquidity pool that they provide. When funding the pool,
              they are usually required to fund two different assets to enable
              traders to switch between one to the other by trading them in
              pairs. In the case of Uniswap and SushiSwap this ratio is 50/50.
            </p>
            <p className="educontent">
              Liquidity Provision is an excellent way to earn a consistent ROI
              on a pair of assets when properly managed. It is definitely
              possible to consistently return 2-3% ROI monthly with an LP
              position. To make this possible you must understand the systems
              which you are providing liquidity to, and the four factors which
              will influence your returns as an LP:
              <img src={Factors} className="factors"></img>
              Information on two of the leading decentralized exchanges and each
              of these four factors can be found below.
            </p>
          </div>

          <h2 className="infoheader" id="uniswap">
            <img src={Uniswap} alt="Uniswap Logo" className="infoimage"></img>
          </h2>
          <div className="edu">
            <p className="educontent">
              Uniswap is a dApp built on the Ethereum blockchain which allows
              users to swap tokens on a decentralized exchange. Uniswap is
              notable for its simple user interface and low transaction fees.
              These factors have contributed to Uniswap's status as the highest
              volume decentralized exchange in existence. The Uniswap protocol
              consists of a series of liquidity pools. These pools are just
              pairs of assets, which serve as the liquidity to facilitate trades
              on Uniswap. When a user swaps funds on Uniswap, they pay a 30
              basis-point fee (0.03%) which goes directly to the liquidity
              providers of the pool.
            </p>
            <p className="educontent">
              The Uniswap Protocol has a governance token called UNI. Token
              holders are responsible for ensuring that governance decisions are
              made in compliance with applicable laws and regulations. To help
              facilitate this, the fee switch has been initialized to a contract
              UNI holders can use to vote on tokens for which they will collect
              fees. The community is encouraged to consult knowledgeable legal
              and regulatory professionals before implementing any specific
              proposal. Token holders have immediate ownership of Uniswap
              governance, UNI community treasury, the protocol switch fee, eth
              ENS, Uniswap Default List (tokens.uniswap.eth), and SOCKS
              liquidity tokens.
            </p>
          </div>

          <h2 className="infoheader" id="sushiswap">
            SushiSwap{" "}
            <img
              src={SushiNew}
              alt="SushiSwap Logo"
              className="infoimage"
            ></img>
          </h2>
          <div className="edu">
            <p className="educontent">
              SushiSwap is another decentralized exchange on Ethereum, which
              began as a fork of Uniswap. The launch of SushiSwap was a wild
              ride beginning on September 6, 2020. On this date a platform
              launched which allowed users to stake Uniswap LP tokens and
              harvest SUSHI tokens at a 10x reward rate. The true launch of
              SushiSwap was to happen in a few weeks, when all of the staked
              Uniswap liquidity would be converted to SushiSwap liquidity, a
              liquidity heist of sorts. Within the first few days almost $1
              Billion worth of liquidity was staked in this new protocol, and
              demand for SUSHI on exchanges drove the price up above $8.00. The
              pseudonymous founder of the project Chef Nomi sold $14 million
              worth of Ether from the development fund (which he later returned)
              in a controversial move which killed a lot of public hype over the
              project. Nonetheless, the liquidity heist went off without a hitch
              and the SushiSwap exchange has continued to pull in a large amount
              of liquidity and moderate trade volume. SushiSwap re-entered the
              radar of the DeFi space when it was announced that the SushiSwap
              (which has been hard at work building new products despite the
              departure of Chef Nomi) is merging with the popular Yearn.Finance
              protocol.
            </p>
            <p className="educontent">
              The previously mentioned SUSHI token is the native token of
              SushiSwap. There are two key aspects of the SUSHI token which
              differ from UNI:
              <ul>
                <li>
                  When staked, the Token entitles holders to earn a small
                  portion of SushiSwap's collected fees (0.005%).
                </li>
                <li>
                  Liquidity providers on SushiSwap are also paid of portion of
                  SUSHI proportional to their position size. This Liquidity
                  Mining reward is factored into the{" "}
                  <a href="/pools">SushiSwap Pool ROI</a>.
                </li>
              </ul>
              The token has a hard cap of 250 million SUSHI, to be reached in
              November 2023. The current block reward liquidity providers is 70
              SUSHI / block.
            </p>
          </div>

          <h2 className="infoheader" id="fees">
            Fees
          </h2>
          <div className="edu">
            <p className="educontent">
              Liquidity providers earn a percentage of the trading fees (0.03%
              for Uniswap and 0.025% for SushiSwap) for each swap performed on
              the platform. The amount of fees that an LP will collect depend
              on:
              <ul>
                <li>Ratio of your liquidity to the total pool liquidity </li>
                <li>Volume of the liquidity pool</li>
              </ul>
            </p>
          </div>

          <h2 className="infoheader" id="il">
            Impermanent Loss
          </h2>
          <div className="edu">
            <p className="educontent">
              Impermanent Loss is the difference between holding tokens in a
              liquidity pool and holding them in your wallet. This occurs when
              the price of tokens inside a pool diverge in any direction. The
              more divergence, the greater the impermanent loss. The loss is
              “impermanent” because as long as the relative prices of tokens in
              the AMM return to their original state when you entered the AMM,
              the loss disappears and you earn 100% of the trading fees.
              However, this is rarely the case. More often than not, impermanent
              loss becomes permanent, eating into your trade income or leaving
              you with negative returns. It is important to monitor the
              impermanent loss of a potential investment or current position to
              pick appropriate entry and exit points, and to find pools with
              fees and liquidity rewards which are expected to overcome the
              effects of impermanent loss. The following graphics shows the
              returns you can expect for varying levels of price divergence on
              the x-axis, and pool growth in the form of collected fees +
              liquidity mining rewards shown by the different colored lines:
              <img src={lpreturns} className="lpreturns"></img> In the future,
              I'm planning on adding a historical and scenario-based calculator
              for impermanent loss. If you'd like to try out an impermanent loss
              calculator now you can check one out{" "}
              <a href="https://baller.netlify.app/">here</a>.
            </p>
          </div>

          <h2 className="infoheader" id="lm">
            Liquidity Mining
          </h2>
          <div className="edu">
            <p className="educontent">
              Liquidity Mining is the act of supplying liquidity to a protocol
              and earning additional incentives beyond trading fees, including
              but not limited to governance tokens. Liquidity Mining was a
              revolution which took over the DeFi landscape in 2020, and
              introduced incentives for users to become adopters (usually
              liquidity providers) of certain protocols. In the example of
              SushiSwap, LP's for SushiSwap pools will be rewarded with SUSHI
              tokens over time. The amount of tokens earned is proportional to
              the amount of liquidity provided.
            </p>
            <p>
              The reason for protocols introducing liquidity mining is to boost
              adoption and give early adopters a sense of "brand loyalty" by
              rewarding them with governance tokens. The rationale of governance
              tokens pushing protocol adoption is summarized in the graphic
              below.
            </p>
            <img src={Utility} className="utility"></img>
          </div>
          <h2 className="infoheader" id="pe">
            Price Exposure
          </h2>
          <div className="edu">
            <p className="educontent">
              In my opinion, the most neglected factor to consider when choosing
              a liquidity pool on Uniswap or SushiSwap is price exposure. If you
              measure your returns with respect to Ethereum (which I would
              strongly advise), there are two things you need to consider:
              <ul>
                <li>
                  What gains or losses am I incurring by only being exposed to
                  50% ETH.
                </li>
                <li>
                  What gains or losses am I incurring by exposing myself to 50%
                  of another asset?
                </li>
              </ul>
              For the second question, there's no alternative but to DYOR (Do
              Your Own Research) on the token you are buying and make an
              informed decision. For the first question, if you hold your
              liquidity for long enough you are almost certainly missing out on
              gains from lack of ETH exposure. This is the motivation behind the
              Liquid Ether Zap. By leveraging the composability of DeFi and
              using LP tokens as a form of collateral, the zap allows users to
              borrow assets and maintain ~100% to the price of ETH while
              providing liquidity. I have another visualizer planned for
              calculating historical and scenario-based price exposure in the
              future.
            </p>
          </div>
          <h2 className="infoheader" id="apy">
            APY, APR, and ROI
          </h2>
          <div className="edu">
            <p className="educontent">
              These three terms are often misunderstood, and you will see them
              used incorrectly on a variety of platforms. To maximize your
              returns as an investor it's important to understand their
              differences. Here is a formal definition for each, with an
              additional comment on how they relate to liquidity providers:
            </p>
            <ul style={{ paddingTop: "20px" }}>
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
              <a href="/pools">Pool Explorer</a>, and have opted for monthly ROI
              instead. In the future I plan to improve the strategies for
              estimating pool metrics, and will provide backtested confidence
              levels for these calculations.
            </p>
            <p className="educontent">
              Another caveat about the yields of an LP position is that the ROI
              you will see is <strong>with respect to the LP tokens</strong>{" "}
              themselves. The LP tokens have 50% price exposure to ETH and 50%
              to another asset, so the ROI is the return compared to holding
              these assets in a 50-50 ratio.
            </p>

            {/* 
              The following
              three calculations should help clarify this idea, drive home the
              importance of tracking yields with respect to ETH, and provide the
              motivation behind the Liquid Ether Zap:
            </p>
            <p className="educontent">
              In the following calculations, LP ROI is the rate of return you
              will find in the Pool Explorer (fees + liquidity rewards -
              impermanent loss).
            </p>
            <p className="educontent">
              To calculate the USD value of LP position returns:
              <div style={{ textAlign: "center" }}>
                <p className="educontent">
                  USD Output Value = USD Input Value + (USD Input Value * LP
                  ROI)
                </p>
              </div>
            </p> */}
          </div>
          <h2 className="infoheader" id="aave">
            <img src={Aave} alt="AAVE Logo" className="infoimage"></img>{" "}
            <img src={Ghost} className="infoimage"></img>
          </h2>

          <div className="edu">
            <p className="educontent">
              AAVE is decentralized and non-custodial money market protocol
              where users can participate as depositors or borrowers. Depositors
              provide liquidity to the market to earn a passive income, while
              borrowers are able to borrow in an overcollateralized
              (perpetually) or undercollateralized (one-block liquidity)
              fashion. For borrowers, they are given the option to borrow at
              either variable or fixed rates. Depositors receive an aToken
              version of the asset they have deposited into AAVE, which accrues
              interest each second. Each asset exists as its own pool. The
              protocol has been audited and secured. The protocol is open
              source, which allows anyone to interact with the user interface
              client, API or directly with the smart contracts on the Ethereum
              network. Being open source means that users are able to build any
              third-party service or application to interact with the protocol
              and enrich their product (like this one). The decentralized nature
              of AAVE also means that users can propose changes to the protocol
              in the form of governance. This process is described in detail
              below, and will be the mechanism for proposing the addition of the
              additional markets which accept Uniswap and SushiSwap LP tokens as
              collateral.
            </p>
          </div>
          <h2 className="infoheader" id="governance">
            Governance
          </h2>
          <div className="edu">
            <p className="educontent">
              Governance is a structure that every user or participant agrees to
              follow. Everything humans use is under some form of governance.
              Its core purpose is to meet the user or participant's needs with
              available resources as efficiently as possible and achieve the
              long-term sustainability of the structure. It applies to any type
              of group, be it in the real world or digital. Governance becomes
              increasingly indispensable as institutions, organizations, or
              services grow. In the context of DeFi, the governance of protocols
              is typically delegated to the holders of a governance token.
            </p>
            <p className="educontent">
              A governance token is a token which developers create to allow
              token holders to help shape the future of a protocol. Governance
              token holders can influence decisions concerning the project such
              as proposing or deciding on new feature proposals and even
              changing the governance system itself. In many cases, the changes
              proposed, vetted and then voted on through on-chain governance
              accessed by using governance tokens are applied automatically due
              to smart contracts. In other cases, the team maintaining the
              project is tasked with applying the changes or hiring someone who
              will. Proponents of systems that use governance tokens believe
              that they allow for user control, which holds true to the original
              cryptocurrency ideals of decentralization and democratization. In
              most cases, organizations who let users control the development of
              their systems are called decentralized autonomous organizations
              (DAOs).
            </p>
          </div>
          <h2 className="infoheader" id="lez">
            Liquid Ether Zap
          </h2>
          <div className="edu">
            <p className="educontent">
              The Liquid Ether Zap is a tool which allows users to go from ETH
              into a liquidity pool while maintaining ~100%{" "}
              <a href="#pe">Price Exposure</a> to ETH. The motivation behind
              this zap is that if you are long term bullish on the price of
              Ethereum, there is money left on the table when providing
              liquidity in the form of lack of ETH price exposure. This zap
              leverages the composability of DeFi to collateralize LP tokens,
              and borrow assets to increase price exposure to ETH. The reason
              for price exposure being ~100% instead of exactly 100% is because
              your exposure to ETH while in a liquidity pool varies based on
              trading fees, impermanent loss, and asset price divergence. Two
              scenarios in which your ETH exposure would fall below 100% are if
              impermanent loss is greater than trading fee revenue, or if ETH
              increases in value relative to the other paired asset.
            </p>
            <p>It is very important to understand what 100% price exposure to ETH means in this context.
              Your total asset exposure with the Liquid Ether Zap is 150% of your initial investment, broken down as follows:
              <ul>
                <li>50% exposed to ETH from the liquidity pool</li>
                <li>50% exposed to the other asset in the liquidity pool</li>
                <li>50% exposed to ETH from borrowing a stablecoin and swapping to ETH on AAVE</li>
              </ul>
            Here's a diagram depicting the steps involved:

            </p>
            <img src={LEZ} alt="Liquid Ether Zap" className="indexlez"></img>
          </div>
          <AdminFooter />
        </Container>
      </>
    );
  }
}

export default Scenarios;
