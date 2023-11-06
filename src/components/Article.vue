<script setup>
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
</script>
<template>
  <div class="row justify-around">
    <div class="col-10">
      <q-card style="background-color: transparent" dark flat square>
        <q-card-section>
          <div class="text-h6">
            Article 網頁施工中... width : {{ width }}, height : {{ height }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style scoped></style>
