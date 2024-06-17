<script setup>
// source：https://github.com/AsmrProg-YT/Modern-Login
import { nextTick, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import router from "../router";
import axios from "axios";
import CryptoJS from "crypto-js";
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
onMounted(() => {});
// variables ------------------------------------------------------
const username = ref("");
const password = ref("");
const newUsername = ref("");
const newPassword = ref("");
const newPasswordAgain = ref("");
const newEmail = ref("");
const newBirthday = ref("2000-01-01");
const newEducation = ref("留白");
const educationOpt = ref([
  "留白",
  "研究所或以上",
  "大學",
  "高中",
  "國中或以下",
]);
const isPwd = ref(true);
const isPwdN = ref(true);
const displayLoginForm = ref("");
const leftSize = ref("left: 60%;");
const staticMsg = ref("");
const store = useStore();
const $q = useQuasar();
// methods ----------------------------------------------------------
const login = () => {
  const key = CryptoJS.enc.Utf8.parse("aK7+UX24ttB=fTnA");
  const iv = CryptoJS.enc.Utf8.parse("d4ee=RaW1prQ1F+f");
  const encrypted = CryptoJS.AES.encrypt(password.value, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  axios
    .post("do/signin", {
      username: username.value,
      password: encrypted.toString(),
    })
    .then((e) => {
      staticMsg.value = "";
      let pushTo = store.state.redirect == "" ? "home" : store.state.redirect;
      router.push({ name: pushTo });
      // router.go();
    })
    .catch((e) => {
      let errorMsg = e?.response?.data?.ErrorMessage;
      if (errorMsg == "Bad credentials") {
        errorMsg = "帳號或密碼錯誤";
        staticMsg.value = errorMsg;
      }
      // Bad credentials
      emitErrMsg(errorMsg || "網路連線異常");
    });
};
const append = (targrt = "") => {
  const container = document.getElementById("container");
  if (targrt == "register") {
    leftSize.value = "left: 40%;";
    container.classList.add("active");
    displayLoginForm.value = "opacity: 0;";
  } else {
    leftSize.value = "left: 60%;";
    container.classList.remove("active");
    displayLoginForm.value = "";
  }
};
</script>
<template>
  <div class="row justify-around items-center background-img">
    <div class="col-xs-12 col-sm-10 col-md-8 self-center">
      <div class="container" id="container">
        <div class="form-container sign-up">
          <form action="">
            <h3
              class="text-white"
              style="
                line-height: 0.125rem;
                margin-bottom: 30px;
                margin-top: 0px;
              "
            >
              註冊
            </h3>
            <!-- <span class="text-red">★目前尚未開放註冊功能★</span> -->
            <div class="row">
              <div class="col-12 q-pb-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  color="black"
                  label-color="black"
                  bg-color="grey-1"
                  placeholder="帳號"
                  v-model="newUsername"
                />
              </div>
              <div class="col-12 q-pb-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  color="black"
                  label-color="black"
                  bg-color="grey-1"
                  :type="isPwdN ? 'password' : 'text'"
                  placeholder="密碼"
                  v-model="newPassword"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdN ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwdN = !isPwdN"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-12 q-pb-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  color="black"
                  label-color="black"
                  bg-color="grey-1"
                  :type="isPwdN ? 'password' : 'text'"
                  placeholder="再打一次你的密碼"
                  v-model="newPasswordAgain"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdN ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwdN = !isPwdN"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-12 q-pb-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  type="email"
                  color="black"
                  label-color="black"
                  bg-color="grey-1"
                  placeholder="Email"
                  v-model="newEmail"
                />
              </div>
              <div class="col-12 q-pb-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  stack-label
                  type="date"
                  color="black"
                  label-color="black"
                  bg-color="grey-1"
                  label="生日"
                  v-model="newBirthday"
                />
              </div>
              <div class="col-12 q-pb-sm">
                <q-select
                  dense
                  rounded
                  outlined
                  stack-label
                  label-color="black"
                  bg-color="grey-1"
                  label="教育程度(可留白)"
                  v-model="newEducation"
                  :options="educationOpt"
                />
              </div>
            </div>
            <q-btn push padding="10px 40px" color="primary" label="註冊" />
          </form>
        </div>
        <div class="form-container sign-in" :style="displayLoginForm">
          <form action="">
            <h3 class="text-white">登入</h3>
            <div class="row">
              <div class="col-12 q-pb-sm">
                <q-input
                  rounded
                  outlined
                  color="black"
                  input-style="background-color: #ffffff"
                  label-color="black"
                  bg-color="grey-1"
                  v-model="username"
                  label="帳號"
                />
              </div>
              <div class="col-12">
                <q-input
                  rounded
                  outlined
                  color="black"
                  label-color="black"
                  bg-color="grey-1"
                  v-model="password"
                  label="密碼"
                  :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            <p :v-show="staticMsg != ''" class="staticMsgStyle">
              {{ staticMsg }}
            </p>
            <a href="#">忘記密碼？</a>
            <q-btn
              push
              padding="10px 40px"
              color="primary"
              label="登入"
              @click="login()"
            />
          </form>
        </div>
        <div class="toggle-container" :style="leftSize">
          <div class="toggle">
            <div class="toggle-panel toggle-left">
              <p style="font-size: 23px">有帳號了？</p>
              <p>是在阿囉？<br />快去登入！</p>
              <q-btn
                padding="10px 25px"
                push
                color="primary"
                label="去登入"
                id="login"
                @click="append('login')"
              />
            </div>
            <div class="toggle-panel toggle-right">
              <h4>HELLO<br />歡迎你</h4>
              <p>還沒有帳號嗎？註冊一個吧，可以發文，以及使用翻譯功能唷。</p>
              <q-btn
                padding="10px 25px"
                push
                color="primary"
                label="去註冊"
                id="register"
                @click="append('register')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(2px);
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  min-height: 480px;
}

.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}
.container a {
  color: #ffffff;
  font-size: 14px;
  text-decoration: none;
  margin: 20px 0 15px;
}
.container form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5px;
  height: 100%;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}
.sign-in {
  left: 0;
  width: 60%;
  z-index: 2;
}
.container.active .sign-in {
  transform: translateX(100%);
}
.sign-up {
  left: -18%;
  width: 59%;
  opacity: 0;
  z-index: 1;
}
.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: move 0.6s;
}

@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.toggle-container {
  position: absolute;
  top: 0;
  width: 40%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 100px 0;
}

.toggle {
  height: 100%;
  background: linear-gradient(to right, #6572bb, #512da8);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}
.staticMsgStyle {
  color: red;
  margin-bottom: -5px !important;
}
</style>
<style scoped lang="scss">
.background-img {
  min-width: 100%;
  min-height: calc(100vh - 50px);
  // position: fixed;
  // bottom: -3%;
  // overflow: auto;
  background-image: url("../assets/signin-bg.webp");
  background-size: cover;
}
</style>
