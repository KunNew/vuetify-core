import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { showLoading, hideLoading } from "@/utils/loading";
import user from "./customs/user";
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
    path: "/sign-in",
    name: "siginIn",
    component: () => import("../views/auth/SignIn.vue"),
  },
  {
    path: "/",
    name: "loading",
    component: () => import("../views/loading/Loading.vue"),
    meta: {
      public: true,
    },
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
  next();
});

router.afterEach(() => {
  hideLoading();
});

export default router;
