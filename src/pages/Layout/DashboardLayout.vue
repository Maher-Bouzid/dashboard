<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <div v-if="!userType">
        <sidebar-link to="/admin-dashboard">
          <md-icon>dashboard</md-icon>
          <p>Dashboard</p>
        </sidebar-link>
        <div :class="accordionClass('isOpenTwo')">
          <div id="headingTwo" @click="toggleAccordion('isOpenTwo')">
            <sidebar-link to="#">
              <md-icon>people</md-icon>
              <p>Users</p>
              <i class="material-icons customIcon">keyboard_arrow_down</i>
            </sidebar-link>
          </div>
          <div id="collapseTwo" class="message-body">
            <sidebar-link to="/brands">
              <md-icon>content_paste</md-icon>
              <p>Brand List</p>
            </sidebar-link>
            <sidebar-link to="/brands/add">
              <md-icon>person_add</md-icon>
              <p>Add Brand</p>
            </sidebar-link>
          </div>
        </div>
      </div>
      <div v-else>
        <sidebar-link to="/brand-dashboard">
          <md-icon>dashboard</md-icon>
          <p>Dashboard</p>
        </sidebar-link>
        <div :class="accordionClass('isOpenOne')">
          <div id="headingOne" @click="toggleAccordion('isOpenOne')">
            <sidebar-link to="##">
              <md-icon>shopping_basket</md-icon>
              <p>Products</p>
              <i class="material-icons customIcon">keyboard_arrow_down</i>
            </sidebar-link>
          </div>
          <div id="collapseOne" class="message-body">
            <sidebar-link to="/products">
              <md-icon>content_paste</md-icon>
              <p>Product list</p>
            </sidebar-link>
            <sidebar-link to="/products/add">
              <md-icon>add</md-icon>
              <p>Add product</p>
            </sidebar-link>
          </div>
        </div>
      </div>

      <sidebar-link to="/orders">
        <md-icon>notifications</md-icon>
        <p>Orders</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data: () => ({
    control: {
      isOpenOne: false,
      isOpenTwo: false
    }
  }),
  methods: {
    accordionClass: function(arg) {
      return {
        "is-closed": !this.control[arg],
        "is-primary": this.control[arg]
      };
    },
    toggleAccordion: function(arg) {
      this.control[arg] = !this.control[arg];
    }
  },
  computed: {
    userType() {
      return this.$store.state.user.type === "brand";
    }
  }
};
</script>

<style>
.filter-header {
  cursor: pointer;
}
.message-body {
  padding: 0 0 0 20px;
  max-height: 50em;
  overflow: hidden;
  transition: 0.5s ease all;
}
.is-closed .message-body {
  max-height: 0;
}

::-webkit-scrollbar {
  width: 10px;
  border-radius: 20px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #88888888;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: #888888;
}

.customIcon {
  margin-left: auto !important;
}
</style>
