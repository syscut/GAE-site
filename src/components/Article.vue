<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
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
onMounted(() => {
  hljs.highlightAll();
  // hljs.initLineNumbersOnLoad();
});
const article = ref({
  id: 1,
  title: "使用 Vue3 開發 Web Component 入門",
  date: "2022/10/31",
  content: "",
});
const code = `const $props = defineProps({
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
});`;
const img = ref(`<figure class="image">
    <img style="aspect-ratio:112/112;" src="https://miro.medium.com/v2/resize:fill:112:112/1*Zuc0xNu0hB05ppjP3aPinQ.png" width="112" height="112">
</figure>`);
// const code = (
//   await axios
//     .get(
//       "https://raw.githubusercontent.com/syscut/VSCodeExtension/master/extension.js"
//     )
//     .then((r) => r)
//     .catch((e) => {
//       console.log(e);
//     })
// ).data;
</script>
<template>
  <div class="row justify-around">
    <div class="col-8">
      <q-card class="article-background" dark flat square>
        <q-card-section>
          <div class="text-h3">
            {{ article.title }} width : {{ width }}, height : {{ height }}
          </div>
          <div v-html="img"></div>
          <pre><code>{{ code }}</code></pre>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style scoped>
.article-background {
  background-color: transparent;
  backdrop-filter: blur(8px);
}
</style>
