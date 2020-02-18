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
    const endpoint = request.url.split("/");
    if (endpoint[endpoint.length - 1] !== "signIn") {
      if (localStorage.getItem("x-token")) {
        request.headers["x-token"] = localStorage.getItem("x-token");
      }
      if (localStorage.getItem("x-refresh-token")) {
        request.headers["x-refresh-token"] = localStorage.getItem("x-refresh-token");
      }
    }
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
