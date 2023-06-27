import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const moduleFiles = require.context("./modules", true, /.*\.js/);
const modules = moduleFiles.keys().reduce(
  (l, k) => ({
    ...l,
    [k.replace(/\.\/(.*)\.js/, "$1")]: moduleFiles(k).default,
  }),
  {}
);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["auth"],
    }),
  ],
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules,
});
