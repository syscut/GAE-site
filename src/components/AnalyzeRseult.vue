<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
const store = useStore();
const translateTextArray = ref([]);
const tmpTextArray = ref([]);

onMounted(() => {
  translateTextArray.value = store.state.translateText
    .replaceAll("\n", " \n ")
    .split(" ");
  translateTextArray.value.forEach((text) => {
    if (/^[\W0-9_]+/.test(text) || /[\W0-9_]+$/.test(text)) {
      text = text
        .replace(/(^[\W0-9_]+)(.*)/, "$1 $2")
        .replace(/([a-zA-Z]+)([\W0-9_]+$)/, "$1 $2");
      tmpTextArray.value = tmpTextArray.value.concat(text.split(" "));
    } else {
      tmpTextArray.value.push(text);
    }
  });
});
const $emit = defineEmits(["errMsg"]);
const emitErrMsg = (msg) => {
  $emit("errMsg", msg);
};
const translate = (text = "", dom) => {
  text = text
    .replace(".", "")
    .replace(",", "")
    .replace("'", "")
    .replace('"', "");
  axios
    .post(
      "auth/pronounce",
      { t: text },
      {
        responseType: "arraybuffer",
      }
    )
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
        <q-card-section>
          <div class="text-h4 q-mb-sm">翻譯結果Demo</div>
          <template v-for="text in tmpTextArray">
            <template v-if="text == '\n'">
              <br />
            </template>
            <template v-else-if="/^[\W0-9_]/.test(text)">
              <span class="noTranslate">{{ text }}</span>
            </template>
            <template v-else-if="text == ''">
              <span style="width: 5px; display: inline-block"></span>
            </template>
            <template v-else>
              <span :class="'pre-' + text"></span>
              <button
                flat
                class="text-h5 translateBtn"
                @click="translate(text, $event)"
              >
                {{ text }}
              </button>
              <div :class="'suf-' + text" class="draggableDiv"></div>
            </template>
          </template>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style scoped>
.translateBtn {
  cursor: pointer;
  margin-right: 0px;
  color: #646cff;
  padding-right: 3px;
  padding-left: 3px;
  min-height: 0;
  background-color: transparent;
  border: none;
  border-radius: 4px;
}
.translateBtn:hover {
  background-color: #1c1c1cc4;
}
.noTranslate {
  color: #646cff;
  margin-left: 3px;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2rem;
}
.draggableDiv {
  display: none;
  position: absolute;
  width: 200px;
  height: 150px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  resize: both;
  overflow: auto;
}
</style>
