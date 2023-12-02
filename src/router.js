import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("./components/MainBody.vue") },
  { path: "/article", component: () => import("./components/Article.vue") },
  { path: "/new", component: () => import("./components/AddArticle.vue") },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
