import constants from "@/constants";
import router from "@/router";
import axiosApiInstance from "@/utils/utilites";
import axios from "axios";

const state = {
  user: {},
  authenticated: false,
  accessToken: null,
};

const mutations = {
  SET_AUTH_USER(state, value) {
    state.user = value;
  },
  SET_AUTH_TOKEN(state, token) {
    state.accessToken = token;
  },
  SET_AUTHENTICATED(state, value) {
    state.authenticated = value;
  },
  REMOVE_AUTH_TOKEN(state) {
    state.accessToken = null;
  },
  REMOVE_AUTH_USER(state) {
    state.user = {};
  },
};

const actions = {
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      axiosApiInstance
        .get("/users/profile")
        .then((res) => {
          // const data = response.data?.role.permissions.map((it) => {
          //     return {
          //         id: it.id,
          //         name: it.name,
          //     };
          // });
          // response.data.role.permissions = data;
          // console.log(response.data);

          commit("SET_AUTH_USER", res.data);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  },
  login({ commit }, credential) {
    return new Promise((resolve, reject) => {
      axios
        .post(`api/users/login`, credential)
        .then((res) => {
          console.log(res.data);
          commit("SET_AUTHENTICATED", true);
          commit("SET_AUTH_TOKEN", res.data.token);
          resolve(res);
        })
        .catch((response) => {
          reject(response);
        });
    });
  },
  logout({ commit }) {
    commit("SET_AUTHENTICATED", false);
    commit("REMOVE_AUTH_TOKEN");
    commit("REMOVE_AUTH_USER");
    router.push({ name: "login" });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
