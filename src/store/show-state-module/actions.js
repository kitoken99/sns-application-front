export function initState({ commit }) {
  commit("initState");
}
export function switchIsAuthorized({ commit }, state) {
  commit("switchIsAuthorized", state);
}
export function switchIsFetched({ commit }, state) {
  commit("switchIsFetched", state);
}

export function switchMiddleContent({ commit }, state) {
  commit("switchMiddleContent", state);
}
export function switchMainContent({ commit }, state) {
  commit("switchMainContent", state);
}
export function switchProfilePanel({ commit }, state) {
  commit("switchMainContent", "main");
  commit("switchProfilePanel", state);
}
