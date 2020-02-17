import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./routes.js";
import store from "./store";
import Vuelidate from "vuelidate";
// import Notifications from "vue-notification";
import Multiselect from "vue-multiselect";
import config from "./config";
// import * as VueGoogleMaps from "vue2-google-maps";

// Vue.use(Notifications);
import outsideDir from "./outsideclick"; // outside click controller
Vue.directive("click-outside", outsideDir);
Vue.use(Vuelidate);
Vue.component("multiselect", Multiselect);
import "./permission"; // permission control
console.log(process.browser, "=-=-=");
if (process.browser) {
  const VueGoogleMaps = require("vue2-google-maps");
  const Notifications = require("vue-notification").default;
  Vue.use(Notifications);
  Vue.use(VueGoogleMaps, {
    load: {
      key: config.get(process.env.NODE_ENV).GOOGLE_API_KEY,
      libraries: "places" // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)

      //// If you want to set the version, you can do so:
      // v: '3.26',
    }

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
  });
}

// export a factory function for creating fresh app, router and store
// instances
export function createApp() {
  // create router instance
  const router = createRouter();

  const app = new Vue({
    router,
    store,
    // the root instance simply renders the App component.
    render: h => h(App)
  });

  return { app, router };
}
