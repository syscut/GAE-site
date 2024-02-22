<script setup>
import { ref, computed, onMounted } from "vue";
import FireFly from "./components/Firefly.vue";
import axios from "axios";
import router from "./router.js";
import { Quasar, useQuasar } from "quasar";
//variables---------------------
const test = ref("aaaa");
const breakSize = ref(800);
const leftDrawerOpen = ref(false);
const $q = useQuasar();
const isMobile = ref(false);
const width = ref(window.innerWidth);
const height = ref(window.innerHeight - 50);
const headerNotHide = ref(true);
const errDialog = ref(false);
const searchText = ref("");
const errMessage = ref("");
const menuItems = ref([
  { id: 0, name: "翻譯功能", icon: "translate", to: "translate" },
  { id: 1, name: "文章分類", icon: "article", to: "articleGroup" },
  { id: 2, name: "關於我", icon: "person", to: "aboutMe" },
  { id: 3, name: "separator", icon: "none" },
  { id: 4, name: "新增文章", icon: "post_add", to: "newArticle", ajax: true },
  { id: 5, name: "登入 / 註冊", icon: "login", to: "login" },
]);
//setting---------------------
onMounted(() => {
  // axios
  //   .get("test", {
  //     withCredentials: true,
  //   })
  //   .then((r) => {
  //     console.log(r.data);
  //   })
  //   .catch((e) => {
  //     showErrorMessage(e);
  //   });
  isMobile.value =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
});
window.addEventListener("resize", (e) => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
  if (width.value > breakSize.value) {
    leftDrawerOpen.value = false;
  }
});
//computed---------------------
const lessThanBreakPoint = computed(() => {
  return width.value < breakSize.value;
});
const hideTitle = computed(() => {
  return width.value < 450;
});
const checkIsMobile = computed(() => {
  return isMobile.value ? "height: 85vh;" : "height: 100vh;";
});
//function--------------------
const reload = () => {
  router.push("/");
};
const routerTo = (to) => {
  if (to == "newArticle") {
    triggerLoadingBar();
  }
  router.push(to);
};
const triggerLoadingBar = () => {
  console.log("loading...");
  $q.loadingBar.start();
  $q.loadingBar.increment(0.5);
};
const headerHide = (notHide) => {
  headerNotHide.value = notHide;
};
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const search = () => {
  showErrorMessage(searchText.value);
};
const showErrorMessage = (e) => {
  errDialog.value = true;
  errMessage.value =
    e?.response?.data?.message || e?.response?.data || e?.message || e;
  window.setInterval(() => {
    errDialog.value = false;
  }, 5000);
};
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <FireFly />
    <q-header
      class="bg-dark text-white"
      :reveal-offset="50"
      reveal
      @reveal="headerHide($event)"
    >
      <q-toolbar>
        <q-avatar class="btn" @click="reload()">
          <img src="../src/assets/svg/avocado.svg" />
        </q-avatar>

        <q-toolbar-title
          v-show="!hideTitle"
          class="q-pl-none"
          style="max-width: 170px; min-width: 170px"
          ><span class="btn q-pl-xs" @click="reload()"
            >果凍的技術筆記</span
          ></q-toolbar-title
        >
        <q-space></q-space>
        <div class="q-pr-sm">
          <q-input
            dense
            rounded
            outlined
            borderless
            dark
            color="black"
            v-model="searchText"
            placeholder="搜尋"
            @keydown.enter="search()"
          >
            <template v-slot:append>
              <q-icon name="search" class="cursor-pointer" @click="search()" />
            </template>
          </q-input>
        </div>
        <div v-for="menu in menuItems" :key="menu.id">
          <q-btn
            :to="menu.to"
            @click="menu.ajax ? triggerLoadingBar() : ''"
            flat
            rounded
            v-show="!lessThanBreakPoint && menu.name != 'separator'"
            class="q-px-md"
            >{{ menu.name }}</q-btn
          >
        </div>
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
        <q-list v-for="menu in menuItems" :key="menu.id">
          <q-item
            v-if="menu.name != 'separator'"
            clickable
            v-ripple
            @click="routerTo(menu.to)"
          >
            <q-item-section avatar>
              <q-icon :name="menu.icon" />
            </q-item-section>
            <q-item-section> {{ menu.name }} </q-item-section>
          </q-item>
          <q-separator v-if="menu.name == 'separator'" dark="" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container :style="checkIsMobile"
      ><router-view
        :width="width"
        :height="height"
        :header="headerNotHide"
        @errMsg="showErrorMessage($event)"
    /></q-page-container>
  </q-layout>
  <q-dialog v-model="errDialog" seamless position="bottom">
    <q-card>
      <q-card-section class="row items-center no-wrap">
        <q-icon name="priority_high" color="red" size="30px"></q-icon>
        <div class="text-bold q-pr-md q-pl-sm" style="word-break: break-word">
          {{ errMessage }}
        </div>
        <q-btn
          style="position: absolute; right: 2px; top: 2px"
          flat
          round
          dense
          icon="close"
          v-close-popup
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.btn:hover {
  cursor: pointer;
}
</style>
