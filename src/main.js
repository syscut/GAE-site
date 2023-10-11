import { createApp } from "vue";
import "./style.css";
import { Quasar } from "quasar";
import axios from "axios";
import App from "./App.vue";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "quasar/src/css/index.sass";
axios.defaults.baseURL = import.meta.env.PROD
  ? "https://syscut.com/"
  : "http://127.0.0.1:3101/";
const app = createApp(App);
app.config.globalProperties.$localhost = import.meta.env.PROD
  ? "https://syscut.com/"
  : "http://localhost:8080/";
app.config.globalProperties.$inputStyle = {
  bgColor: "white",
  labelColor: "blue",
  class: "q-px-sx",
  outlined: true,
  dense: true,
  noErrorIcon: true,
};
app
  .use(Quasar, {
    plugins: {},
  })
  .mount("#app");
