<script setup>
import { ref, computed } from "vue";
import MainBody from "./components/MainBody.vue";
import { Quasar } from "quasar";
const leftDrawerOpen = ref(false);
const width = ref(window.innerWidth);
const lessThanBreakPoint = computed(() => {
  return width.value < 600;
});
window.addEventListener("resize", (e) => {
  width.value = window.innerWidth;
});
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const test = () => {
  console.log("clicked");
};
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <q-header class="bg-dark text-white">
      <q-toolbar>
        <q-avatar class="btn" @click="test()">
          <img src="../src/assets/avocado.svg" />
        </q-avatar>

        <q-toolbar-title class="q-pl-none"
          ><span class="btn q-pl-xs" @click="test()"
            >果凍的技術筆記</span
          ></q-toolbar-title
        >
        <q-btn flat rounded v-show="!lessThanBreakPoint" class="q-px-md"
          >文章分類</q-btn
        >
        <q-btn flat rounded v-show="!lessThanBreakPoint" class="q-px-md"
          >關於我</q-btn
        >
        <q-btn flat rounded v-show="!lessThanBreakPoint" class="q-px-md"
          >登入</q-btn
        >
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="toggleLeftDrawer"
          v-show="lessThanBreakPoint"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-dark text-white"
      side="right"
      :width="250"
      overlay
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section> 關於我 </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container></q-page-container>
  </q-layout>
</template>

<style scoped>
.btn:hover {
  cursor: pointer;
}
</style>
