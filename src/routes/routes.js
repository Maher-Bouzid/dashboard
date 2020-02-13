import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import AdminDashboard from "@/pages/AdminDashboard.vue";
import BrandDashboard from "@/pages/BrandDashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import ProductList from "@/pages/ProductList.vue";
import AddProduct from "@/pages/AddProduct.vue";
import TableList from "@/pages/TableList.vue";
import Notifications from "@/pages/Notifications.vue";
import Brands from "@/pages/Brands.vue";
import Login from "@/pages/Login.vue";
import RegisterProfile from "@/pages/RegisterProfile.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/admin-dashboard",
    children: [
      {
        path: "/admin-dashboard",
        name: "Admin Dashboard",
        component: AdminDashboard
      },
      {
        path: "brand-dashboard",
        name: "Brand Dashboard",
        component: BrandDashboard
      },
      {
        path: "products",
        name: "Product List",
        component: ProductList
      },
      {
        path: "products/add",
        name: "Add a Product",
        component: AddProduct
      },
      {
        path: "brands",
        name: "Brands List",
        component: Brands
      },
      {
        path: "brands/add",
        name: "Add a Brand",
        component: UserProfile
      },
      {
        path: "profile",
        name: "Brand Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      }
    ]
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: RegisterProfile
  }
];

export default routes;
