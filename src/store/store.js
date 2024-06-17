import { createStore } from "vuex";

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  username: "",
  name: "",
  email: "",
  birthday: "",
  education: "",
  role: 5,
  isLoading: false,
  redirect: "",
  translateText: "",
  select: [],
  exam: [],
};

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setUser(
    state,
    u = {
      username: "",
      name: "",
      email: "",
      birthday: "",
      education: "",
      role: 5,
    }
  ) {
    state.username = u.username;
    state.name = u.name;
    state.email = u.email;
    state.birthday = u.birthday;
    state.education = u.education;
    state.role = u.role;
  },
  removeUser(state) {
    state.username = "";
    state.name = "";
    state.email = "";
    state.birthday = "";
    state.education = "";
    state.role = 5;
  },
  setLoadingState(state, s) {
    state.isLoading = s;
  },
  setRedirectUrl(state, url) {
    state.redirect = url;
  },
  removeRedirectUrl(state) {
    state.redirect = "";
  },
};
// actions are functions that cause side effects and can involve
// asynchronous operations.
// const actions = {
//   increment: ({ commit }) => commit('increment'),
//   decrement: ({ commit }) => commit('decrement'),
//   incrementIfOdd ({ commit, state }) {
//     if ((state.count + 1) % 2 === 0) {
//       commit('increment')
//     }
//   },
//   incrementAsync ({ commit }) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         commit('increment')
//         resolve()
//       }, 1000)
//     })
//   }
// }

// getters are functions.
// const getters = {
//   evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
// }

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default createStore({
  state,
  mutations,
});
