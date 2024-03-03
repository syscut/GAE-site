<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount } from "vue";
import FireFly from "./components/Firefly.vue";
import axios from "axios";
import router from "./router.js";
import { useStore } from "vuex";
import { Quasar, useQuasar } from "quasar";
//variables---------------------
const store = useStore();
const timer = ref(0);
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
  { id: 6, name: "登出", icon: "logout" },
]);
//setting---------------------
onBeforeMount(() => {});
onMounted(() => {
  // showLoading();
  isMobile.value =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
});
onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer);
    $q.loading.hide();
  }
});
window.addEventListener("resize", (e) => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
  if (width.value > breakSize.value) {
    leftDrawerOpen.value = false;
  }
});
//computed---------------------
const isLogin = computed(() => {
  return store.state.username != "";
});
const loadingUser = computed(() => {
  return store.state.isLoading;
});
const lessThanBreakPoint = computed(() => {
  return width.value < breakSize.value;
});
const hideTitle = computed(() => {
  return width.value < 450;
});
//function--------------------
const showLoading = () => {
  $q.loading.show({
    message: "資料連線中...",
  });
};
const reload = () => {
  router.push("/");
};
const routerTo = (to) => {
  if (to == "newArticle") {
    triggerLoadingBar();
  }
  router.push(to);
};
const logout = () => {
  store.commit("removeUser");
  document.cookie =
    "syscutToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;";
  window.location.reload();
};
const headerButtonCtrl = (menu = { icon: "" }) => {
  if (menu.icon == "login") {
    return !lessThanBreakPoint.value && !isLogin.value && !loadingUser.value;
  } else if (menu.icon == "logout") {
    return !lessThanBreakPoint.value && isLogin.value && !loadingUser.value;
  } else {
    return !lessThanBreakPoint.value;
  }
};
const drawerButtonCtrl = (menu = { icon: "", name: "" }) => {
  if (menu.name != "separator") {
    if (menu.icon == "login") {
      return !isLogin.value;
    } else if (menu.icon == "logout") {
      return isLogin.value;
    } else {
      return true;
    }
  }
};
const triggerLoadingBar = () => {
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
  // $q.loading.hide();
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
          <form action="">
            <q-input
              dense
              rounded
              outlined
              borderless
              dark
              color="black"
              v-model="searchText"
              placeholder="搜尋"
              type="search"
              @keydown.enter="search()"
            >
              <template v-slot:append>
                <q-icon
                  name="search"
                  class="cursor-pointer"
                  @click="search()"
                />
              </template>
            </q-input>
          </form>
        </div>
        <div v-for="menu in menuItems" :key="menu.id">
          <q-btn
            :to="menu.to"
            @click="menu.ajax ? triggerLoadingBar() : ''"
            flat
            rounded
            v-show="headerButtonCtrl(menu) && menu.to !== undefined"
            class="q-px-md"
            >{{ menu.name }}</q-btn
          >
          <q-btn
            @click="logout()"
            flat
            rounded
            v-show="headerButtonCtrl(menu) && menu.icon == 'logout'"
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
            v-if="drawerButtonCtrl(menu)"
            clickable
            v-ripple
            @click="menu.to === undefined ? logout() : routerTo(menu.to)"
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
    <q-page-container
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
