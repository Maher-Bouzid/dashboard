// =========================================================
// * Vue Material Dashboard - v1.3.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import axios from "axios";
//store
import store from "./store";
// router setup
import router from "./routes/routes";
// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
// const router = new VueRouter({
//   mode: "history",
//   routes, // short for routes: routes
//   linkExactActiveClass: "nav-item active"
// });

Vue.prototype.$Chartist = Chartist;

Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(require("vue-moment"));

//interceptors
axios.interceptors.request.use(
  function(request) {
    // if (request.url !== "http://localhost:3000/api/brand/signIn") {
    if (localStorage.getItem("x-token")) {
      request.headers["x-token"] = localStorage.getItem("x-token");
    }
    if (localStorage.getItem("x-refresh-token")) {
      request.headers["x-refresh-token"] = localStorage.getItem("x-refresh-token");
    }
    // }
    return request;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    if (response.headers["x-token"]) {
      localStorage.setItem("x-token", response.headers["x-token"]);
      localStorage.setItem("x-refresh-token", response.headers["x-refresh-token"]);
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  }
});
export default router;
