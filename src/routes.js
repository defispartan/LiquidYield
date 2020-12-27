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
import Index from "views/Index.js";
import About from "views/About.js";
import Zap from "views/ZapHome.js";
import Pools from "views/Pools.js";
import NewPools from "views/NewPools.js";
import LPValue from "views/LPValue.js";
import Education from "views/Education.js";
import Portfolio from "views/PortfolioHome.js";
var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "home icon text-primary",
    component: Index,
    layout: "admin",
  },
  {
    path: "/education",
    name: "Education Center",
    icon: "idea icon yellow",
    component: Education,
    layout: "admin",
  },
  {
    path: "/pools",
    name: "Pool Explorer",
    icon: "tint icon text-info",
    component: NewPools,
    layout: "admin",
  },
  {
    path: "/lpvalue",
    name: "LP Token Value",
    icon: "money icon green",
    component: LPValue,
    layout: "admin",
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    icon: "folder icon beige",
    component: Portfolio,
    layout: "admin",
  },

  {
    path: "/zap",
    name: "Liquid Ether Zap",
    icon: "bolt icon text-yellow",
    component: Zap,
    layout: "admin",
  },
  {
    path: "/about",
    name: "About",
    icon: "info icon text-green",
    component: About,
    layout: "admin",
  },
];
export default routes;
