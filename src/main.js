import { createApp } from "vue";
import "./style.css";
import { Quasar, LoadingBar } from "quasar";
import router from "./router.js";
import axios from "axios";
import App from "./App.vue";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "quasar/src/css/index.sass";
axios.defaults.baseURL = import.meta.env.PROD
  ? "https://syscut.com/"
  : "http://127.0.0.1:3101/";
const home = import.meta.env.PROD
  ? "https://syscut.com/"
  : "http://localhost:8080/";
const app = createApp(App);
app.config.globalProperties.$globalVar = {
  id: "",
  home: home,
  searchText: "",
  articleId: "",
  param1: "",
  param2: "",
  param3: "",
};
app.use(Quasar, {
  plugins: { LoadingBar },
  config: {
    loadingBar: {
      position: "top",
      color: "deep-purple-1",
      size: "5px",
    },
  },
});
app.use(router);
app.mount("#app");
