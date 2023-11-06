<script setup>
import { ref, computed, onMounted } from "vue";
import Vue3WordCloud from "vue3-word-cloud";
import { Quasar } from "quasar";
const emit = defineEmits(["errMsg"]);
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
const onWordClick = (word) => {
  emit("errMsg", word);
};
const rightSideShow = computed(() => {
  return $props.width >= 1024;
});
const over1200 = computed(() => {
  return $props.width > 1200;
});
const overMd = computed(() => {
  return $props.width > 1439;
});
const truncLines = computed(() => {
  return $props.width < 1600 ? 3 : $props.width < 1900 ? 4 : 5;
});
const showArticleContent = computed(() => {
  return $props.width > 750;
});
const topPx = computed(() => {
  return $props.header ? "50px" : "0px";
});
const tags = ref([
  ["Java", 8],
  ["Java Script", 15],
  ["Linux", 20],
  ["Life", 35],
  ["Go", 1],
  ["Vue", 12],
  ["Spring Boot", 5],
  ["css", 39],
]);
const art = ref([
  {
    id: 1,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
  {
    id: 2,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
  {
    id: 3,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
  {
    id: 4,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
  {
    id: 5,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
  {
    id: 6,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
  {
    id: 7,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
  {
    id: 8,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
  {
    id: 9,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
  {
    id: 10,
    date: "2022/01/01",
    title: "使用 Vue3 開發 Web Component 入門",
    content:
      "透過 vite + vue3 快速開發 Web Component 共用組件。 為什麼不直接寫原生的 Web Component ? 因為透過 vite + vue3 的方式來開發 web component ，過程會簡單很多，而且可以使用 Vue SFC 的方式來開發",
    tag: ["Vue", "Java Script"],
    img: "https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png",
    readTime: "3 min read",
  },
]);
</script>
<template>
  <div class="row" :class="over1200 ? 'justify-around' : 'justify-center'">
    <div class="col-xs-10 col-sm-9 col-md-7 col-lg-7">
      <div class="row" :class="rightSideShow ? 'justify-end' : ''">
        <div class="col-xs-12 col-sm-12 col-md-11 col-lg-10">
          <q-card style="background-color: transparent" dark flat square>
            <q-card-section>
              <div class="text-h6">歡迎來我的不專業技術筆記{{ width }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div
          class="col-xs-12 col-sm-12 col-md-11 col-lg-10"
          v-for="n in art"
          :key="n.id"
        >
          <q-card
            style="
              background-color: transparent;
              border-top: 1px;
              border-color: aliceblue;
              border-top-style: groove;
            "
            dark
            flat
            square
          >
            <q-card-section horizontal>
              <q-card-section>
                <div class="text-subtitle2">
                  {{ n.date }}
                </div>
                <div
                  style="cursor: pointer"
                  @click="onWordClick('id is ' + n.id)"
                >
                  <div
                    :class="width < 451 ? 'text-subtitle1' : 'text-h5'"
                    class="text-weight-bold"
                  >
                    {{ n.title }}
                  </div>
                  <div
                    v-show="showArticleContent"
                    class="text-body1 trunc"
                    :style="
                      '-webkit-line-clamp: ' +
                      truncLines +
                      ';line-clamp: ' +
                      truncLines +
                      ';'
                    "
                  >
                    {{ n.content }}
                  </div>
                </div>
              </q-card-section>
              <q-card-section :class="width < 600 ? 'col-4' : 'col-3'">
                <q-img :src="n.img" class="rounded-borders"></q-img>
              </q-card-section>
            </q-card-section>
            <q-card-actions class="q-pt-none">
              <template v-for="t in n.tag">
                <q-btn
                  :size="showArticleContent ? 'md' : 'sm'"
                  class="text-capitalize"
                  color="grey-8"
                  padding="3px 12px"
                  dense
                  rounded
                  :label="t"
                ></q-btn>
              </template>
              <q-badge outline class="q-ml-sm" style="margin-bottom: -10px">{{
                n.readTime
              }}</q-badge>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <div
      v-show="rightSideShow"
      class="col-4"
      style="
        position: sticky;
        min-height: 643px;
        border-left: 1px;
        border-color: aliceblue;
        border-left-style: groove;
      "
      :style="'top:' + topPx + ';height: calc(100vh - ' + topPx + ');'"
    >
      <div class="row">
        <div class="col-md-11 col-lg-9">
          <q-card style="background-color: transparent" dark flat square>
            <q-card-section>
              <div class="row justify-end">
                <div class="column items-center">
                  <div class="col">
                    <q-avatar size="100px">
                      <img
                        src="https://avatars.githubusercontent.com/u/80107568"
                      />
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-h5" style="margin-top: 25px">Syscut</div>
                  </div>
                </div>
              </div>
              <div class="column items-end">
                <div class="col text-h6">新手前後端工程師...請多多指教</div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <vue3-word-cloud
                  style="height: 480px; width: 640px; margin-top: -90px"
                  :words="tags"
                  :color="
                    ([, weight]) =>
                      weight > 10
                        ? 'DeepPink'
                        : weight > 5
                        ? 'RoyalBlue'
                        : 'grey'
                  "
                  font-family="consolas"
                >
                  <template v-slot="{ text, weight, word }">
                    <div
                      :title="weight"
                      style="cursor: pointer"
                      @click="onWordClick(word)"
                    >
                      {{ text }}
                    </div>
                  </template>
                </vue3-word-cloud>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div v-show="overMd" class="col-lg-1"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.trunc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
