<script setup>
import { getCurrentInstance } from "vue";
import axios from "axios";
const app = getCurrentInstance();
const t = app.appContext.config.globalProperties.analyseText.value.split(" ");

const translate = (text = "", dom) => {
  text = text
    .replace(".", "")
    .replace(",", "")
    .replace("'", "")
    .replace('"', "");
  axios
    .post("auth/pronounce", text, {
      headers: { "Content-Type": "text/plain" },
      responseType: "arraybuffer",
    })
    .then((d) => {
      // text.value = d.data.translate;
      let blob = new Blob([d.data], { type: "audio/mp3" });
      let url = URL.createObjectURL(blob);
      let audio = new Audio(url);
      audio.controls = true;
      audio.playbackRate = 0.8;
      dom.target.nextSibling.appendChild(audio);
    })
    .catch((e) => {
      console.log(e);
    });
  axios
    .post("auth/translate", text, {
      headers: { "Content-Type": "text/plain" },
      responseType: "text/plain",
    })
    .then((d) => {
      let span = document.createElement("span");
      span.innerText = " 翻譯：" + d.data;
      dom.target.nextSibling.appendChild(span);
      // text.value = d.data.translate;
    })
    .catch((e) => {
      console.log(e);
    });
  axios
    .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + text, {
      withCredentials: false,
    })
    .then((d) => {
      console.log(d.data);
      const phonetic = d.data[0].phonetic || "無提供";
      const ex = d.data[0].meanings[0].definitions[0].example || "無提供";
      let span = document.createElement("span");
      span.innerText = " kk音標：" + phonetic + " 例句：" + ex + " ";
      dom.target.nextSibling.appendChild(span);
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <q-card class="article-background" dark flat square>
        <q-card-section style="overflow-wrap: break-word">
          <div class="text-h4 q-mb-sm">翻譯結果Demo</div>
          <template v-for="w in t">
            <a class="text-h5 link" @click="translate(w, $event)">{{ w }}</a>
            <span></span>
          </template>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style scoped>
.link {
  cursor: pointer;
  margin-right: 3px;
}
</style>
