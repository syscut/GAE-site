<script setup>
import Editor from "./Editor.vue";
</script>
<template>
  <div class="row justify-around">
    <div class="col-8">
      <q-card class="article-background" dark flat square>
        <q-card-section>
          <div class="text-h3">新增文章</div>
          <Editor />
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
