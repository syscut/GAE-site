<script setup>
// source：https://github.com/AsmrProg-YT/Modern-Login
import { ref } from "vue";
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
const username = ref("");
const password = ref("");
const isPwd = ref(true);
const login = () => {
  const key = CryptoJS.enc.Utf8.parse("aK7+UX24ttB=fTnA");
  const iv = CryptoJS.enc.Utf8.parse("d4ee=RaW1prQ1F+f");
  const d = CryptoJS.AES.encrypt("123456", key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  axios
    .post("do/signin", { username: "kim23362611", password: d.toString() })
    .then((e) => {
      console.log(e.data);
    })
    .catch((e) => {
      console.log(e?.response?.data);
    });
};
const article = () => {
  axios
    .get("articles")
    .then((e) => {
      console.log(e.data);
    })
    .catch((e) => {
      console.log(e.response.data);
    });
};
const append = (targrt = "") => {
  const container = document.getElementById("container");
  targrt == "register"
    ? container.classList.add("active")
    : container.classList.remove("active");
};
</script>
<template>
  <div class="row justify-around">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <div class="container" id="container">
        <div class="form-container sign-up">
          <form>
            <h3>註冊</h3>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in">
          <form>
            <h3>登入</h3>
            <div class="row">
              <div class="col-12 q-pb-sm">
                <q-input rounded outlined v-model="username" label="帳號" />
              </div>
              <div class="col-12">
                <q-input
                  rounded
                  outlined
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
            <a href="#">忘記密碼？</a>
            <q-btn push color="primary" label="登入" />
          </form>
        </div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-panel toggle-left">
              <h3>Welcome Back!</h3>
              <p>Enter your personal details to use all of site features</p>
              <button id="login" @click="append('login')">Sign In</button>
            </div>
            <div class="toggle-panel toggle-right">
              <h4>HELLO<br />歡迎你</h4>
              <p>還沒有帳號嗎？註冊一個吧，可以發文，以及使用翻譯功能唷。</p>
              <q-btn
                push
                color="primary"
                label="註冊"
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
  background-color: #fff;
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

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0 10px;
}

.container button {
  background-color: #512da8;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.container button.hidden {
  background-color: transparent;
  border-color: #fff;
}

.container form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
  height: 100%;
}

.container input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.active .sign-in {
  transform: translateX(100%);
}

.sign-up {
  left: 0;
  width: 50%;
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
  left: 50%;
  width: 50%;
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
  background-color: #512da8;
  height: 100%;
  background: linear-gradient(to right, #5c6bc0, #512da8);
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
  padding: 0 30px;
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
</style>
