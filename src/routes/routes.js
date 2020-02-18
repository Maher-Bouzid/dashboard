import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import AdminDashboard from "@/pages/AdminDashboard.vue";
import BrandDashboard from "@/pages/BrandDashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import ProductList from "@/pages/ProductList.vue";
import ProductDetails from "@/pages/ProductDetails.vue";
import AddProduct from "@/pages/AddProduct.vue";
import Brands from "@/pages/Brands.vue";
import Login from "@/pages/Login.vue";
import RegisterProfile from "@/pages/RegisterProfile.vue";

import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";
import authBrand from "../middleware/authBrand";
import verifyTokenBrandRegister from "../middleware/verifyTokenBrandRegister";

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
          middleware: [authAdmin]
        }
      },
      {
        path: "brand-dashboard",
        name: "Brand Dashboard",
        component: BrandDashboard,
        meta: {
          middleware: [authBrand]
        }
      },
      {
        path: "products",
        name: "Product List",
        component: ProductList,
        meta: {
          middleware: [authBrand]
        }
      },
      {
        path: "products/add",
        name: "Add a Product",
        component: AddProduct,
        meta: {
          middleware: [authBrand]
        }
      },
      {
        path: "products/:id",
        name: "Product Details",
        component: ProductDetails,
        meta: {
          middleware: [authBrand]
        }
      },
      {
        path: "brands",
        name: "Brands List",
        component: Brands,
        meta: {
          middleware: [authAdmin]
        }
      },
      {
        path: "brands/add",
        name: "Add a Brand",
        component: UserProfile,
        meta: {
          middleware: [authAdmin]
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register/:token",
    component: RegisterProfile,
    meta: {
      middleware: [verifyTokenBrandRegister]
    }
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
