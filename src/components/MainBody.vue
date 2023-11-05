<script setup>
import { ref, computed, onMounted, defineComponent } from "vue";
import Vue3WordCloud from "vue3-word-cloud";
import { Quasar } from "quasar";
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
  console.log(word[0]);
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
const parseTagSize = (size = 0) => {
  return size < 10 ? 10 : size / 10 + 10;
};
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
          v-for="n in 10"
          :key="n"
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
            <q-card-section>
              <div class="text-h5 text-weight-bold">文章標題{{ n }}</div>
              <div class="text-body1">文章內容</div>
            </q-card-section>
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
<style scoped></style>
