<script setup>
import { ref, getCurrentInstance } from "vue";
import router from "../router";
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
const app = getCurrentInstance();
const $emit = defineEmits(["errMsg"]);
const emitErrMsg = (msg) => {
  $emit("errMsg", msg);
};
const text = ref("");
const test = ref(
  `Vue is a JavaScript framework for building user interfaces. 
It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.`
);
const analyze = () => {
  app.appContext.config.globalProperties.analyseText = text;
  //   console.log(app.appContext.config.globalProperties.analyseText.value);
  router.push("/analyzeRseult");
};
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <q-card class="article-background" dark flat square>
        <q-card-section>
          <div>
            <span class="text-h4 q-mb-sm"> 翻譯Demo</span>
            <span class="stickyRow">
              <div id="recordedAudio"></div>
              <q-btn
                flat
                dense
                class="tbtn text-body1 text-black"
                icon="translate"
                label="解析"
                @click="analyze()"
              ></q-btn>
              <q-btn
                flat
                dense
                class="tbtn text-body1 text-black q-ml-sm"
                label="test"
                @click="text = test"
              ></q-btn>
            </span>
            <q-input
              dark
              filled
              autogrow
              v-model="text"
              type="textarea"
              placeholder="文章請貼在這"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style scoped>
.stickyRow {
  float: right;
  display: inline;
  position: sticky;
  top: 50px;
  z-index: 10;
}
.tbtn {
  background-color: aliceblue;
}
div:deep(textarea) {
  font-size: x-large;
  line-height: 32px !important;
}
</style>
