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
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-app text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/pools",
    name: "Pool Explorer",
    icon: "ni ni-chart-pie-35 text-green",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/zap",
    name: "Liquid Ether Zap",
    icon: "ni ni-sound-wave text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/about",
    name: "About",
    icon: "ni ni-book-bookmark text-info",
    component: Login,
    layout: "/admin"
  }

];
export default routes;
