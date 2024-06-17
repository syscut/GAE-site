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
    name: "articleGroup",
    component: () => import("./components/ArticleGroup.vue"),
  },
  {
    path: "/newArticle",
    name: "newArticle",
    meta: { requireAuth: true },
    component: () => import("./components/NewArticle.vue"),
  },
  {
    path: "/aboutMe",
    name: "aboutMe",
    component: () => import("./components/AboutMe.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/Login.vue"),
  },
  {
    path: "/translate",
    name: "translate",
    meta: { requireAuth: true },
    component: () => import("./components/TranslateMain.vue"),
  },
  {
    path: "/analyzeRseult",
    name: "analyzeRseult",
    meta: { requireAuth: true },
    component: () => import("./components/AnalyzeRseult.vue"),
  },
  {
    path: "/myVocabulary",
    name: "myVocabulary",
    meta: { requireAuth: true },
    component: () => import("./components/MyVocabulary.vue"),
  },
  {
    path: "/exam",
    name: "exam",
    meta: { requireAuth: true },
    component: () => import("./components/Exam.vue"),
  },
  {
    path: "/examResult",
    name: "examResult",
    meta: { requireAuth: true },
    component: () => import("./components/ExamResult.vue"),
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
};
/**
 * 讓註冊扭呈現讀取狀態
 * @param {Boolean} state
 */
const setLoadingState = (state) => {
  store.commit("setLoadingState", state);
};
const setRedirectUrl = (url = "") => {
  store.commit("setRedirectUrl", url);
};
const checkUser = async () => {
  return await axios.post("auth/c");
};
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  if (store.state.username == "") {
    setLoadingState(true);
    await checkUser()
      .then((d) => {
        setUser(d.data);
        if (to.name == "login") {
          next("/");
        } else {
          next();
        }
      })
      .catch((e) => {
        let errMessage =
          e?.response?.data?.message || e?.response?.data || e?.message || e;
        console.info(errMessage);
        if (to.meta.requireAuth) {
          setRedirectUrl(to.name);
          next({ name: "login" });
        } else {
          next();
        }
      })
      .finally(() => {
        setLoadingState(false);
      });
  } else {
    if (to.name == "login") {
      next("/");
    } else {
      next();
    }
  }
});
export default router;
