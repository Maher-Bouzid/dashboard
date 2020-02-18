<template>
  <div class="sidebar" :data-color="activeColor" :data-image="backgroundImage" :style="sidebarStyle">
    <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <div class="logo-img">
          <img
            src="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.15752-9/86293461_626321758193617_7447198391882219520_n.png?_nc_cat=110&_nc_ohc=q58D4ww8rTcAX-hww9d&_nc_ht=scontent.ftun4-1.fna&oh=d89cd8e196fde1af73f85c230f87de2c&oe=5F0049F5"
            alt="Progidy Store"
          />
        </div>
      </a>

      <a href="https://prodigy-store.onrender.com/" target="_blank" class="simple-text logo-normal">
        PRODIGY
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <slot>
          <sidebar-link v-for="(link, index) in sidebarLinks" :key="link.name + index" :to="link.path" :link="link"> </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink
  },
  props: {
    backgroundImage: {
      type: String,
      default: require("@/assets/img/sidebar-2.jpg")
    },
    activeColor: {
      type: String,
      default: "green",
      validator: value => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      };
    }
  }
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}
</style>
