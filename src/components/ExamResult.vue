<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
const store = useStore();
const slide = ref("");
const select = ref([]);
const answer = ref([]);
const option = ref([]);
const exam = ref([
  { word: "", content: "", a: "", b: "", c: "", d: "", answer: "" },
]);

const saveVocData = ref([]);
onMounted(() => {
  select.value = store.state.select;
  exam.value = store.state.exam;
  slide.value = exam.value[0].word;
  exam.value.forEach((e, i) => {
    answer.value.push(e.answer);
    option.value.push({ label: i + 1, value: e.word });
    saveVocData.value.push({
      word: e.word,
      examFail: select.value[i] != e.answer,
    });
  });
  axios
    .post("auth/saveExam", saveVocData.value)
    .then((res) => {})
    .catch((e) => {
      console.log(e);
    });
});
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <div class="q-pa-md">
        <div class="text-h4 q-mb-sm text-white">測驗結果</div>
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
              {{ e.word }}
            </div>
            <q-radio
              size="xl"
              v-model="select[index]"
              val="A"
              :color="'A' == answer[index] ? 'green' : 'red'"
              class="text-h5"
              :label="'A' == select[index] ? e.a + ' - 你的答案' : e.a"
            />
            <q-radio
              size="xl"
              v-model="select[index]"
              val="B"
              :color="'B' == answer[index] ? 'green' : 'red'"
              class="text-h5"
              :label="'B' == select[index] ? e.b + ' - 你的答案' : e.b"
            />
            <q-radio
              size="xl"
              v-model="select[index]"
              val="C"
              :color="'C' == answer[index] ? 'green' : 'red'"
              class="text-h5"
              :label="'C' == select[index] ? e.c + ' - 你的答案' : e.c"
            />
            <q-radio
              size="xl"
              v-model="select[index]"
              val="D"
              :color="'D' == answer[index] ? 'green' : 'red'"
              class="text-h5"
              :label="'D' == select[index] ? e.d + ' - 你的答案' : e.d"
            />
            <div v-if="select[index] != answer[index]" class="text-h5">
              正確答案為
              <q-chip outline class="text-h6" color="green" text-color="green">
                {{ e[answer[index].toLowerCase()] }}
              </q-chip>
              ，你的答案
              <q-chip outline class="text-h6" color="red" text-color="red">
                {{ e[select[index].toLowerCase()] }}
              </q-chip>
            </div>
            <div v-else class="text-h5">
              答對了，正確答案為
              <q-chip outline class="text-h6" color="green" text-color="green">
                {{ e[select[index].toLowerCase()] }}
              </q-chip>
            </div>
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
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
