<script setup>
import { ref } from "vue";
const $props = defineProps({
  code: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
});
const ext = $props.fileName.split(".").reverse()[0];
const extMap = { "": "", js: "js" };
</script>
<template>
  <highlightjs :code="code" />
</template>
<style scoped></style>
