<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import router from "../router";
const store = useStore();
const slide = ref("");
const select = ref(["", "", "", "", ""]);
const option = ref([]);
const exam = ref([
  { word: "", content: "", a: "", b: "", c: "", d: "", answer: "" },
]);
onMounted(() => {
  axios
    .post("auth/getExam")
    .then((r) => {
      exam.value = r.data;
      slide.value = exam.value[0].word;
      exam.value.forEach((e, i) => {
        option.value.push({ label: i + 1, value: e.word });
      });
    })
    .catch((e) => {
      console.log(e);
    });
});
const $emit = defineEmits(["errMsg"]);
const emitErrMsg = (msg) => {
  $emit("errMsg", msg);
};
const getresult = () => {
  let finish = true;
  select.value.forEach((v, i) => {
    if (v == "") {
      finish = false;
    }
  });
  if (finish) {
    store.state.select = select.value;
    store.state.exam = exam.value;
    router.push("examResult");
  } else {
    emitErrMsg("有題目尚未作答");
  }
};
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <div class="q-pa-md">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          dark
          control-color="primary"
        >
          <q-carousel-slide
            :name="e.word"
            class="column no-wrap q-pt-xl q-pl-xl"
            v-for="(e, index) in exam"
            :key="e.word"
          >
            <div class="text-h4 q-pb-md">
              {{ e.content }}
            </div>
            <q-radio
              size="xl"
              v-model="select[index]"
              val="A"
              class="text-h5"
              :label="e.a"
            />
            <q-radio
              size="xl"
              v-model="select[index]"
              val="B"
              class="text-h5"
              :label="e.b"
            />
            <q-radio
              size="xl"
              v-model="select[index]"
              val="C"
              class="text-h5"
              :label="e.c"
            />
            <q-radio
              size="xl"
              v-model="select[index]"
              val="D"
              class="text-h5"
              :label="e.d"
            />
          </q-carousel-slide>
        </q-carousel>
        <div class="row justify-center">
          <q-btn-toggle
            glossy
            v-model="slide"
            color="white"
            toggle-color="primary"
            text-color="primary"
            :options="option"
          />
          <q-btn
            class="q-ml-xl"
            style="width: 100px"
            color="red"
            label="結束測驗"
            @click="getresult()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
