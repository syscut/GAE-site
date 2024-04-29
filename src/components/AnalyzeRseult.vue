<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
// import { wordType } from "../lib/entities";
import domUtils from "../lib/generateTranslateDom";
import axios from "axios";
const store = useStore();
const translateTextArray = ref([]);
const tmpTextArray = ref([]);
const wordType = ref({
  word: "",
  pronounce: "",
  example: "",
  partOfSpecch: "",
  definition: "",
  audio: "",
});
onMounted(() => {
  if (store.state.translateText == "") {
    translateTextArray.value =
      "A US military ship is sailing towards the Middle East, carrying equipment to build a temporary pier off the coast of Gaza, the army says.".split(
        " "
      );
  } else {
    translateTextArray.value = store.state.translateText
      .replaceAll("\n", " \n ")
      .split(" ");
  }
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
  if (dom.target.nextSibling.children[0].children.length > 0) {
    dom.target.nextSibling.style.display = "block";
    return;
  }
  const voiceData = axios.post(
    "auth/pronounce",
    { t: text },
    { responseType: "arraybuffer" }
  );

  const translated = axios.post(
    "auth/translate",
    { t: text },
    {
      responseType: "text/plain",
    }
  );

  const example = axios.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + text,
    {
      withCredentials: false,
    }
  );

  Promise.all([voiceData, translated, example])
    .then((responseArray) => {
      let saveBtn = dom.target.nextSibling.children[1].children[0];
      let getBtn = dom.target.nextSibling.children[1].children[1];
      let deleteBtn = dom.target.nextSibling.children[1].children[2];
      saveBtn.onclick = () => {
        const example = responseArray[2].data;

        wordType.value.word = example[0].word;
        wordType.value.pronounce = example[0]?.phonetic || "";
        wordType.value.example = responseArray[1].data;
        wordType.value.partOfSpecch =
          example[0]?.meanings[0]?.partOfSpeech || "";
        wordType.value.definition =
          example[0]?.meanings[0]?.definitions[0]?.definition || "";

        wordType.value.audio = arrayBufferToString(responseArray[0].data);

        let buf = stringToArrayBuffer(wordType.value.audio);

        let blob = new Blob([buf], { type: "audio/mp3" });
        let url = URL.createObjectURL(blob);
        let audio = new Audio(url);
        audio.controls = true;
        audio.playbackRate = 0.8;
        document.getElementById("testAudio").appendChild(audio);

        saveWord(wordType.value);
      };
      getBtn.onclick = () => {
        getWord(responseArray[2].data[0].word);
      };
      deleteBtn.onclick = () => {
        deleteWord(responseArray[2].data[0].word);
      };
      domUtils.generate(responseArray, dom);
    })
    .catch((e) => {
      console.error(e);
    });
};
const saveWord = (s = {}) => {
  console.log(s);

  axios
    .post("auth/saveWord", s)
    .then((d) => {
      console.log(d.data);
    })
    .catch((e) => {
      console.log(e);
    });
};
const getWord = (w = "") => {
  axios
    .post("auth/getWord", { word: w })
    .then((response) => {
      console.log(response);
      let buf = stringToArrayBuffer(response.data.audio);
      console.log(buf);
      let blob = new Blob([buf], { type: "audio/mp3" });
      let url = URL.createObjectURL(blob);
      let audio = new Audio(url);
      audio.controls = true;
      audio.playbackRate = 0.8;
      document.getElementById("testAudio").appendChild(audio);
    })
    .catch((e) => {
      console.log(e);
    });
};
const deleteWord = (w = "") => {
  axios
    .post("auth/deleteWord", { word: w })
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
};
const stringToArrayBuffer = (string) => {
  let byteArray = new Uint8Array(string.length);
  for (var i = 0; i < string.length; i++) {
    byteArray[i] = string.codePointAt(i);
  }
  return byteArray;
};
const arrayBufferToString = (exportedPrivateKey) => {
  const byteArray = new Uint8Array(exportedPrivateKey);
  let byteString = "";
  for (var i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCodePoint(byteArray[i]);
  }
  return byteString;
};
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <q-card class="article-background" dark flat square>
        <q-card-section>
          <div class="text-h4 q-mb-sm">翻譯結果Demo</div>
          <div id="testAudio"></div>
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
              <q-card :class="'suf-' + text" class="draggableDiv">
                <div></div>
                <q-card-actions align="around">
                  <q-btn style="width: 70px" color="primary" label="儲存" />
                  <q-btn style="width: 70px" color="warn" label="刪除" />
                  <q-btn style="width: 70px" color="red" label="關閉" />
                </q-card-actions>
              </q-card>
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
  text-align: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  width: min-content;
}
</style>
