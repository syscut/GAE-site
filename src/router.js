import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("./components/MainBody.vue") },
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
    component: () => import("./components/AboutMe.vue"),
  },
  {
    path: "/login",
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
export default router;
