<script setup>
import { ref } from "vue";
import router from "../router";
import { useStore } from "vuex";
import axios from "axios";
const store = useStore();
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
const $emit = defineEmits(["errMsg"]);
const emitErrMsg = (msg) => {
  $emit("errMsg", msg);
};
const text = ref("");
const test = ref(
  `A US military ship is sailing towards the Middle East, carrying equipment to build a temporary pier off the coast of Gaza, the army says.

The support ship, General Frank S Besson, set sail from a military base in the state of Virginia on Saturday.

    Why food airdrops into Gaza are controversial
    Why are Israel and Hamas fighting in Gaza?

The US ship departed "less than 36 hours" after Mr Biden made his announcement, US Central Command wrote on X.

It is "carrying the first equipment to establish a temporary pier to deliver vital humanitarian supplies" to Gaza, the statement continued.

The Pentagon has said it could take up to 60 days to build the pier with the help of 1,000 troops - none of whom would go ashore.

Charities have said those suffering in Gaza cannot wait that long.

Meanwhile, an aid ship laden with some 200 tonnes of food was still waiting for clearance to set sail from a port in Cyprus on Sunday morning.

It is hoped the vessel, Open Arms, will be able to depart before Monday, following an EU announcement that a new sea route would be opened over the weekend to allow aid to sail directly from Cyprus - the closest EU country to Gaza.`
);
const analyze = () => {
  store.state.translateText = text;
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
