import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth";
import user from "./user-module";
import profile from "./profile-module";
import friendship from "./friendship-module";
import group from "./group-module";
import room from "./room-module";
import state from "./show-state-module";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    plugins: [
      createPersistedState({
        key: "accessToken",
        paths: ["auth"],
        storage: window.sessionStorage,
      }),
    ],

    modules: {
      auth,
      user,
      profile,
      friendship,
      group,
      room,
      state,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
