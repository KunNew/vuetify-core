import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import notify from "./plugins/notify";
import axios from "axios";
// import constants from "./constants";

// import VueSocketIO from "vue-socket.io";
// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     connection: "http://localhost:5000",
//   })
// );

Vue.use(notify);

Vue.config.productionTip = false;

// axios.defaults.baseURL = constants.apiUrl;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
