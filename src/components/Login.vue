<script setup>
import axios from "axios";
import CryptoJS from "crypto-js";
const $props = defineProps({
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  header: {
    type: Boolean,
    default: true,
  },
});
const $emit = defineEmits(["errMsg"]);
const emitErrMsg = (msg) => {
  $emit("errMsg", msg);
};
const login = () => {
  const key = CryptoJS.enc.Utf8.parse("aK7+UX24ttB=fTnA");
  const iv = CryptoJS.enc.Utf8.parse("d4ee=RaW1prQ1F+f");
  const d = CryptoJS.AES.encrypt("123456", key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  axios
    .post("signin", { username: "kim23362611", password: d.toString() })
    .then((e) => {
      console.log(e.data);
    })
    .catch((e) => {
      console.log(e?.response?.data);
    });
};
const article = () => {
  axios
    .get("articles")
    .then((e) => {
      console.log(e.data);
    })
    .catch((e) => {
      console.log(e.response.data);
    });
};
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <q-card class="article-background" dark flat square>
        <q-card-section>
          <div class="text-h3">登入</div>
        </q-card-section>
        <q-btn @click="login()" label="登入"></q-btn>
        <q-btn @click="article()" label="文章"></q-btn>
      </q-card>
    </div>
  </div>
</template>
