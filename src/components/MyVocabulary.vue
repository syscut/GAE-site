<script setup>
import { ref, computed, onMounted } from "vue";
import domUtils from "../lib/generateTranslateDom";
import axios from "axios";

const allVocabularies = ref([
  {
    id: { word: "", username: "" },
    examTimes: 0,
    examFail: 0,
    remember: false,
    favorite: false,
    word: {
      word: "",
      translate: "",
      pronounce: "",
      example: "",
      partOfSpeech: "",
      definition: "",
    },
  },
]);
const nowLetter = ref("");
const tab = ref("voc");
onMounted(() => {
  axios
    .post("auth/allVocabulary")
    .then((r) => {
      allVocabularies.value = r.data;
      allVocabularies.value.sort((a, b) => {
        if (a.id.word < b.id.word) {
          return -1;
        }
        if (a.id.word > b.id.word) {
          return 1;
        }
        return 0;
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

const getPronounce = (word = "", event) => {
  axios
    .post("auth/pronounce", { t: word }, { responseType: "arraybuffer" })
    .then((res) => {
      let blob = new Blob([res.data], { type: "audio/mp3" });
      let url = URL.createObjectURL(blob);
      let audio = new Audio(url);
      audio.controls = true;
      audio.playbackRate = 0.8;
      event.target.parentNode.parentNode.style.display = "none";
      document.getElementById(word).appendChild(audio);
    });
};
const star = (id = { word: "", username: "" }, index, event) => {
  axios
    .post("auth/fav", id)
    .then((res) => {
      if (event.target.tagName == "IMG") {
        switchIcon(event.target);
      } else {
        const img = event.target.querySelectorAll("img")[0];
        switchIcon(img);
      }
      allVocabularies.value[index].favorite =
        !allVocabularies.value[index].favorite;
    })
    .catch((e) => {
      console.log(e);
    });
};
const removeWord = (id = { word: "", username: "" }, index) => {
  axios
    .post("auth/deleteWord", id)
    .then((r) => {
      allVocabularies.value.splice(index, 1);
    })
    .catch((e) => {
      console.log(e);
    });
};
const getfav = () => {
  console.log("get");
};
const switchIcon = (dom) => {
  if (dom.attributes[0].value == "../../src/assets/star_n.png") {
    dom.attributes[0].value = "../../src/assets/star.png";
  } else {
    dom.attributes[0].value = "../../src/assets/star_n.png";
  }
};
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-11 col-md-10">
      <q-card dark bordered class="bg-grey-9 my-card">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="voc" label="我的單字" />
          <q-tab name="fav" label="我的最愛" @click="getfav()" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated dark>
          <q-tab-panel name="voc">
            <div v-for="(v, index) in allVocabularies" :key="v.id.word">
              <q-card-section
                class="text-h5"
                v-if="v.id.word.slice(0, 1).toUpperCase() != nowLetter"
              >
                {{ v.id.word.slice(0, 1).toUpperCase() }}
              </q-card-section>

              <q-separator
                dark
                inset
                :ref="(nowLetter = v.id.word.slice(0, 1).toUpperCase())"
              />
              <div
                class="q-pl-sm q-pt-sm text-h6"
                style="display: flex; align-items: center"
              >
                <q-btn round flat @click="star(v.id, index, $event)">
                  <q-avatar size="20px">
                    <img
                      :src="
                        v.favorite
                          ? '../../src/assets/star.png'
                          : '../../src/assets/star_n.png'
                      "
                    />
                  </q-avatar>
                </q-btn>
                {{
                  v.id.word +
                  " - " +
                  v.word.translate +
                  " - " +
                  v.word.pronounce
                }}
                <span class="q-px-md audio"></span> 作答次數：{{
                  v.examTimes
                }}，答錯次數：{{ v.examFail }}
                <span :id="v.id.word"></span>
                <q-btn
                  round
                  class="q-ml-md"
                  size="md"
                  icon="play_circle"
                  @click="getPronounce(v.id.word, $event)"
                />
                <q-btn
                  class="q-ml-md"
                  style="width: 70px"
                  color="red"
                  label="移除"
                  @click="removeWord(v.id, index)"
                />
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="fav">
            <div v-for="(v, index) in allVocabularies" :key="v.id.word">
              <div v-if="v.favorite == true">
                <q-card-section
                  class="text-h5"
                  v-if="v.id.word.slice(0, 1).toUpperCase() != nowLetter"
                >
                  {{ v.id.word.slice(0, 1).toUpperCase() }}
                </q-card-section>

                <q-separator
                  dark
                  inset
                  :ref="(nowLetter = v.id.word.slice(0, 1).toUpperCase())"
                />
                <div
                  class="q-pl-sm q-pt-sm text-h6"
                  style="display: flex; align-items: center"
                >
                  <q-btn round flat @click="star(v.id, index, $event)">
                    <q-avatar size="20px">
                      <img
                        :src="
                          v.favorite
                            ? '../../src/assets/star.png'
                            : '../../src/assets/star_n.png'
                        "
                      />
                    </q-avatar>
                  </q-btn>
                  {{
                    v.id.word +
                    " - " +
                    v.word.translate +
                    " - " +
                    v.word.pronounce
                  }}
                  <span class="q-px-md audio"></span> 作答次數：{{
                    v.examTimes
                  }}，答錯次數：{{ v.examFail }}
                  <span :id="v.id.word"></span>
                  <q-btn
                    round
                    class="q-ml-md"
                    size="md"
                    icon="play_circle"
                    @click="getPronounce(v.id.word, $event)"
                  /><q-btn
                    class="q-ml-xl"
                    style="width: 70px"
                    color="red"
                    label="移除"
                    @click="removeWord(v.id, index)"
                  />
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<style scoped></style>
