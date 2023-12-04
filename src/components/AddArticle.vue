<script setup>
import Editor from "./Editor.vue";
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
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <q-card class="article-background" dark flat square>
        <q-card-section>
          <div class="text-h3">新增文章</div>
          <Editor
            :should-not-group-when-full="$props.width > 1000"
            @errMsg="emitErrMsg($event)"
          />
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
