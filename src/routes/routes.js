import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import AdminDashboard from "@/pages/AdminDashboard.vue";
import BrandDashboard from "@/pages/BrandDashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Notifications from "@/pages/Notifications.vue";
import Brands from "@/pages/Brands.vue";
import Login from "@/pages/Login.vue";
import auth from "../middleware/auth";
import VueRouter from "vue-router";
import Vue from "vue";
import store from "../store";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/admin-dashboard",
    meta: {
      middleware: [auth]
    },
    children: [
      {
        path: "/admin-dashboard",
        name: "Admin Dashboard",
        component: AdminDashboard,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: "brand-dashboard",
        name: "Brand Dashboard",
        component: BrandDashboard,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: "products",
        name: "Product List",
        component: UserProfile,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: "products/add",
        name: "Add a Product",
        component: UserProfile,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: "brands",
        name: "Brands List",
        component: Brands,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: "brands/add",
        name: "Add a Brand",
        component: UserProfile,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: "profile",
        name: "Brand Profile",
        component: UserProfile,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: "table",
        name: "Table List",
        component: TableList,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
        meta: {
          middleware: [auth]
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];
const router = new VueRouter({
  mode: "history",
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store
  };
  return middleware[0]({
    ...context
  });
});
export default router;
