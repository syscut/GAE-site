<script setup>
import { getCurrentInstance } from "vue";
const app = getCurrentInstance();
const t = app.appContext.config.globalProperties.analyseText.value.split(" ");
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <q-card class="article-background" dark flat square>
        <q-card-section style="display: contents">
          <div class="text-h4 q-mb-sm">翻譯結果Demo</div>
          <template v-for="w in t">
            <q-btn flat dense class="text-h5" :label="w" />
          </template>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
