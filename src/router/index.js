import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { showLoading, hideLoading } from "@/utils/loading";
import user from "./customs/user";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        redirect: { name: "home" },
      },
      {
        path: "/dashboard",
        name: "home",
        component: HomeView,
      },
      ...user,
    ],
  },
  {
    path: "/",
    component: () => import("../layouts/GuestLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/SignIn.vue"),
      },
      // {
      //   path: "/",
      //   name: "loading",
      //   component: () => import("../views/loading/Loading.vue"),
      // },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  showLoading();
  document.title = (to.name ? to.name + " - " : "") + "Vuetify Core";

  const guestRoute = ["login", "register", "forget", "password.reset"];

  if (store.state.auth.authenticated) {
    if (guestRoute.includes(to.name)) next({ name: "home" });
    else next();
  } else {
    if (guestRoute.includes(to.name)) next();
    else next({ name: "login" });
  }
});

router.afterEach(() => {
  hideLoading();
});

export default router;
