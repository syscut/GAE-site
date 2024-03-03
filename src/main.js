import { createApp } from "vue";
import App from "./App.vue";
// ---plugin
import { Quasar, LoadingBar, Loading } from "quasar";
import router from "./router.js";
import store from "./store/store.js";
import axios from "axios";
// ---css
import "./style.css";
import "./assets/ckeditor/ckeditor-darktheme.css";
import "./assets/highlight/styles/tokyo-night-dark.min.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "quasar/src/css/index.sass";

axios.defaults.baseURL = import.meta.env.PROD
  ? "https://auth.syscut.com/"
  : "http://localhost:5000/";
axios.defaults.withCredentials = true;
const home = import.meta.env.PROD
  ? "https://syscut.com/"
  : "http://localhost:8080/";
const app = createApp(App);
app.config.globalProperties.$globalVar = {
  analyseText: "",
};
app.use(Quasar, {
  plugins: { LoadingBar, Loading },
  config: {
    loadingBar: {
      position: "top",
      color: "deep-purple-1",
      size: "5px",
    },
    loading: {},
  },
});
app.use(store);
app.use(router);
app.mount("#app");
