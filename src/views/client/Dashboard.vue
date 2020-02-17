<template>
  <div
    id="wrapper"
    :class="{ 'd-flex flex-column hero': isSearchRequired }"
    :style="{
      'background-image': isSearchRequired ? getBannerURL : null
    }"
  >
    <header-component></header-component>
    <landing-page v-if="isSearchRequired"></landing-page>
    <footer class="footer" v-if="isSearchRequired">
      <div class="row">
        <div class="col-lg-4">
          <a href="#" class="footer__link" title="Contact Sales">
            Contact Sales
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
        <div class="col-lg-4">
          <a href="#" class="footer__link" title="Landlord Portal">
            Landlord Portal
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
        <div class="col-lg-4">
          <a href="#" class="footer__link" title="Broker Partner Program">
            Broker Partner Program
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </footer>
    <div
      class="modal__overlay"
      v-if="isSearchRequired"
      @click="removeClasss"
    ></div>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from "../../containers/client/Header";
import LandingPage from "./LandingPage";
import "../../assets/css/style.css";
export default {
  name: "Dashboard",
  components: {
    HeaderComponent,
    LandingPage
  },
  computed: {
    isSearchRequired() {
      console.log("==", this.$route.path == "/");
      return this.$route.path == "/";
    },
    getBannerURL() {
      return `url('${this.$store.state.common.publicPath}img/hero-banner.jpg')`;
    }
  },
  methods: {
    removeClasss() {
      var body = document.body;
      body.classList.remove("is-modalOpen");
    }
  }
};
</script>
