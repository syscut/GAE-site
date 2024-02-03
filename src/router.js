import { createRouter, createWebHistory } from "vue-router";

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
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
