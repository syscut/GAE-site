import { createRouter, createWebHistory } from "vue-router";
import store from "./store/store.js";
import axios from "axios";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./components/MainBody.vue"),
  },
  {
    path: "/articleGroup",
    component: () => import("./components/ArticleGroup.vue"),
  },
  {
    path: "/newArticle",
    component: () => import("./components/NewArticle.vue"),
  },
  {
    path: "/aboutMe",
    meta: { requireAuth: true },
    component: () => import("./components/AboutMe.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/Login.vue"),
  },
  {
    path: "/translate",
    component: () => import("./components/TranslateMain.vue"),
  },
  {
    path: "/analyzeRseult",
    component: () => import("./components/AnalyzeRseult.vue"),
  },
];

const setUser = (
  u = {
    username: "",
    name: "",
    email: "",
    birthday: "",
    education: "",
    role: 5,
  }
) => {
  store.commit("setUser", u);
  // $q.loading.hide();
};
const setLoadingState = (state) => {
  store.commit("setLoadingState", state);
};
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  setLoadingState(true);
  axios
    .post("auth/c")
    .then((d) => {
      setUser(d.data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      setLoadingState(false);
    });
  if (to.meta.requireAuth && store.state.username == "") {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
